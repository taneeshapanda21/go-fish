const s2 = (p) => {
  
    let spacing = 15; let ray; let fish; let jelly; let buffer;
    
    p.preload = function() {
      ray=loadImage('assets/ray.jpg');
      fish=loadImage('assets/fish.jpg');
      jelly=loadImage('assets/jelly.jpg');
    }
    
    p.setup = () => {
      const c = p.createCanvas(windowWidth,windowHeight);
      c.parent('sketch2');
      
    };

    p.draw = () => {
      p.background(110, 219, 204);
      buffer = p.createGraphics(350,350);
      buffer.background(0, 0);
      buffer.fill(255);
      buffer.noStroke();
      buffer.rect(0, 0, 350,350, 100);
      
      ray.mask(buffer);
      fish.mask(buffer);
      jelly.mask(buffer);

      p.image(ray,width/6,height/4, width/6,width/6)
      p.image(fish,width/2.4,height/4, width/6,width/6)
      p.image(jelly,width/1.5,height/4, width/6,width/6)

      for (let y = height / 2; y < height; y += spacing) {
        p.strokeWeight(2)
        p.stroke(100, 180, 200, 150);
        let waveShift = p.sin(frameCount * 0.02 + y * 0.05) * 10;
        p.line(0, y + waveShift, width, y - waveShift);
      }
      
      //vertical
      for (let x = 0; x < width; x += spacing * 3) {
        p.strokeWeight(100);
        p.stroke(200, 240, 255, 50);
        p.line(x, 0, x, height);
      }

      //bubble
      for (let i = 0; i < 10; i++) {
        let bx = (i * 80 + frameCount * 0.5) % width;
        let by = height - ((frameCount * 0.5 + i * 50) % height);
        p.fill(255, 255, 255, 120);
        p.circle(bx, by, 15);
      }
    }

    p.windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    }
  };

  new p5(s2);
  