import { apiGet } from "./api.js";

export async function getDungeonEncounters(dungeonId) {
  const data = await apiGet(`/data/wow/journal-instance/${dungeonId}`);

  return data.encounters.map(e => ({
    id: e.id,
    name: e.name
  }));
}

export async function getDungeonEncounter(encounterId) {
  const data = await apiGet(`/data/wow/journal-encounter/${encounterId}`);

  return {
    id: data.id,
    name: data.name,
    items: data.items
  };
}