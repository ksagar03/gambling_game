// import express from express
// import cors from cors

import { NextResponse } from "next/server";

// const app = express()
// app.use(cors())
import { Outcomes } from "@/app/Ball_classes/Outcums";
const MULTIPLIERS = {
  0: 16,
  1: 9,
  2: 2,
  3: 1.4,
  4: 1.4,
  5: 1.2,
  6: 1.1,
  7: 1,
  8: 0.5,
  9: 1,
  10: 1.1,
  11: 1.2,
  12: 1.4,
  13: 1.4,
  14: 2,
  15: 9,
  16: 16,
};
const totalDrops = 16;

export async function POST() {
  let outcome = 0;
  const pattern = [];
  for (let i = 0; i < totalDrops; i++) {
    if (Math.random() > 0.5) {
      pattern.push("R");
      outcome++;
    } else {
      pattern.push("L");
    }
  }
  const multiplier = MULTIPLIERS[outcome];
  const possibleOutcomes = Outcomes[outcome];

  return NextResponse.json({
    point:
      possibleOutcomes[
        Math.floor(Math.random() * possibleOutcomes.length || 0)
      ],
    multiplier,
    pattern,
  });
}

// export async function GET() {
//   return NextResponse.json({ message: "Hello from Next.js!" });
// }
