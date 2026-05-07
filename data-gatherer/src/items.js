import { apiGet } from "./api.js";
import { normalizeItem } from "./normalize.js";

export async function getEncounterItems(encounterId, dungeonName) {
  const data = await apiGet(`/data/wow/journal-encounter/${encounterId}`);

  const items = [];

  for (const reward of data.items || []) {
    const itemId = reward.item.id;

    const itemData = await apiGet(`/data/wow/item/${itemId}`);

    items.push(
      normalizeItem({
        dungeonName,
        itemData,
        slot: reward.slot_type
      })
    );
  }

  return items;
}

export async function getItemDetails(itemId) {
  const data = await apiGet(`/data/wow/item/${itemId}`);

  return data;
}