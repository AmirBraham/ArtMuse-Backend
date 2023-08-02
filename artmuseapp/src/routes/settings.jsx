import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { toggle_start_on_startup, toggle_take_only_from_favorites, get_start_on_startup, get_take_only_from_favorites, clear_store, get_favorites, get_next_wallpaper_date, set_next_wallpaper_date, get_interval, set_interval } from "../state/manager";
import { useEffect, useState } from "react";
import { addMilliseconds } from "date-fns";
export default function Settings() {
    const [takeOnlyFromFavorites, setTakeOnlyFromFavorites] = useState(false)
    const [startOnStartup, setStartOnStartup] = useState(false)
    const [value, setValue] = useState("Manually");
    const handleChange = async (e) => {
        setValue(e.target.value)
        if (e.target.value == "Manually") {
            set_next_wallpaper_date(null)
            set_interval(null)
            return
        }
        const millisecondsToAddToCurrentDate = parseInt(e.target.value)
        let currentDate = new Date()
        const next_wallpaper_date = addMilliseconds(currentDate, millisecondsToAddToCurrentDate)
        set_next_wallpaper_date(next_wallpaper_date)
        set_interval(e.target.value)
        return next_wallpaper_date
    };

    useEffect(() => {
        get_start_on_startup().then(res => {
            setStartOnStartup(res)
        })
        get_take_only_from_favorites().then(res => setTakeOnlyFromFavorites(res))
        get_interval().then(res => {
            console.log("interval , ", res)
            if (res == null) {
                setValue("Manually")
            } else {
                setValue(res)
            }

        })
    }, [])
    const toggleStartOnStartup = async () => {
        await toggle_start_on_startup()
        setStartOnStartup(!startOnStartup)
    }
    const toggleTakeFromFavorites = async () => {
        const favorites = await get_favorites()
        if (!takeOnlyFromFavorites && favorites.length == 0) {
            alert("Add Wallpapers to favorites before ")
            return
        }
        await toggle_take_only_from_favorites()
        setTakeOnlyFromFavorites(!takeOnlyFromFavorites)
    }
    return <main className="flex flex-col h-screen  bg-neutral-100 ">
        <div className="flex flex-row basis-3/12   bg-neutral-300 w-screen  p-3 place-content-start">
            <div className="basis-1/12 ">
                <Link to="/">
                    <ArrowLeftIcon className="h-5 pt-1 " />
                </Link>
            </div>
            <div className="basis-11/12 h-6  flex flex-row">
                <div className="text-black text-xl text-center basis-11/12">
                    <p>Settings</p>
                </div>
                <div className="basis-1/12 flex flex-col">
                    <Link to="/favorites">
                        <StarIcon className="flex-1 text-yellow-500"></StarIcon>
                    </Link>
                </div>
            </div>
        </div>
        <div className="flex flex-col basis-7/12  px-4 ">

            <label className="label cursor-pointer">
                Start on Startup
                <input onChange={toggleStartOnStartup} type="checkbox" checked={startOnStartup} className="checkbox" />
            </label>
            <label className="label cursor-pointer">
                Take only from favorites
                <input onChange={toggleTakeFromFavorites} type="checkbox" checked={takeOnlyFromFavorites} className="checkbox" />
            </label>
            <label className="label cursor-pointer">
                Change Wallpaper
                <select value={value} className=" ring-1 ring-black ring-opacity-5 rounded-md bg-white shadow-lg" onChange={
                    handleChange
                }>
                    <option value="Manually">Manually</option>
                    <option value="600000">15 minutes</option>
                    <option value="1800000">30 minutes</option>
                    <option value="21600000">1 hour</option>
                    <option value="3600000">6 hour</option>
                    <option value="86400000">1 day</option>
                </select>
            </label>
        </div>
        <div>

        </div>
        <div className="flex flex-col basis-1/12 pb-3  items-center">

            <div className="text-xs pb-1">
                <button onClick={() => {
                    clear_store().then(() => window.location.reload())}}>Reset to default settings</button>
            </div>
            <div>
                <p className="text-xs">Have a suggestion or a problem ? Reach out to us <a target="_blank" href="https://www.google.com"  >here</a> </p>
            </div>
        </div>


    </main>
}