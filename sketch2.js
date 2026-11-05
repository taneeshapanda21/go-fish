const s2 = (p) => {
  // Moire
    let spacing = 15; 
    let bubbles = [];
  
    
    p.setup = () => {
      const c = p.createCanvas(p.windowWidth, p.windowHeight);
      c.parent('sketch2');
      bubbles = Array.from({ length: 10 }, () => ({
        x: p.random(-p.width, p.width),
        y: p.random(p.height),
        speed: 0.6,
        size: 100,
        noiseOffset: p.random(1000)
      }));
    };

    p.draw = () => {
      p.background(130, 158, 200);
      
      p.strokeWeight(1);
      p.stroke(32, 41, 46, 70);
      const lineSpacing = 10;
      const swayOne = p.sin(p.frameCount * 0.004) * 12;
      const swayTwo = p.sin(p.frameCount * 0.004 + p.PI) * 12;

      for (let x = 0; x < p.width; x += lineSpacing) {
        p.line(x + swayOne, 0, x + swayOne, p.height);
        p.line(x + lineSpacing / 2 + swayTwo, 0, x + lineSpacing / 2 + swayTwo, p.height);
      }
      for (let y = p.height / 2; y < p.height; y += spacing) {
        p.strokeWeight(2)
        p.stroke(110, 219, 204, 150);
        let waveShift = p.sin(p.frameCount * 0.02 + y * 0.05) * 10;
        p.line(0, y + waveShift, p.width, y - waveShift);
     }
      
      p.noStroke();
      p.fill(255, 255, 255, 120);
     for (const bubble of bubbles) {
       bubble.x += bubble.speed;
       if (bubble.x > p.width + bubble.size) {
         bubble.x = -bubble.size;
       }
       const radius = bubble.size / 2;
       const noiseTime = p.frameCount * 0.006;
       p.beginShape();
       for (let angle = 0; angle < p.TWO_PI; angle += 0.05) {
         const nx = p.cos(angle) * 0.5 + 1;
         const ny = p.sin(angle) * 0.5 + 1;
         const variation = p.map(
           p.noise(nx + bubble.noiseOffset, ny + bubble.noiseOffset, noiseTime),
           0,
           1,
           -6,
           6
         );
         const x = (radius + variation) * p.cos(angle);
         const y = (radius + variation) * p.sin(angle);
         p.vertex(bubble.x + x, bubble.y + y);
       }
       p.endShape(p.CLOSE);
     }

    }

    p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  };

  new p5(s2);
  