'use client';
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { get_favorites } from "../state/manager";
import PaintingRow from "./PaintingRow";

export default function Favorites() {
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        get_favorites().then(res => setFavorites(res))
    }, [])
    return <main className="flex flex-col min-h-screen  bg-neutral-100 ">
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
        <div className="overflow-x-auto ">
            <table className="table-xs">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Painting</th>
                        <th>Artist</th>
                        <th>Details</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        favorites.map((painting,index) => <PaintingRow key={painting["id"]} painting={painting} index={index}/> )
                    }
                </tbody>
            </table>
        </div>

    </main>
}