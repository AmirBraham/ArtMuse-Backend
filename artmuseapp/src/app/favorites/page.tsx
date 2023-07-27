'use client';
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { get_favorites, remove_favorite } from "../state/manager";
import PaintingRow from "./PaintingRow";

export default function Favorites() {
    const unfavorite = (id) => {
        remove_favorite(id)
        const filtered_favorites =favorites.filter(painting => painting["id"] != id)
        setFavorites(filtered_favorites)
    }
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        get_favorites().then(res => { console.log(res); setFavorites(res) })
    }, [])
    return <main className="flex flex-col h-screen  bg-neutral-100 	">
        <div className="flex flex-row basis-1/4  bg-neutral-300 w-screen  p-3 place-content-start">
            <div className="basis-1/12 ">
                <Link href="/settings">
                    <ArrowLeftIcon className="h-5 pt-1 " />
                </Link>
            </div>
            <div className="basis-11/12 h-6  flex flex-row">
                <div className="text-black text-xl text-center basis-11/12">
                    <p>Favorites</p>
                </div>

            </div>
        </div>
        <ul className="max-h-screen overflow-y-auto p-4">
                {
                    favorites.map((painting, index) =><li key={painting["id"]} > <PaintingRow unfavorite={unfavorite}  painting={painting} index={index} /></li>)
                }
        </ul>

    </main>
}