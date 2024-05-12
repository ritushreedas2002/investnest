"use client";
import React from "react";
import Head from "next/head";
import CryptoTable from "./Compon";
import VirtualPortfolio from "./VirtualPortfolio";
import WatchList from "@/app/crypto/watchlist/page";
import Link from "next/link";
import Dashboard from "./Glassy";
import CryptoTopics from "./LearningChat";
import CoinCompare from "./CoinCompare";


const CryptoHome = () => {
  return (
    <div className="bg-gray-900 ml-16   min-h-screen text-white">
      <Head>
        <title>Crypto Dashboard</title>
        <meta
          name="description"
          content="Track real-time cryptocurrency data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4 h-screen ">
        <h1 className="text-3xl font-bold ">Cryptocurrency Dashboard</h1>
        <div className=" flex">
          <div className="my-4 ml-6 ">
            <VirtualPortfolio />
            <CoinCompare />
          </div>
          <div className=" w-[50%]">
            <h1 className="text-xl font-semibold mx-4 text-white mb-4">
              Cryptocurrencies
            </h1>
            <div className=" flex justify-end z-20 mr-6 -mt-12">
              <Link href="/">
                <button className="bg-blue-500 z-20 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-3 rounded">
                  View All
                </button>
              </Link>
            </div>
            <div className="h-64 rounded-xl relative m-4 bg-gray-600 overflow-y-auto no-scrollbar">
              <CryptoTable />
            </div>
            <h1 className="text-xl font-semibold mx-4 text-white mb-4">
              Your WatchList
            </h1>
            <div className=" h-64 m-4 rounded-xl overflow-y-auto no-scrollbar">
              <WatchList />
            </div>
          </div>
          <div className=" w-96">
            <CryptoTopics />
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
