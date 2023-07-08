import { FileEntry } from '@tauri-apps/api/fs';
import type { FC } from 'react';

interface WorldItemProps {
  world: FileEntry[];
}

const WorldItem: FC<WorldItemProps> = ({ world }) => {
  return <div></div>;
};
export default WorldItem;
