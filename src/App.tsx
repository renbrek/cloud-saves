import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import './App.css';
import { readDir, BaseDirectory, FileEntry } from '@tauri-apps/api/fs';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [files, setFiles] = useState<FileEntry[]>();

  async function greet() {
    setGreetMsg(await invoke('greet', { name }));
  }

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
        console.log(files);
      });
  }, [selectedFolder]);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <p>{greetMsg}</p>
      <button type="submit" onClick={readFileContents}>
        Open File
      </button>
      <div>Selected Folder: {selectedFolder}</div>
      {files ? (
        <div>
          Files:
          {files.map((file) => (
            <div key={file.path}>{file.name}</div>
          ))}
        </div>
      ) : selectedFolder ? (
        <>No files</>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
