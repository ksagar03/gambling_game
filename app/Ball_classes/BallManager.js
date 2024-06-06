"use client";
import {
  HEIGHT,
  NUM_SINKS,
  WIDTH,
  ball_radius,
  obstacle_radius,
  sinkWidth,
} from "./constants";
import { pad, unpad } from "./paddings";
import { Ball } from "./Balls";
import { Obstacles } from "./objects";
import Error from "next/error";

const create_Obstacles = () => {
  let obstacles = [];
  const No_of_row = 18;
  for (let row = 2; row < No_of_row; row++) {
    const numObstacles = row + 1;
    const y = 0 + row * 35;
    const spacing = 36;
    for (let col = 0; col < numObstacles; col++) {
      const x = WIDTH / 2 - spacing * (row / 2 - col);
      obstacles.push({
        x: pad(x),
        y: pad(y),
        radius: obstacle_radius,
      });
    }
  }
  return obstacles;
};
const MULTIPLIERS = {
  1: 16,
  2: 9,
  3: 2,
  4: 1.4,
  5: 1.4,
  6: 1.2,
  7: 1.1,
  8: 1,
  9: 0.5,
  10: 1,
  11: 1.1,
  12: 1.2,
  13: 1.4,
  14: 1.4,
  15: 2,
  16: 9,
  17: 16,
};
const create_sink = () => {
  const sinks = [];
  const spacing = obstacle_radius * 2;
  for (let i = 0; i < NUM_SINKS; i++) {
    const x =
      WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS / 2)) - spacing * 1.5;
    const y = HEIGHT - 170; // this will be modified further for making it responsive
    const width = sinkWidth;
    const height = sinkWidth;
    sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i + 1] });
  }
  return sinks;
};

export class BallManager {
  constructor(onFinish, canvasRef) {
    this.balls = [];
    this.canvasRef = canvasRef;
    this.ctx = this.canvasRef.getContext("2d");
    this.obstacles = create_Obstacles();
    this.sinks = create_sink();
    this.update();
    this.onFinish = onFinish;
  }
  addBall(startX) {
    const newBall = new Ball(
      startX || pad(WIDTH / 2 + 13),
      pad(50),
      ball_radius,
      "red",
      this.ctx,
      this.obstacles,
      this.sinks,
      (index) => {
        this.balls = this.balls.filter((ball) => ball !== newBall);
        this.onFinish(index, startX);
      }
    );
    this.balls.push(newBall);
  }
  drawObstacles() {
    if (!this?.ctx) {
      alert("canvas is not formed");
    }

    this.ctx.fillStyle = "white";
    this.obstacles.forEach((obstacle) => {
      this.ctx.beginPath();
      this.ctx.arc(
        unpad(obstacle.x),
        unpad(obstacle.y),
        obstacle.radius,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  getColor(index) {
    if (index < 3 || index > this.sinks.length - 3) {
      return { background: "#ff003f", color: "white" };
    }
    if (index < 6 || index > this.sinks.length - 6) {
      return { background: "#ff7f00", color: "white" };
    }
    if (index < 9 || index > this.sinks.length - 9) {
      return { background: "#ffbf00", color: "black" };
    }
    if (index < 12 || index > this.sinks.length - 12) {
      return { background: "#ffff00", color: "black" };
    }
    if (index < 15 || index > this.sinks.length - 15) {
      return { background: "#bfff00", color: "black" };
    }
    return { background: "#7fff00", color: "black" };
  }

  Draw_Sinks() {
    let canvas = this?.ctx;
    canvas.fillStyle = "green";
    const Spacing = obstacle_radius * 2;
    for (let i = 0; i < this.sinks.length; i++) {
      this.ctx.fillStyle = this.getColor(i).background;
      const sink = this.sinks[i];
      this.ctx.font = "normal 13px Arial";
      this.ctx.fillRect(
        sink.x,
        sink.y - sink.height / 2,
        sink.width - Spacing,
        sink.height
      );
      this.ctx.fillStyle = this.getColor(i).color;
      this.ctx.fillText(
        sink?.multiplier?.toString() + "x",
        sink.x + sinkWidth / 2 - 5,
        sink?.y + 5
      );
      this.ctx.textAlign = "center";
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.drawObstacles();
    this.Draw_Sinks();
    this.balls.forEach((ball) => {
      ball.draw();
      ball.update();
    });
  }

  update() {
    this.draw();
    this.requestID = requestAnimationFrame(this.update.bind(this));
  }
  stop() {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
  }
}
