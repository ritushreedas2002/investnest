"use client"
// import Image from "next/image";
// import Navbar from "@/components/Navbar"
// import Carousal from "@/components/GlobalCyrpto/Carousal"
// import CoinTable from "@/components/GlobalCyrpto/CoinTable"
// import Filters from "@/components/GlobalCyrpto/Filters"
// import { CryptoProvider } from "@/Context/Cyrpto"
// import Pagination from "@/components/GlobalCyrpto/Pagination"
// const Home=()=>{
//   return (
//     <CryptoProvider>
//     <div  className="bg-gray-800 min-h-screen">
//       {/* <Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} /> */}
//       <div className="relative z-10"> {/* This div ensures content is above the background image */}
//         <Navbar />
//         <Carousal /> 
//         <Filters/>
//         <CoinTable />
//         <Pagination/>
//       </div>

//     </div>
//     </CryptoProvider>
//   )
// }
// export default Home;

import { useRouter } from 'next/navigation';
import axios from 'axios';

import Navbar from "@/components/Navbar";
import Carousal from "@/components/GlobalCyrpto/Carousal";
import CoinTable from "@/components/GlobalCyrpto/CoinTable";
import Filters from "@/components/GlobalCyrpto/Filters";
import { CryptoProvider } from "@/Context/Cyrpto";
import Pagination from "@/components/GlobalCyrpto/Pagination";

const Home = () => {
  const router=useRouter()

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.get('/api/users/logout');

      // Redirect to the login page after logout
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally handle errors, e.g., show an error message
    }
  };

  return (
    <CryptoProvider>
      <div className="bg-gray-800 min-h-screen">
        {/* <Image src={background} alt="background" layout="fill" objectFit="cover" quality={100} /> */}
        <div className="relative z-10"> {/* This div ensures content is above the background image */}
          <Navbar />
          <Carousal />
          <Filters />
          <CoinTable />
          <Pagination />
        </div>
      </div>
      <button onClick={handleLogout} className="absolute  right-0 m-4 p-2 bg-red-500 text-white rounded cursor-pointer">Logout</button>
    </CryptoProvider>
  )
}

export default Home;