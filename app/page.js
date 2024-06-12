"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { BallManager } from "./Ball_classes/BallManager";
import { POST } from "./api/addball/route";
import axios from "axios";

export default function Home() {
  const [ballManager, setBallManager] = useState();
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(1, canvasRef.current);
      setBallManager(ballManager);
    }
  }, [canvasRef]);
  return (
    <div className=" bg-violet-950 flex flex-col lg:flex-row items-center justify-center">
      <canvas
        ref={canvasRef}
        width="800"
        height={800}
        className="border-2 border-slate-200 rounded-lg m-3 mr-9 "
      ></canvas>
      {/* <button className="border-2 px-5 py-2 rounded-lg hover:bg-amber-950">
          Add ball
        </button> */}
      <button
        class="relative inline-block text-lg group ml-9"
        onClick={async () => {
          const respose = await axios.post(
            "https://gambling-game.vercel.app/api/addball",
            { data: 1 }
          );
          if (ballManager) {
            console.log(respose);
            ballManager.addBall(respose.data.point);
          }
        }}
      >
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Add Ball</span>
        </span>
        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </button>
    </div>
  );
}
