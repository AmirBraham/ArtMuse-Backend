import { API_BASE_URL } from "./init";
import * as fs from "@tauri-apps/api/fs";
import { getClient, ResponseType } from "@tauri-apps/api/http";
import { BaseDirectory } from '@tauri-apps/api/path';
import {  get_favorites} from "./manager";
import { fetch } from '@tauri-apps/api/http';

export const getWallpaperFromFavorite = async (current_wallpaper) => {
  const favorites = await get_favorites()
  const filtered_favorties = favorites.filter(painting => painting["id"] != current_wallpaper["id"])
  const painting = filtered_favorties[Math.floor(Math.random() * filtered_favorties.length)];
  await downloadWallpaper(painting)
  return painting
}




export const getWallpaper = async (limit: number, page: number, collection: string) => {
  // majors changes needed here : 
  // fetch images offline , if they don't exist use API to download 10 images
  if (page < 1) page = 1
  const collection_name = collection["name"]
  const response = await fetch(API_BASE_URL + `paintings/?limit=${limit}&page=${page}&collection=${collection_name}`, {
    method: 'GET',
    timeout: 30,
  });
  let res = response["data"]
  res = res["paintings"][0]
  const painting = {
    id: res["id"],
    resourceLink: res["resourceLink"],
    objectBeginDate: res["objectBeginDate"],
    objectEndDate: res["objectEndDate"],
    artistDisplayName: res["artistDisplayName"],
    title: res["title"],
    imageLink: res["imageLink"],
    collection: collection_name,
  }
  await downloadWallpaper(painting)
  return painting
}

export const downloadWallpaper = async (painting) => {
  const wallpaper_path = "wallpapers/" + painting["collection"] + "/wallpaper-" + painting["id"] + ".jpg"
  const already_has_wallpaper = await fs.exists(wallpaper_path, { dir: BaseDirectory.AppData })
  console.log(already_has_wallpaper)
  if (already_has_wallpaper) {
    return painting
  }
  // first time downloading this wallpaper
  const client = await getClient();
  const data = (
    await client.get(painting["imageLink"], {
      responseType: ResponseType.Binary,
    })
  ).data as any;
  const wallpapers_folder_exists = await fs.exists("wallpapers", { dir: BaseDirectory.AppData })
  if (!wallpapers_folder_exists) {
    await fs.createDir("wallpapers", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }
  const collection_folder_exists = await fs.exists("wallpapers/" + painting["collection"], { dir: BaseDirectory.AppData })
  if (!collection_folder_exists) {
    await fs.createDir("wallpapers/" + painting["collection"], {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }
  const download_path = "wallpapers/" + painting["collection"] + "/wallpaper-" + painting["id"] + ".jpg"
  await fs.writeBinaryFile(download_path,
    data, {
    dir: BaseDirectory.AppData
  })
}




