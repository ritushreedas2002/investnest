"use client"
import React, { useContext, useRef } from "react";
import paginationArrow from "@/assests/search-icon.svg";
import { CryptoContext } from "@/Context/Cyrpto";
import submitIcon from "@/assests/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito
          mr-12
          "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center
          mr-2 font-bold
          "
      >
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={200}
        ref={inputRef}
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-black
     pl-2 required outline-0 border border-transparent 
     focus:border-cyan leading-4
     "
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center  text-white">
        <PerPage />
        <ul className="flex items-center justify-end text-sm">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan-700 w-8" onClick={prev}>
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepPrev}
                className="ouline-0 hover:text-cyan-700  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="ouline-0 hover:text-cyan-700  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {" "}
                {page - 1}{" "}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan-700 text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="ouline-0 hover:text-cyan-800  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepNext}
                className="ouline-0 hover:text-cyan-600  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="ouline-0 hover:text-cyan-700  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;