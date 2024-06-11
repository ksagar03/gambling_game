import { useEffect, useRef, useState } from "react";
import { BallManager } from "../Ball_classes/BallManager";
import { WIDTH } from "../Ball_classes/constants";
import { pad } from "../Ball_classes/paddings";
import { resolve } from "styled-jsx/css";

const Simulation = () => {
  const canvasRef = useRef();
  let [outputs, setOutputs] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
  });
  async function simulate(ballManager) {
    let i = 0;
    while (true) {
      i++;
      ballManager.addBall(pad(WIDTH / 2 + 20 * (Math.random() - 0.5)));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        
        (index, startX) => {
          setOutputs((outputs) => {
            return {
              ...outputs,
              [index]: [...BallManager(outputs[index] || []), startX],
            };
          });
        },
        canvasRef.current
      );
      simulate(ballManager);

      return () => {
        ballManager.stop;
      };
    }
  }, [canvasRef]);
  return (
   
      <div className="flex flex-col justify-center items-center ">
        {JSON.stringify(outputs, null, 2)}
        <camvas ref={canvasRef} width="800" height="800"></camvas>
      </div>
  );
};

export default Simulation;
