"use client"
import Image from "next/image";
import background from "@/assets/background.png"
import Navbar from "@/components/Navbar"
import Carousal from "@/components/GlobalCyrpto/Carousal"
const Home=()=>{
  return (
    <div>
      <Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} />
        <Navbar/>
        <Carousal/>

    </div>
  )
}
export default Home;