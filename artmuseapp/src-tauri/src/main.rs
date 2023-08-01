// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{
    api::path::{app_data_dir, data_dir, local_data_dir},
    async_runtime::spawn,
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
};
use tauri_plugin_autostart::MacosLauncher;
use tauri_plugin_positioner::{Position, WindowExt};
use wallpaper;
// Import week days and WeekDay

#[tauri::command]
fn change_wallpaper(id: String, collection: String, appdata: String) -> String {
    let final_path = format!("{}wallpapers/{}/wallpaper-{}.jpg", appdata, collection, id);
    println!("{}", final_path);
    // Sets the wallpaper for the current desktop from a URL.
    wallpaper::set_from_path(&final_path).unwrap();

    // Returns the wallpaper of the current desktop.
    format!("state returned")
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit);
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--flag1", "--flag2"]),
        ))
        .plugin(tauri_plugin_store::Builder::default().build())
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
                    //window.open_devtools();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
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
        .invoke_handler(tauri::generate_handler![change_wallpaper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
