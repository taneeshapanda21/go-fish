let fishes = [];
let fishx = 100;
let fishy = 100;
let colors = ["#00fff3","#ff3300"]
let fun;

function preload(){
  fun = loadImage("assets/funstar.png");
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent('scene2');
}

class Particle {
  constructor() {
    this.x = random(0,width/4);
    this.y = random(0,height);
    this.vx = random(4, 7); // random velocity
    this.alpha = 255; // opacity
    
    if (random(1) < 0.9) {
      this.c = color(colors[0]); // mostly color1
    } else {
      this.c = color(colors[1]); // rare color2
    }
  }
  

  update() {
    this.vx -= 0.01
    this.x += this.vx;
    this.alpha -= 1; // fade out 
  }

  show() {
    noStroke();
    fill(this.c.levels[0], this.c.levels[1], this.c.levels[2], this.alpha);
    push();
    translate(this.x, this.y);

    // body
    ellipse(0, 0, 200,50);
                // 60, 30
    // tail (triangle)
    triangle(-100, 0, -130, -25, -130, 25);

    pop();
  }

  isFinished() {
    return this.alpha <= 0; // Particle is finished when it's fully transparent
  }
}

function draw() {
  image(fun, 0, 0, width, height);
  
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
