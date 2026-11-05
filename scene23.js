const s5 = (p) => {
// Grid
let myCanvas;

p.setup = () => {
    const c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.parent('scene23');
    p.colorMode(p.RGB, 255);
    p.noStroke();
}

p.draw = () => {
    const dark = p.color(32, 41, 46);
    const light = p.color(130, 158, 200);
    const t = p.sin(p.frameCount * 0.01) * 0.5 + 0.5;
    p.background(p.lerpColor(dark, light, t));

    p.drawGrid();
}

p.drawGrid = () => {
  const dark = p.color(32, 41, 46);
  const light = p.color(130, 158, 200);
  let cellSize = 30;
  for (let x = 0; x < p.width; x += cellSize) {
    for (let y = 0; y < p.height; y += cellSize) {
      let d = p.dist(x, y, p.width / 2, p.height / 2);
      const t = (p.sin(d * 0.05 + p.frameCount * 0.02) + 1) * 0.5;
      p.fill(p.lerpColor(dark, light, t));
      p.rect(x, y, cellSize, cellSize);
    }
  }
}

};


new p5(s5);
