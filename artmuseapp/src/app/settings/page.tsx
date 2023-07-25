import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Settings() {
    return <main className="flex flex-col min-h-screen  bg-neutral-100 flex-col items-center justify-between">
        <div className="flex flex-row basis-6/12  bg-neutral-300 w-screen  p-3 place-content-start">
            <div className="basis-1/12 ">
                <Link  href="/">
                    <ArrowLeftIcon className="h-5 pt-1 " />
                </Link>
            </div>
            <div className="basis-10/12  h-6">
                <p className="text-black text-xl text-center ">Settings</p>
            </div>
        </div>

    </main>
}