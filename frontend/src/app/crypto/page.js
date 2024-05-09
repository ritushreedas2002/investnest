"use client";
import React from "react";
import Head from "next/head";
import CryptoTable from "./Compon";
import VirtualPortfolio from "./VirtualPortfolio";
import WatchList from "@/app/crypto/watchlist/page";
import Link from "next/link";
import Dashboard from "./Glassy";

const CryptoHome = () => {
  return (
    <div className="bg-gray-900   min-h-screen text-white">
      <Head>
        <title>Crypto Dashboard</title>
        <meta
          name="description"
          content="Track real-time cryptocurrency data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-8 h-screen " >
        <h1 className="text-3xl font-bold ">Cryptocurrency Dashboard</h1>
        <div className=" flex">
          <div className="m-4 ">
            <VirtualPortfolio />
          </div>
          <div className=" w-[45%]">
            <div className="h-1/3 rounded-xl  p-4 m-4 bg-gray-600  relative overflow-y-auto no-scrollbar">
              <div className="sticky flex justify-end top-0 right-0 z-10 -mt-8">
                <Link href="/">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-3 rounded">
                    View All
                  </button>
                </Link>
              </div>
              <CryptoTable />
            </div>
            <div>
              <WatchList />
            </div>
          </div>
        </div>

        {/* <div>
          <Dashboard />
        </div> */}
      </div>
    </div>
  );
};

export default CryptoHome;
