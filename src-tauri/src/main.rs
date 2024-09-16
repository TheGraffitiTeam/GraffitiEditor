use std::env;
use std::process::Command;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn print(data: &str) {
    println!("{}", data);
    
    let output = if cfg!(target_os = "windows") {
        Command::new("fluxprint.bat")
            .args(["--data", &data.replace("\\", "\\\\").replace("\"", "\\\"")])
            .output()
            .expect("failed to execute process")
    } else {
        Command::new("fluxprint.sh")
            .args(["--data", data])
            .output()
            .expect("failed to execute process")
    };

    if output.status.success() {
        println!("{}", String::from_utf8_lossy(&output.stdout).trim());
    } else {
        eprintln!("Error {}", String::from_utf8_lossy(&output.stderr).trim());
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, print])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
