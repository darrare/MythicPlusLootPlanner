export const CONFIG = {
  region: "us",
  namespace: "static-us",
  locale: "en_US",

  outputFile: "./output/loot.json",

  season: 1,

  // You will manually maintain this for now (important reality)
  mythicPlusDungeonIds: [
    1300,
    1315,
    1316,
    1299,
    1201,
    278,
    945,
    476
  ]
};

export const MODES = {
  LIST_AND_VALIDATE_DUNGEONS: "LIST_AND_VALIDATE_DUNGEONS",
  GENERATE_LOOT: "GENERATE_LOOT"
};

export const RUN_MODE = MODES.GENERATE_LOOT;

export const ITEM_NAME_WHITE_LIST = [
  {
    "pit of saron": [
      "garfrost's two-ton hammer",
      "surgeon's needle",
      "barbed ymirheim choker",
      "shoulderplates of frozen blood",
      "spurned val'kyr shoulderguards",
      "flayer's black belt",
      "ice-steeped sandals",
      "krick's beetle stabber",
      "chewed leather wristguards",
      "wristguards of subterranean moss",
      "bent gold belt",
      "braid of salt and fire",
      "scabrous zombie belt",
      "black dragonskin breeches",
      "purloined wedding ring",
      "rotting globule",
      "rimebane rifle",
      "horns of the spurned val'kyr",
      "skeleton lord's cranium",
      "cloak of the fallen cardinal",
      "frost wyrm ribcage",
      "palebone robes",
      "shaggy wyrmleather leggings",
      "nevermelting ice crystal"
    ]
  },
  {
    "skyreach": [
      "chakram-breaker greatsword",
      "skybreaker's blade",
      "stormshaper's crossbow",
      "rigid scale greatcloak",
      "legwraps of swirling light",
      "spire of the furious construct",
      "edge of the burning sun",
      "gutcrusher greathelm",
      "lightbinder shoulderguards",
      "sharpeye chestguard",
      "boots of burning focus",
      "solar core igniter",
      "beakbreaker scimitar",
      "blazing sunclaws",
      "rukhran's solar reliquary",
      "bloodfeather mantle",
      "bracers of blazing light",
      "incarnadine gauntlets",
      "rigid scale boots",
      "radiant sunstone",
      "sunlance of viryx",
      "arcanic of the high sage",
      "viryx's indomitable bulwark",
      "sharpeye gleam",
      "spaulders of scorching ray",
      "bloodfeather chestguard",
      "lightbinder treads",
      "solarflare prism"
    ]
  }
]