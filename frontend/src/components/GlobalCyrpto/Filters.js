"use client"
import React, { useContext, useRef } from "react";
import Search from "@/components/GlobalCyrpto/Search";
import submitIcon from "@/assests/submit-icon.svg";
 import selectIcon from "@/assests/select-icon.svg";
import { CryptoContext } from "@/Context/Cyrpto";
import Image from "next/image";

const Filters = () => {
  let { setCurrency, setSortBy, resetFunction } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencyChange = (e) => {
    e.preventDefault();
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div
      className="w-full h-12 border-2 border-gray-100 rounded-lg
    flex items-center justify-between relative
    "
    >
      <Search />
      <div className="flex mr-7">
      <div className="relative flex items-center font-nunito mr-12">
          <label htmlFor="currency" className="flex justify-center items-center mr-2 font-bold text-white">
            Currency:
          </label>
          <select
            name="currency"
            onChange={handleCurrencyChange}
            className="w-24 rounded bg-gray-200 placeholder:text-gray-100
            pl-2 required outline-0 border border-transparent 
            focus:border-cyan leading-4"
            defaultValue="usd" // Set default value
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
          </select>
          <Image src={selectIcon} alt="Select" className="" />
        </div>

        <label className="relative flex justify-center items-center">
          <span className="font-bold mr-2  text-white">sort by: </span>
          <select
            name="sortby"
            className="rounded bg-gray-200 text-base 
         pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-0
         "
            onClick={handleSort}
          >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
          </select>
          <Image
            src={selectIcon}
            alt="submit"
            className=""
          />
        </label>
        <button
          className="w-[2rem] ml-4 hover:scale-110 transition-all transition-ease
        relative
        "
          onClick={resetFunction}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-full h-full fill-cyan"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Filters;