"use client";
import Image from 'next/image'
import FloatingDiv from './FloatingDiv'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import { TypeAnimation } from 'react-type-animation';
import Script from 'next/script'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-12">
      <div className='flex h-screen flex-col items-center justify-between p-12'>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <a href="mailto:amirbrahamm@gmail.com" className="fixed left-0 top-0 flex w-full justify-center  backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4 ">
            Contact US
          </a>
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
            <div className='text-2xl text-center pt-10 space-y-3 drop-shadow-xl'>
              <p>Unleash Artistry on Your Screen - Discover Your Next Favorite Wallpaper Today!</p>
              <p className='pb-5 text-center'>
                An ever-expanding array of artfully chosen paintings to transform your computer into a captivating gallery.
              </p>
            </div>


          </div>
        </div>
        <div>
        </div>
      </div>

      <div className='pt-10 flex flex-col w-screen z-20 bg-neutral-100 place-items-center '>

        <div className='flex flex-col justify-center'>
          <p className='text-lg pb-5 text-center'>
            Get Artmuse now
          </p>

          <p className='text-2xl text-center pb-3'>
            Available now on Windows & Mac
          </p>

          
      <Script src="https://gumroad.com/js/gumroad.js" />

            <a className="gumroad-button" href="https://amirbrahamm.gumroad.com/l/artmuse">Get it on </a>
        </div>
        <div>
          <div className='flex flex-col'>
            <Image className="justify-center" src="/mockup.png" width={1000} height={300} alt="" />
           
          </div>
          <div className='text-center pb-5'>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Crystal-clear quality',
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              'Add Wallpapers to favorites for offline use',
              2000,
              'New updates with new collections ',
              1000,
              "All pictures are from some of the world's best galleries and museums.",
              3000
            ]}
            wrapper="span"
            deletionSpeed={80}
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            cursor={false}
            repeat={Infinity}
          />
          </div>
          
        </div>
      </div>
      <div className='p-10 flex flex-col w-screen z-20 bg-neutral-200 place-items-center '>
        <p className='text-md'>Developed with &#128151; by Amir Braham</p>
      </div>

    </main>
  )
}
