// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,CustomMenuItem};
use tauri_plugin_positioner::{Position, WindowExt};
use wallpaper;

#[tauri::command]
fn greet(name: &str) -> String {
   println!("Hello, {}!", name);
   format!("Hello, {}!", name)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    _ => {}
                },
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    wallpaper::set_from_path("/Users/amirbraham/Desktop/ArtMuse/artmuseapp/src-tauri/src/wallpaper.jpg").unwrap();
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
          tauri::WindowEvent::Focused(is_focused) => {
              // detect click outside of the focused window and hide the app
              if !is_focused {
                  event.window().hide().unwrap();
              }
          }
          _ => {}
      })
      .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
