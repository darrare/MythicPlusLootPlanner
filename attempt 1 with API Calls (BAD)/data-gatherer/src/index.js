import "dotenv/config"
import fs from "fs";
import { CONFIG, RUN_MODE, MODES, ITEM_NAME_WHITE_LIST } from "./config.js";
import { getAllCurrentSeasonDungeons } from "./dungeons.js";
import { getDungeonEncounter, getDungeonEncounters } from "./encounters.js";
import { getEncounterItems, getItemDetails } from "./items.js";

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function listAndValidateCurrentSeasonDungeons() {
  const dungeons = await getAndListCurrentSeasonDungeons();
  validateCurrentSeasonDungeons(dungeons);
}

async function getAndListCurrentSeasonDungeons() {
  var dungeons = await getAllCurrentSeasonDungeons()
  console.log(":::::::::::::::::::::::::::::");
  console.log(":::Current Season Dungeons:::");
  console.log(":::::::::::::::::::::::::::::");
  console.log("");
  console.log("Use these IDs in config.js mythicPlusDungeonIds to limit which dungeons get queried.");
  console.log("");

  const maxNameLength = Math.max(...dungeons.map(d => d.name.length));

  dungeons.forEach(dungeon => {
    const name = dungeon.name.padEnd(maxNameLength, " ");
    const id = String(dungeon.id).padStart(5, " "); // optional fixed width

    console.log(`${name} | ${id}`);
  });
  console.log(":::::::::::::::::::::::::::::::::");
  console.log(":::End Current Season Dungeons:::");
  console.log(":::::::::::::::::::::::::::::::::");
  return dungeons;
}

function validateCurrentSeasonDungeons(dungeons) {
  const dungeonIds = new Set(dungeons.map(d => d.id));
  const configIds = new Set(CONFIG.mythicPlusDungeonIds);

  const missing = CONFIG.mythicPlusDungeonIds.filter(id => !dungeonIds.has(id));

  const valid = missing.length === 0 ? "VALID" : "NOT VALID";
  console.log("");
  console.log(":::::::::::::::::::::::::::::::::::::::");
  console.log(`:::config.js.mythicPlusDungeonIds is:::`);
  console.log(`:::     ${valid.padEnd(28, " ")}:::`);
  if (missing.length === 0) {
    console.log("You may now update config.js.RUN_MODE to GENERATE_LOOT");
  }
  console.log(":::::::::::::::::::::::::::::::::::::::");
  console.log("");
}

function dedupeItemsByHighestId(items) {
  const map = new Map();

  for (const item of items) {
    const name = item.item.name;
    const id = item.item.id;

    const existing = map.get(name);

    if (!existing || id > existing.item.id) {
      map.set(name, item);
    }
  }

  return [...map.values()];
}

async function generateLoot() {
  const results = [];

  // 1. Get all current season dungeons
  const dungeons = await getAllCurrentSeasonDungeons();

  // 2. Filter to M+ season list
  const selectedDungeons = dungeons.filter(d =>
    CONFIG.mythicPlusDungeonIds.includes(d.id)
  );

  for (const dungeon of selectedDungeons) {
    console.log(`Processing dungeon: ${dungeon.name}`);

    // 3. Get dungeon instance details (encounters live here)
    const instances = await getDungeonEncounters(dungeon.id);

    if (!instances || instances.length == 0){
      console.log(`No encounters found for dungeon ${dungeon.name}... Moving to next.`);
      continue;
    }

    for (const encounter of instances) {
      console.log(`  Processing encounter: ${encounter.name}`);

      // 4. Get encounter loot
      const encounterData = await getDungeonEncounter(encounter.id);

      const items = encounterData.items || [];    

      if (!items || items.length == 0){
        console.log(`  No items found for encounter ${encounter.name}... Moving to next.`);
        continue;
      }

      for (const item of dedupeItemsByHighestId(items)) {
        const itemId = item.item.id;

        const itemData = await getItemDetails(itemId);

        if (!itemData.is_equippable)
        {
          console.log(`    Found unequipable item ${itemData.preview_item.name}... Skipping...`)
          continue;
        }

        const SECONDARY_STATS = [
          "Critical Strike",
          "Mastery",
          "Haste", 
          "Versatility"
        ];



        const secondaryStats = itemData.preview_item.stats.filter(t => SECONDARY_STATS.includes(t.type.name)).sort((a, b) => b.value - a.value);

        results.push({
          dungeon: dungeon.name,
          encounter: encounter.name,
          itemId: itemData.id,
          itemName: itemData.name,
          itemClass: itemData.item_class.name,
          itemSubClass: itemData.item_subclass.name,
          inventoryType: itemData.inventory_type.name,
          firstSecondary: secondaryStats.length > 0 ? secondaryStats[0].type.name : null,
          secondSecondary: secondaryStats.length > 1 ? secondaryStats[1].type.name : null
        });
      }
    }
  }

  return results;
}

function logDungeonEncounterCounts(items) {
  const map = new Map();

  // Build structure: Dungeon → Encounter → Count
  for (const item of items) {
    if (!map.has(item.dungeon)) {
      map.set(item.dungeon, new Map());
    }

    const encounterMap = map.get(item.dungeon);

    if (!encounterMap.has(item.encounter)) {
      encounterMap.set(item.encounter, 0);
    }

    encounterMap.set(
      item.encounter,
      encounterMap.get(item.encounter) + 1
    );
  }

  // Output nicely
  for (const [dungeon, encounters] of map.entries()) {
    console.log(`\n=== ${dungeon} ===`);

    for (const [encounter, count] of encounters.entries()) {
      console.log(`  ${encounter.padEnd(25)} (${count})`);
    }
  }
}

function saveLootToFile(items) {
  fs.writeFileSync(
    CONFIG.outputFile,
    JSON.stringify(items, null, 2),
    "utf-8"
  );

  console.log(`Saved ${items.length} items to output/loot.json`);
}



function buildWhitelistMapWithTracking() {
  const map = new Map();
  const usageTracker = new Map(); // dungeon -> Set(used items)

  for (const entry of ITEM_NAME_WHITE_LIST) {
    const [dungeon, items] = Object.entries(entry)[0];

    const dungeonKey = dungeon.toLowerCase();
    const normalizedItems = items.map(i => i.toLowerCase());

    map.set(dungeonKey, new Set(normalizedItems));
    usageTracker.set(dungeonKey, new Set());
  }

  return { map, usageTracker };
}

export function trimLoot(items) {
  const { map, usageTracker } = buildWhitelistMapWithTracking();

  const result = items.filter(item => {
    const dungeonKey = item.dungeon.toLowerCase();
    const whitelist = map.get(dungeonKey);

    // not a tracked dungeon → keep everything
    if (!whitelist) return true;

    const itemName = item.itemName.toLowerCase();

    if (whitelist.has(itemName)) {
      usageTracker.get(dungeonKey).add(itemName);
      return true;
    }

    return false;
  });

  logUnusedWhitelistEntries(map, usageTracker);

  return result;
}

function logUnusedWhitelistEntries(map, usageTracker) {
  console.log("\n::: Whitelist Audit :::");

  for (const [dungeon, whitelist] of map.entries()) {
    const used = usageTracker.get(dungeon) || new Set();

    const unused = [...whitelist].filter(item => !used.has(item));

    if (unused.length > 0) {
      console.log(`\n⚠️ ${dungeon} - unused whitelist items:`);
      unused.forEach(item => console.log(`  - ${item}`));
    }
  }
}


async function run() {
  switch (RUN_MODE) {
    case MODES.LIST_AND_VALIDATE_DUNGEONS:
      listAndValidateCurrentSeasonDungeons();
      break;
    case MODES.GENERATE_LOOT:
      var loot = await generateLoot();
      logDungeonEncounterCounts(loot);
      loot = trimLoot(loot);
      logDungeonEncounterCounts(loot);
      saveLootToFile(loot);
      break;
    default:
      throw new Error("Invalid RUN_MODE");
  }
  return;
}

run();