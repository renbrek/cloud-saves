import { FileEntry } from '@tauri-apps/api/fs';
import type { FC } from 'react';
import { getWorldsFromFiles } from '../../utils/getWorldsFromFiles';
import WorldItem from './WorldItem';

interface WorldsViewProps {
  files: FileEntry[];
}

const WorldsView: FC<WorldsViewProps> = ({ files }) => {
  const worlds = getWorldsFromFiles(files);

  return (
    <div>
      {worlds.length > 0 ? (
        <>
          Worlds:
          {worlds.map((world) => (
            <WorldItem key={world.name} world={world} />
          ))}
        </>
      ) : (
        <>No Worlds</>
      )}
    </div>
  );
};
export default WorldsView;
