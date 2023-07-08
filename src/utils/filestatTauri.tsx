import {invoke} from '@tauri-apps/api';

export interface TauriFileStat {
    // Timestamp of last modification (UNIX epoch time, in milliseconds, just how JS likes it)
    mtime: number;
    /* Is this a directory. */
    isDir: boolean;
    /* Is this a regular file. */
    isFile: boolean;
    /* File size in bytes. */
    size: number;
}

export async function tauriFileStat(filename: string): Promise<TauriFileStat> {
    const x = await invoke('filestat', { filename });
  return JSON.parse(x as string) as TauriFileStat;
}