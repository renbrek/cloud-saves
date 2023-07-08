import { FileEntry } from '@tauri-apps/api/fs';
import type { FC } from 'react';
import { TerrariaWorld } from '../../utils/getWorldsFromFiles';

interface WorldItemProps {
  world: TerrariaWorld;
}

const WorldItem: FC<WorldItemProps> = ({ world }) => {
  return <div>{world.name}</div>;
};
export default WorldItem;
