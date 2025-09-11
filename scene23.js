const s5 = (p) => {

let myCanvas;
let glowIntensity = 0;
let hueShift = 0;  

p.setup = () => {
    const c = p.createCanvas(windowWidth,windowHeight);
    c.parent('scene23');
    p.colorMode(HSB, 360, 100, 100);
    p.noStroke();
}

p.draw = () => {
    p.background(p.lerpColor(p.color(0, 0, 100), p.color(220, 100, 100),
        (p.sin(frameCount * 0.01) * 0.5 + 0.5)));
    let t = p.sin(frameCount * 0.01) * 0.5 + 0.5;

    let white = p.color(0, 0, 100);
    let blue  = p.color(220, 100, 100);

    p.background(p.lerpColor(white, blue, t));

    p.drawGrid();
    hueShift = (hueShift + 1) % 360;
    }

p.drawGrid = () => {
  let cellSize = 40;
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      let d = dist(x, y, width / 2, height / 2);
      p.fill(
        220,
        100,
        p.map(p.sin(d * 0.05 + frameCount * 0.02), -1, 1, 20, 100)
      );
      p.rect(x, y, cellSize, cellSize);
    }
  }
}

};


new p5(s5);


