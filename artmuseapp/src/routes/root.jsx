'use client';

import SettingsButton from '../components/settings/SettingsButton'
import Logo from '../components/root/Logo'
import Favorite from '../components/root/FavoriteButton'
import PaintingDetails from '../components/root/PaintingDetails'
import { ArrowRightIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { add_favorite, get_collection, get_current_wallpaper, get_favorites, get_limit, get_page, get_take_only_from_favorites, init, remove_favorite, set_current_wallpaper, set_page } from '../state/manager';
import { getWallpaper, getWallpaperFromFavorite } from '../state/api';

// add image_preview to wallpaper fields , need to generate preview on backend (preprocessing) 
export const openPage = async (page) => {
  const {open} = await import('@tauri-apps/api/shell')
  open(page)
}
const Loadera = () => {
  return (
    <span className="loading loading-spinner loading-lg"></span>
  );
};

export default function Root() {
  const [loading, setLoading] = useState({
    load: true,
    loadedOnce: false,
  });
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState({})
  const [collection, setCollection] = useState("")
  const [takeOnlyFromFavorite, setTakeOnlyFromFavorite] = useState(false)

  useEffect(() => {
    get_take_only_from_favorites().then(res => setTakeOnlyFromFavorite(res))
  }, [])

  useEffect(() => {
    get_collection().then(res => setCollection(res))
  },[])
  useEffect(() => {
    if (loading["load"] == true && loading["loadedOnce"] == false) {
      init()
    }
    setLoading({ load: false, loadedOnce: true })
  }, [])
  useEffect(() => {
    get_current_wallpaper().then(painting => {
      if (painting) {
        setCurrentWallpaper(painting)
      }
    })
  }, [])

  useEffect(() => {
    check_favorite(currentWallpaper["id"]).then(res => {
      setIsFavorite(res)
    })
  }, [currentWallpaper])

  const check_favorite = async (id) => {
    const favorites = await get_favorites()
    if(favorites.length == 0 ){
      return false
    }
    const res = favorites.find(painting => painting["id"] == id)
    if (res)
      return true
    return false
  }
  const addToFavorite = async () => {
    await add_favorite(currentWallpaper)
    setIsFavorite(true)
  }

  const removeFromFavorite = async () => {
    await remove_favorite(currentWallpaper["id"])
    setIsFavorite(false)
  }



  const nextWallpaper = async () => {
    setLoading({ load: true, loadedOnce: true })
    let prev_page = await get_page()
    const collection = await get_collection()
    const collection_size = collection["size"]
    if(prev_page + 1 > collection_size) {
      console.log("reseting to first one ")
      prev_page = 0
    }
    await set_page(prev_page + 1)
    const page = await get_page()
    const limit = await get_limit()
    const wallpaper = await getWallpaper(limit, page, collection)
    await set_current_wallpaper(wallpaper)
    setCurrentWallpaper(wallpaper)
    setLoading({ load: false, loadedOnce: true })
  }

  const setWallpaperFromFavorite = async () => {
    setLoading({ load: true, loadedOnce: true })
    const wallpaper = await getWallpaperFromFavorite(currentWallpaper)
    await set_current_wallpaper(wallpaper)

    setCurrentWallpaper(wallpaper)
    setLoading({ load: false, loadedOnce: true })

  }

  const previousWallpaper = async () => {
    setLoading({ load: true, loadedOnce: true })
    let prev_page = await get_page()
    const collection = await get_collection()
    const collection_size = collection["size"]
    if(prev_page-1 <=0) {
      prev_page = collection_size +1 
    }
    console.log(prev_page)

    await set_page(prev_page - 1)
    const page = await get_page()
    const limit = await get_limit()
    const wallpaper = await getWallpaper(limit, page, collection)
    await set_current_wallpaper(wallpaper)
    setCurrentWallpaper(wallpaper)
    setLoading({ load: false, loadedOnce: true })
  }
  return (
    <>
      {
        loading.load && !loading.loadedOnce ? (
          <Loadera />
        ) : (
          <main style={{ backgroundImage: "url(" + currentWallpaper["imageLink"] + ")", backgroundSize: "cover", backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex min-h-screen flex-col items-center justify-between container rounded-md">
            {
              loading.load && loading.loadedOnce ? (
                <div className='fixed bg-black/50 w-screen grid h-screen place-items-center gap-4'>
                  <div className='pt-10'>
                    <Loadera />
                  </div>
                  <p className='pb-20'>Downloading your next favorite wallpaper</p>

                </div>
              ) : null
            }
            <div className='flex flex-col container mx-auto p-3 ' style={{ background: "rgba(0, 0, 0, 0.5)", height: 300 }} >
              <div className='flex flex-row basis-3/4 '>
                <div className="basis-3/4 pt-1 flex space-x-2" >
                  <div className="flex-none h-5 w-5" >
                    <button>
                      <Favorite addToFavorite={addToFavorite}
                        removeFromFavorite={removeFromFavorite}
                        isFavorite={isFavorite} />
                    </button>
                  </div>
                  <div className="flex-none h-5 w-5" >
                    <SettingsButton />
                  </div>
                  {takeOnlyFromFavorite ? <div className="flex-none h-5 w-5" >
                    <ArrowPathIcon onClick={setWallpaperFromFavorite} />
                  </div> : (<>
                  <div className="flex-none h-5 w-5" >
                    <ArrowLeftIcon onClick={previousWallpaper} />
                  </div>
                    <div className="flex-none h-5 w-5" >
                      <ArrowRightIcon onClick={nextWallpaper} />
                    </div></>)}
                </div>
                <div className="basis-1/4 ">
                  <Logo />
                </div>
              </div>
              <div className='flex flex-row basis-1/4 pt-1'>
                <div className="basis-11/12 pb-3">
                  <PaintingDetails artistDisplayName={currentWallpaper["artistDisplayName"]} title={currentWallpaper["title"]} objectBeginDate={currentWallpaper["objectBeginDate"]} objectEndDate={currentWallpaper["objectEndDate"]} collection={currentWallpaper["collection"]} />
                </div>
                <div className="basis-1/12 grid place-items-center ">
                  <div className="flex-none h-5 w-5">
                    <a onClick={() => openPage(currentWallpaper["resourceLink"])}>
                      <ArrowTopRightOnSquareIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>)
      }
    </>

  )
}
