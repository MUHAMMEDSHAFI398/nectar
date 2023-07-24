"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function WelcomeSection() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const text = "Wselcome to Nectar";
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <p className="text-white text-9xl font-bold mb-[200px]">{displayText}</p>
      </div>
      <div className="flex justify-center mb-5">
        <Link href="/upload">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Click here
        </button>
        </Link>
      
      </div>
    </div>
  );
}

export default WelcomeSection;
