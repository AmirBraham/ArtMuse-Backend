'use client';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
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
            <div className="basis-10/12  h-6">
                <p className="text-black text-xl text-center ">Settings</p>
            </div>
        </div>
        <div className="flex flex-col basis-3/4">
            <div>

            <label className="label cursor-pointer">
                Start on Startup
                <input type="checkbox" className="toggle" />
            </label>
            </div>
            <div>

            <button title="change interval" onClick={() => set_interval(5)}>Change Interval</button>

            </div>

        </div>

    </main>
}