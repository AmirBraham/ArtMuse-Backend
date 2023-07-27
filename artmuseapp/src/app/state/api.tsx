import { API_BASE_URL } from "./init";
import { Wallpaper } from "../types";
import * as fs from "@tauri-apps/api/fs";
import { getClient, ResponseType } from "@tauri-apps/api/http";
import { BaseDirectory, resourceDir } from '@tauri-apps/api/path';
export const getWallpaper = async (limit: number, page: number) => {
  // majors changes needed here : 
  // fetch images offline , if they don't exist use API to download 10 images
  if (page < 1)
    page = 1
  const response = await fetch(API_BASE_URL + `paintings/?limit=${limit}&page=${page}`, {
    headers: {
      'accept': 'application/json'
    }
  });
  let res = await response.json()
  res = res["paintings"][0]
  const painting: Wallpaper = {
    id: res["id"],
    resourceLink: res["resourceLink"],
    objectBeginDate: res["objectBeginDate"],
    objectEndDate: res["objectEndDate"],
    artistDisplayName: res["artistDisplayName"],
    title: res["title"],
    imageLink: res["imageLink"],
    collection: res["collection"],
  }
  const wallpaper_path= "wallpapers/"+painting["collection"]+"/wallpaper-"+painting["id"]+".jpg"
  const already_has_wallpaper = await fs.exists(wallpaper_path, { dir: BaseDirectory.AppData })
  if(already_has_wallpaper){
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
  if(!wallpapers_folder_exists) {
    await fs.createDir("wallpapers", {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }
  const collection_folder_exists = await fs.exists("wallpapers/"+painting["collection"],{ dir: BaseDirectory.AppData })
  if(!collection_folder_exists) {
    await fs.createDir("wallpapers/"+painting["collection"], {
      dir: BaseDirectory.AppData,
      recursive: true,
    });
  }
  const download_path = "wallpapers/" + painting["collection"] + "/wallpaper-" + painting["id"] + ".jpg"
  await fs.writeBinaryFile(download_path,
    data, {
      dir: BaseDirectory.AppData
    })
  

  return painting
}




