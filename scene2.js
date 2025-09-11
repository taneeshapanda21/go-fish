const s3 = (p) => {
let fishes = [];
let fishx = 100;
let fishy = 100;
let colors = ["#00fff3","#ff3300"]
let fun;

p.preload = () => {
  fun = p.loadImage("assets/funstar.png");
}

p.setup = () => {
  const c = p.createCanvas(windowWidth, windowHeight);
  c.parent('scene2');
}

class Particle {
  constructor() {
    this.x = p.random(0,width/4);
    this.y = p.random(0,height);
    this.vx = p.random(4, 7); // random velocity
    this.alpha = 255; // opacity
    
    if (p.random(1) < 0.9) {
      this.c = p.color(colors[0]); // mostly color1
    } else {
      this.c = p.color(colors[1]); // rare color2
    }
  }
  update() {
    this.vx -= 0.01
    this.x += this.vx;
    this.alpha -= 1; // fade out 
  }

  show() {
    p.noStroke();
    p.fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.alpha);
    p.push();
    p.translate(this.x, this.y);

    // body
    p.ellipse(0, 0, 200,50);
                // 60, 30
    // tail (triangle)
    p.triangle(-100, 0, -130, -25, -130, 25);

    p.pop();
  }

  isFinished() {
    return this.alpha <= 0; // Particle is finished when it's fully transparent
  }
}

p.draw = () => {
  p.image(fun, 0, 0, width, height);
  
  if (frameCount % 10 === 0) {   // every 5 frames
  fishes.push(new Particle());
}
  
  // loop through each particle in reverse order
  for (let i = fishes.length - 1; i >= 0; i--) {
    fishes[i].update(); // update the particle's position
    fishes[i].show(); // display the particle

    // remove the particle from the array if it's finished
    if (fishes[i].isFinished()) {
      fishes.splice(i, 1);
    }
  }
}
p.windowResized = () => {
  p.resizeCanvas(windowWidth, windowHeight);
}

  };

  new p5(s3);
