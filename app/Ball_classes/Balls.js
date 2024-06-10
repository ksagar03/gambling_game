import { gravity, horizontal_friction, vertical_friction } from "./constants";
import { pad, unpad } from "./paddings";

export class Ball {
  constructor(x, y, radius, color, ctx, obstacles, sinks, onFinish) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.ctx = ctx;
    this.obstacles = obstacles;
    this.sinks = sinks;
    this.onFinish = onFinish;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.obstacles.forEach((obstacle) => {
      const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
      if (dist < pad(this.radius + obstacle.radius)) {
        //  this is to calculate the collision angle
        const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);

        // reflect veloctiy - this is to calculate the speed at which it needs to be bounce back
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx = Math.cos(angle) * speed * horizontal_friction;
        this.vy = Math.sin(angle) * speed * vertical_friction;

        // Some times when the ball colides with the obstacles it will overlap the obstacles So to over come this we need to update the position of the ball (i.e the x and y position)
        const overlap = this.radius + obstacle.radius - unpad(dist);
        this.x += pad(Math.cos(angle) * overlap);
        this.y += pad(Math.sin(angle) + overlap);
      }
    });
    // console.log(this.x, this.y);
    for (let i = 0; i < this.sinks.length; i++) {
      const sink = this.sinks[i];
      if (
        unpad(this.x) > sink.x - sink.width / 2 &&
        unpad(this.x) < sink.x + this.width / 2 &&
        unpad(this.y) + this.radius > sink.y - sink.height / 2
      ) {
        this.vx = 0;
        this.vy = 0;
        this.onFinish(i);
        break;
      }
    }
  }
}
