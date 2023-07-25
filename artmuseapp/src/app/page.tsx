import Image from 'next/image'
import ChangeWallpaper from './ChangeWallpaper'
import Logo from './Logo'
import Favorite from './Favorite'
import PaintingDetails from './PaintingDetails'
export default function Home() {
  return (
    <main style={{backgroundImage: "url(https://images.metmuseum.org/CRDImages/ad/original/DP-1427-003.jpg)", backgroundSize: "cover", backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} className="flex min-h-screen flex-col items-center justify-between container">
        <div className='flex flex-col container mx-auto p-3' style={{background: "rgba(0, 0, 0, 0.5)",height:300}} >
          <div className='flex flex-row basis-3/4'>
            <div className="flex-none w-72 h-14" >
              <div className='flex'>
                <div className="flex-none w-8">
                  <Favorite />
                </div>
                <div className="flex-none w-8" >
                  <ChangeWallpaper />
                </div>
              </div>
            </div>
            <div className="flex-initial h-20 ">
              <Logo />
            </div>
          </div>
          <div className='flex flex-col basis-1/4'>
            <PaintingDetails />
          </div>
      </div>
    </main>
  )
}
