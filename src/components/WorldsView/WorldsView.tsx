import { FileEntry } from '@tauri-apps/api/fs';
import type { FC } from 'react';

interface WorldsViewProps {
  files: FileEntry[];
}

export interface TerrariaWorld {
  name: string;
  worldFiles: FileEntry[];
}

const WorldsView: FC<WorldsViewProps> = ({ files }) => {
  const getWorldsFromFiles = (files: FileEntry[]): TerrariaWorld[] => {
    const worldsMap = new Map<string, FileEntry[]>();

    files.forEach((file) => {
      if (!file.name) {
        return;
      }
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      if (!worldsMap.has(nameWithoutExt)) {
        worldsMap.set(nameWithoutExt, []);
      }
      worldsMap.get(nameWithoutExt)?.push(file);
    });

    console.log(worldsMap);

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

  const worlds = getWorldsFromFiles(files);

  return (
    <div>
      {worlds.length > 0 ? (
        <>
          Worlds:
          {worlds.map((world) => (
            <div key={world.name}>{world.name}</div>
          ))}
        </>
      ) : (
        <>No Worlds</>
      )}
    </div>
  );
};
export default WorldsView;
