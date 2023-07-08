// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileStat {
    mtime: u64,
    is_file: bool,
    is_dir: bool,
    size: u64,
}

impl FileStat {
    fn new(mtime: u64, is_file: bool, is_dir: bool, size: u64) -> FileStat {
        FileStat {
            mtime,
            is_file,
            is_dir,
            size,
        }
    }
}

#[tauri::command]
fn filestat(filename: &str) -> Result<String, String> {
    use std::fs;
    use std::time::UNIX_EPOCH;

    let metadata = fs::metadata(filename).expect("Failed to stat file");
    let time = metadata.modified().expect("Failed to get mtime");
    let millis = time
        .duration_since(UNIX_EPOCH)
        .expect("Failed to calculate mtime")
        .as_millis();

    let u64millis = u64::try_from(millis).expect("Integer to large");

    let is_file = metadata.is_file();
    let is_dir = metadata.is_dir();
    let size = metadata.len();
    let stat: FileStat = FileStat::new(u64millis, is_file, is_dir, size);
    let json_stat = serde_json::to_string(&stat).expect("Parse to json error");

    return Ok(json_stat);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![filestat])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
