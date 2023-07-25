import Image from 'next/image'
import ChangeWallpaper from './ChangeWallpaper'
import Logo from './Logo'
import Favorite from './Favorite'
import PaintingDetails from './PaintingDetails'
import { ArrowRightIcon, ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
export default function Home() {
  return (
    <main style={{ backgroundImage: "url(https://images.metmuseum.org/CRDImages/ad/original/DP-1427-003.jpg)", backgroundSize: "cover", backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex min-h-screen flex-col items-center justify-between container">
      <div className='flex flex-col container mx-auto p-3 ' style={{ background: "rgba(0, 0, 0, 0.5)", height: 300 }} >
        <div className='flex flex-row basis-3/4 '>
          <div className="basis-3/4 pt-1 flex space-x-2" >
            <div className="flex-none h-5 w-5">
              <Favorite />
            </div>
            <div className="flex-none h-5 w-5" >
              <ChangeWallpaper />
            </div>
            <div className="flex-none h-5 w-5" >
              <ArrowLeftIcon />
            </div>
            <div className="flex-none h-5 w-5" >
              <ArrowRightIcon />
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
    </main>
  )
}
