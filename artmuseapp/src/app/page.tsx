import Image from 'next/image'
import ChangeWallpaper from './ChangeWallpaper'

export default function Home() {
  return (
    <main style={{backgroundImage:"url(https://images.metmuseum.org/CRDImages/ad/original/DP-1427-003.jpg)",backgroundSize:"cover",backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}} className="flex min-h-screen flex-col items-center justify-between container">
      <div style={{
        height: 300,
        width: 400,
        display:'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}>

<ChangeWallpaper />

      </div>
    </main>
  )
}
