'use client';

import Image from 'next/image'
import ChangeWallpaper from './ChangeWallpaper'
import Logo from './Logo'
import Favorite from './Favorite'
import PaintingDetails from './PaintingDetails'
import { ArrowRightIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { get_current_wallpaper, get_limit, get_page, init, set_page } from './state/manager';
import { getWallpaper } from './state/api';
import { Wallpaper } from './types';

const Loadera = () => {
  return (
    <div className="bg-blue-500 h-[100vh] w-[100vw] flex items-center justify-center text-center flex-col">
      <h1 className="text-white mb-4 text-5xl ">Welcome!</h1>
      <h1 className="text-white mb-4 text-2xl ">One Moment Please...</h1>
    </div>
  );
};


export default function Home() {
  const [loading, setLoading] = useState({
    load: true,
    loadedOnce: false,
  });
  const [currentWallpaper, setCurrentWallpaper] = useState({})
  useEffect(() => {
    console.log("loading only once")
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

  useEffect(()=> {
    console.log("downloading wallpaper and setting it as WALLPAPER")
  },[currentWallpaper])

  const nextWallpaper = async () => {
    const prev_page = await get_page()
    await set_page(prev_page+1)
    const page:number = await get_page()
    const limit:number = await get_limit()
    const wallpaper:Wallpaper = await getWallpaper(limit,page)
    setCurrentWallpaper(wallpaper)
  }
  const previousWallpaper = async () => {
    const prev_page = await get_page()
    await set_page(prev_page-1)
    const page:number = await get_page()
    const limit:number = await get_limit()
    console.log(page)
    const wallpaper:Wallpaper = await getWallpaper(limit,page)
    setCurrentWallpaper(wallpaper)
  }
  return (
    <>
      {
        loading.load && !loading.loadedOnce ? (
          <Loadera />
        ) : (
          <main style={{ backgroundImage: "url("+currentWallpaper["imageLink"]+")", backgroundSize: "cover", backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex min-h-screen flex-col items-center justify-between container ">
            <div className='flex flex-col container mx-auto p-3 ' style={{ background: "rgba(0, 0, 0, 0.5)", height: 300 }} >
              <div className='flex flex-row basis-3/4 '>
                <div className="basis-3/4 pt-1 flex space-x-2" >
                  <div className="flex-none h-5 w-5" >
                    <button>
                      <Favorite />
                    </button>
                  </div>
                  <div className="flex-none h-5 w-5" >
                    <ChangeWallpaper />
                  </div>
                  <div className="flex-none h-5 w-5" >
                    <ArrowLeftIcon onClick={previousWallpaper} />
                  </div>
                  <div className="flex-none h-5 w-5" >
                    <ArrowRightIcon onClick={nextWallpaper} />
                  </div>
                </div>
                <div className="basis-1/4 ">
                  <Logo />
                </div>
              </div>
              <div className='flex flex-row basis-1/4 pt-1'>
                <div className="basis-11/12">
                  <PaintingDetails />
                </div>
                <div className="basis-1/12 grid place-items-center ">
                  <div className="flex-none h-5 w-5">
                    <ArrowTopRightOnSquareIcon />

                  </div>

                </div>
              </div>
            </div>
          </main>)
      }
    </>

  )
}
