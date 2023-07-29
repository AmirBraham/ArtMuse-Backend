import { Store } from "tauri-plugin-store-api";
import { COLLECTIONS, DEFAULT_INTERVAL_VALUE } from "./init";
import { getWallpaper } from "./api";
import { invoke } from '@tauri-apps/api/tauri'
import { appDataDir } from '@tauri-apps/api/path';
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";

const store = new Store(".settings.dat");

export const init = async () => {
  const has_been_initialized: boolean | null = await store.get("has_been_initialized")
  if (has_been_initialized) {
    return true
  }
  await set_interval(DEFAULT_INTERVAL_VALUE)
  await set_limit(1)
  await set_page(1)
  await store.set("take_only_from_favorites", false)
  await store.set("start_on_startup", false)
  await store.set("favorites", [])
  await store.set("has_been_initialized", true);
  await store.set("collection",COLLECTIONS[0])
  console.log("init get wallpaper")
  const painting = await getWallpaper(1, 1,"The Metropolitan Museum of Art")
  console.log("done")
  await set_current_wallpaper(painting)
  await store.save()
  return false
}


export const set_interval = async (interval: number) => {
  await store.set("interval", interval);
  await store.save();
}

export const get_interval = async () => {
  const curr_interval = await store.get("interval")
  if (curr_interval == null) {
    await store.set("interval", DEFAULT_INTERVAL_VALUE);
    await store.save();
    return DEFAULT_INTERVAL_VALUE
  }
  return curr_interval
}

export const get_favorites = async () => {
  const favorites = await store.get("favorites")
  if(favorites == null) {
    await store.set("favorites",[])
    await store.save()
    return []
  }
  return favorites
}

export const add_favorite = async (favorite) => {
  const pred_favorites = await store.get("favorites")
  if (pred_favorites != null){
    await store.set("favorites", [...pred_favorites, favorite])
    await store.save()
  } else {
    await store.set("favorites", [favorite])
    await store.save();
  }
  return true
}
export const remove_favorite = async (id:string) => {
  const favorites = await store.get("favorites")
  if(favorites == null){
    console.log("favorites is null")
    return false
  }
  const filterd_favorites = favorites.filter(wallpaper => wallpaper["id"] != id)
  await store.set("favorites",filterd_favorites)
  await store.save()
  return filterd_favorites
}
export const get_collection = async () => {
  const collection = await store.get("collection")
  if(collection != null)
    return collection
  return COLLECTIONS[0]
}

export const set_collection = async (collection) => {
  await store.set("collection",collection)
  await store.save()
}
export const get_current_wallpaper = async () => {
  const currect_wallpaper = await store.get("current_wallpaper")
  if (currect_wallpaper != null && Object.keys(currect_wallpaper).length !== 0)
    return currect_wallpaper
  const collection = await get_collection()
  console.log("getting current wallpaper")
  const painting = await getWallpaper(1, 1,collection)
  await set_current_wallpaper(painting)
  return painting
  // if we reached this point , this is the first time the user has opened our app , we will need to fetch a random wallpaper and set other params
}

export const clear_store = async () => {
  await store.clear()
  const res = await store.get("current_wallpaper")
  console.log(res)
}

export const set_current_wallpaper = async (wallpaper) => {
  await store.set("current_wallpaper", wallpaper)
  await store.save()
  const appDataDirPath = await appDataDir();

  invoke('change_wallpaper', {id: wallpaper["id"],collection:wallpaper["collection"],appdata: appDataDirPath}).catch(err=>{
    console.log(err)
  })
  return wallpaper
}

export const get_take_only_from_favorites = async () => {
  const take_only_from_favorites = await store.get("take_only_from_favorites")
  if (take_only_from_favorites != null)
    return take_only_from_favorites
  await store.set("take_only_from_favorites", false)
  await store.save();
  return false
}

export const toggle_take_only_from_favorites = async () => {
  const pred_take_only_from_favorites = await store.get("take_only_from_favorites")
  await store.set("take_only_from_favorites", !pred_take_only_from_favorites)
  await store.save();
  return !pred_take_only_from_favorites
}
export const get_start_on_startup = async () => {
  const pred_on_startup = await isEnabled()
  return pred_on_startup
}
export const toggle_start_on_startup = async () => {
  const pred_start_on_startup = await isEnabled()
  if(pred_start_on_startup){
    await disable()
  } else {
    await enable()
  }
  const res = await isEnabled()
  return res
}

export const set_page = async (value: number) => {
  let final_value = value
  if (value <= 0) {
    console.log("page value can't be less than 1 , setting it to 1 ")
    final_value = 1
  }

  await store.set("page", final_value)
  await store.save()
  return final_value
}

export const get_page = async () => {
  const curr_page: number | null = await store.get("page")
  if (curr_page != null)
    return curr_page
  console.log("first time getting page , setting it to 1")
  await set_page(1)
  return 1
}

export const set_limit = async (value: number) => {
  let final_value = value
  if (value <= 0)
    console.log("limit value can't be less than 1 , setting it to 1 ")
  final_value = 1
  await store.set("limit", final_value)
  await store.save()
}

export const get_limit = async () => {
  const curr_page: number | null = await store.get("limit")
  if (curr_page != null)
    return curr_page
  console.log("first time getting limit , setting it to 1")
  await set_limit(1)
  return 1
}