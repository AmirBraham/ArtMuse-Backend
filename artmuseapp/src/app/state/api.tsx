import { API_BASE_URL } from "./init"; 
import { Wallpaper } from "../types";
export const getWallpaper = async (limit:number,page:number) => {
    if(page<1)
        page =1
    const response = await fetch(API_BASE_URL+ `paintings/?limit=${limit}&page=${page}`, {
        headers: {
          'accept': 'application/json'
        }
      });
    let res = await response.json()
    console.log(res)
    res = res["paintings"][0]
    const painting:Wallpaper = {
        id:res["id"],
        resourceLink:res["resourceLink"],
        objectBeginDate:res["objectBeginDate"],
        objectEndDate:res["objectEndDate"],
        artistDisplayName:res["artistDisplayName"],
        title:res["title"],
        imageLink:res["imageLink"],
        collection:res["collection"],
    }
    return painting
}


