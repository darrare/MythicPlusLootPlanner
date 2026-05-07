export function normalizeItem({ dungeonName, itemData, slot }) {
  const stats = itemData.stats || [];

  const sorted = [...stats].sort((a, b) => b.value - a.value);

  return {
    dungeon: dungeonName,
    itemName: itemData.name,
    itemId: itemData.id,

    primarySecondaryStat: sorted[0]?.display?.display_string ?? null,
    secondarySecondaryStat: sorted[1]?.display?.display_string ?? null,

    itemType: itemData.inventory_type?.name ?? null,
    itemSlot: slot ?? null
  };
}