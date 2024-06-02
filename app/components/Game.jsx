import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Game = () => {
    const [ballManager, setBallmanger] = useState()
    const canavasRef = useRef();
    useEffect(()=>{
        if(canavasRef.current){
            const ballManager = null 
        }
    }, [canavasRef])
  return (
    <div>
        <canvas ref={canavasRef} 
        width="900"
        height ="900">
        </canvas>
        <button>
            Add ball
        </button>
        {/* need to add functionality to the button */} 
    </div>
  )
}

export default Game

