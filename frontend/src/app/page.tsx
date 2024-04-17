"use client"
import Image from "next/image";
import Navbar from "@/components/Navbar"
import Carousal from "@/components/GlobalCyrpto/Carousal"
import CoinTable from "@/components/GlobalCyrpto/CoinTable"
import Filters from "@/components/GlobalCyrpto/Filters"
import { CryptoProvider } from "@/Context/Cyrpto"
import Pagination from "@/components/GlobalCyrpto/Pagination"
const Home=()=>{
  return (
    <CryptoProvider>
    <div  className="bg-gray-800 min-h-screen">
      {/* <Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} /> */}
      <div className="relative z-10"> {/* This div ensures content is above the background image */}
        <Navbar />
        <Carousal /> 
        <Filters/>
        <CoinTable />
        <Pagination/>
      </div>

    </div>
    </CryptoProvider>
  )
}
export default Home;