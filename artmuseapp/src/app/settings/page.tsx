'use client';
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { toggle_start_on_startup, toggle_take_only_from_favorites,get_start_on_startup,get_take_only_from_favorites } from "../state/manager";
import { useEffect, useState } from "react";

export default function Settings() {
    const [takeOnlyFromFavorites,setTakeOnlyFromFavorites] = useState(false)
    const [startOnStartup,setStartOnStartup] = useState(false)
    const [interval,setInterval] = useState({
       autoChangeWallpaper:false
    })
    useEffect(() => {
        get_start_on_startup().then(res=>{
            setStartOnStartup(res)
        })
        get_take_only_from_favorites().then(res=>setTakeOnlyFromFavorites(res))
    },[])
    const toggleStartOnStartup = async () => {
        await toggle_start_on_startup()
        setStartOnStartup(!startOnStartup)
    }
    const toggleTakeFromFavorites = async () => {
        await toggle_take_only_from_favorites()
        setTakeOnlyFromFavorites(!takeOnlyFromFavorites)
    }
    return <main className="flex flex-col min-h-screen  bg-neutral-100 ">
        <div className="flex flex-row basis-1/4  bg-neutral-300 w-screen  p-3 place-content-start">
            <div className="basis-1/12 ">
                <Link href="/">
                    <ArrowLeftIcon className="h-5 pt-1 " />
                </Link>
            </div>
            <div className="basis-11/12 h-6  flex flex-row">
                <div className="text-black text-xl text-center basis-11/12">
                    <p>Settings</p>
                </div>
                <div className="basis-1/12 flex flex-col">
                    <Link href="/favorites">
                        <StarIcon className="flex-1 text-yellow-500"></StarIcon>
                    </Link>

                </div>
            </div>
        </div>
        <div className="flex flex-col basis-3/4 px-4">

            <label className="label cursor-pointer">
                Start on Startup
                <input onChange={toggleStartOnStartup} type="checkbox" checked={startOnStartup} className="checkbox" />
            </label>
            <label className="label cursor-pointer">
                Take only from favorites
                <input onChange={toggleTakeFromFavorites} type="checkbox" checked={takeOnlyFromFavorites} className="checkbox" />
            </label>



        </div>

    </main>
}