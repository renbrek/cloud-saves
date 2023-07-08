import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import './App.css';
import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs';
import WorldsView from './components/WorldsView/WorldsView';

function App() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<FileEntry[]>();

  const readFileContents = async () => {
    try {
      const selectedPath = await open({
        multiple: false,
        directory: true,
        title: 'Open Text File',
      });
      setSelectedFolder(selectedPath as string);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedFolder)
      readDir(selectedFolder, {
        dir: BaseDirectory.AppData,
        recursive: true,
      }).then((files) => {
        setFiles(files);
      });
  }, [selectedFolder]);

  return (
    <div className="container">
      <h1>Cloud Saves</h1>
      <button type="submit" onClick={readFileContents}>
        Open Folder
      </button>
      <div>Selected Folder: {selectedFolder}</div>
      {selectedFolder && files ? <WorldsView files={files} /> : <></>}
    </div>
  );
}

export default App;
