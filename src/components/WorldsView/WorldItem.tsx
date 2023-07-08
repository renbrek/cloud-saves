import { useEffect, type FC } from 'react';
import { TerrariaWorld } from '../../utils/getWorldsFromFiles';
import { tauriFileStat } from '../../utils/filestatTauri';

interface WorldItemProps {
  world: TerrariaWorld;
}

const WorldItem: FC<WorldItemProps> = ({ world }) => {

  useEffect(() => {

  }, [world])

  return (
    <div>
      <h4>{world.name}</h4>
      <div>
        {world.worldFiles.map((file) => {
          const path = file.path;
          const metadata = tauriFileStat(file.path).then((res) => {
            console.log(path, res);
            return res
          });
          return <div key={file.name}>{file.name}</div>;
        })}
      </div>
    </div>
  );
};
export default WorldItem;
