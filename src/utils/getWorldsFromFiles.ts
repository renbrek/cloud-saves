import { FileEntry } from '@tauri-apps/api/fs';

export interface TerrariaWorld {
  name: string;
  worldFiles: FileEntry[];
}
export const getWorldsFromFiles = (files: FileEntry[]): TerrariaWorld[] => {
  const worldsMap = new Map<string, FileEntry[]>();

  files.forEach((file) => {
    if (!file.name) {
      return;
    }
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

    if (nameWithoutExt.length < 1) return;

    if (!worldsMap.has(nameWithoutExt)) {
      worldsMap.set(nameWithoutExt, []);
    }
    worldsMap.get(nameWithoutExt)?.push(file);
  });

  const worlds: TerrariaWorld[] = Array.from(worldsMap).map((rawWorld) => {
    const world: TerrariaWorld = {
      name: rawWorld[0],
      worldFiles: rawWorld[1],
    };
    return world;
  });
  console.log(worlds);
  return worlds;
};
