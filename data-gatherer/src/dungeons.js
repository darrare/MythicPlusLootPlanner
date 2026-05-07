import { apiGet } from "./api.js";

export async function getAllCurrentSeasonDungeons() {
  const currentSeasons = await apiGet("/data/wow/journal-expansion/index");
  const currentSeason = currentSeasons.tiers.find(t => t.name === "Current Season");

  if (!currentSeason) {
    throw new Error(`Current season not found`);
  }

  const seasonData = await apiGet(`/data/wow/journal-expansion/${currentSeason.id}`);

  return seasonData.dungeons.map(dungeon => ({
    id: dungeon.id,
    name: dungeon.name
  }));
}