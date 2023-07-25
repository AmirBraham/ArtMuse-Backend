Decided to handle stage management with json file.
state.json contains all information : current wallpaper , run on startup , wallpaper change interval , (page , limit) to handle next/previous wallpaper logic api
tauri/rust sends this json to frontend on startup so we get the most recent settings
whenever user makes an ACTION(change wallpaper ,add to favorite..) we modify this json and sends it to tauri so it writes it to the disk