import { Store } from "tauri-plugin-store-api";
import { DEFAULT_INTERVAL_VALUE } from "./init";
import { couldStartTrivia } from "typescript";
import { Wallpaper } from "../types";
import { getWallpaper } from "./api";
const store = new Store(".settings.dat");



export const init = async () => {
  const has_been_initialized: boolean | null = await store.get("has_been_initialized")
  console.log("has been initialized : " + has_been_initialized)
  const wallpaper = await get_current_wallpaper()
  if (has_been_initialized) {
    console.log("already initialized")
    return true
  }
  await set_interval(DEFAULT_INTERVAL_VALUE)
  await set_limit(1)
  await set_page(1)
  await store.set("favorites", [])
  await store.set("has_been_initialized", true);
  const painting: Wallpaper = await getWallpaper(1, 1)
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
  if (favorites)
    alert(favorites)
  return favorites
}

export const add_favorite = async (favorite: Wallpaper) => {
  const pred_favorites: Wallpaper[] | null = await store.get("favorites")
  if (pred_favorites != null)
    await store.set("favorites", [...pred_favorites, favorite])
  await store.set("favorites", [favorite])
  await store.save();
}

export const get_current_wallpaper = async () => {
  const currect_wallpaper: Wallpaper | null = await store.get("current_wallpaper")
  if (currect_wallpaper != null && Object.keys(currect_wallpaper).length !== 0)
    return currect_wallpaper
  const painting: Wallpaper = await getWallpaper(1, 1)

  await set_current_wallpaper(painting)
  return {}
  // if we reached this point , this is the first time the user has opened our app , we will need to fetch a random wallpaper and set other params
}

export const set_current_wallpaper = async (wallpaper: Wallpaper) => {
  await store.set("current_wallpaper", wallpaper)
  await store.save()
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
  const pred_on_startup = await store.get("start_on_startup")
  if (pred_on_startup != null)
    return pred_on_startup
  await store.set("start_on_startup", false)
  await store.save();
  return false
}
export const toggle_start_on_startup = async () => {
  const pred_start_on_startup = await store.get("start_on_startup")
  await store.set("start_on_startup", !pred_start_on_startup)
  await store.save();
  return !pred_start_on_startup
}

export const set_page = async (value: number) => {
  let final_value = value
  if (value <= 0) {
    console.log("page value can't be less than 1 , setting it to 1 ")
    final_value = 1
  }

  await store.set("page", final_value)
  await store.save()
  console.log(final_value)
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