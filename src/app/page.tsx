"use client"
import Image from "next/image";
import background from "@/assets/background.png"
import Navbar from "@/components/Navbar"
import Carousal from "@/components/GlobalCyrpto/Carousal"
import CoinTable from "@/components/GlobalCyrpto/CoinTable"
const Home=()=>{
  return (
    <div style={{ 
      backgroundImage: `url(${background.src})`, // Adjusted for Next.js image import
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the div takes up at least the height of the viewport
  
    }}>
      <Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} />
      <div className="relative z-10"> {/* This div ensures content is above the background image */}
        <Navbar />
        <Carousal /> 
        <CoinTable />
      </div>

    </div>
  )
}
export default Home;