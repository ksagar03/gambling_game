"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { BallManager } from "./Ball_classes/BallManager";

export default function Home() {
  const [ballManager, setBallManager] = useState();
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(1,canvasRef.current);
      setBallManager(ballManager);
    }
  }, [canvasRef]);
  return (
    <div className=" flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height={800}></canvas>
    </div>
  );
}
