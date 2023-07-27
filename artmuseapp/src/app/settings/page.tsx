'use client';
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { set_interval } from "../state/manager";

export default function Settings() {
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
                <input type="checkbox" className="toggle" />
            </label>
            <label className="label cursor-pointer">
                Take only from favorites
                <input type="checkbox" className="toggle" />
            </label>



        </div>

    </main>
}