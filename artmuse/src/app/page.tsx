import Image from 'next/image'
import { motion } from "framer-motion"
import FloatingDiv from './FloatingDiv'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-12">
      <div className='flex h-screen flex-col items-center justify-between p-12'>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center  backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4 ">
            Contact US
          </p>
        </div>


        <div className="absolute left-0 top-0 place-items-center z-5  ">

        </div>

        <div className="flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full ">
          <div className='flex'>
            <Image
              className="relative drop-shadow-lg  z-10"
              src="/ArtmuseLandingPageLogo.png"
              alt="ArtMuse Logo"
              width={700}
              height={160}
              priority
            />
          </div>
          <div className="flex z-5">
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/1.jpg" width={600} height={300} alt="" />
            </FloatingDiv>
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/2.jpg" width={800} height={300} alt="" />
            </FloatingDiv>
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/3.jpg" width={500} height={300} alt="" />
            </FloatingDiv>
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/4.jpg" width={700} height={300} alt="" />
            </FloatingDiv>
            <FloatingDiv>
              <div></div>
            </FloatingDiv>
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/6.jpg" width={400} height={300} alt="" />
            </FloatingDiv>
            <FloatingDiv>
              <Image className="h-auto max-w-full" src="/paintings/7.jpg" width={900} height={300} alt="" />
            </FloatingDiv>
          </div>
          <div>
            <div className='text-2 xl text-center pt-10 space-y-3 drop-shadow-xl'>
              <p>Unleash Artistry on Your Screen - Discover Your Next Favorite Wallpaper Today!</p>
              <p>An ever-expanding array of artfully chosen paintings, Transform your computer into a captivating gallery.</p>
            </div>

          </div>
        </div>
        <div>
        </div>
      </div>

      <div className='pt-10 flex flex-col w-screen z-20 bg-neutral-100 place-items-center '>

        <div className='flex flex-col justify-center'>
          <p className='text-md text-center'>
            Get Artmuse now
          </p>
          <p className='text-2xl text-center'>
          Available on Windows
          </p>
          <p className='text-xl text-center'>
          Arriving soon on Mac & Linux
          </p>
        <Image className='pl-5 pt-10' src="/Get it from MS.png" width={200} height={300} alt='' />
        </div>
        <Image className="justify-center" src="/mockup.png" width={1000} height={300} alt="" />



      </div>

    </main>
  )
}
