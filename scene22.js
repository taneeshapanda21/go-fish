const s4 = (p) => {

    let glass;
    let sky;
    let angle = 0;
    let toppled = false;
    let spilledDrops = [];
    let colors = ["#00fff3","#ff3300"]

    p.preload = () => {
    sky = p.loadImage('assets/sky.jpg');
    glass = p.loadImage('assets/glass.jpg');
    }

    p.setup = () => {
    const c = p.createCanvas(windowWidth,windowHeight);
    c.parent('scene22');
    p.imageMode(CENTER);

    }

    p.draw = () => {
        
        p.background(255);
        p.push();
        p.translate(width/2, height/2);
        p.rotate(angle);
        p.image(glass, 0, 0, 400,400);
        p.pop();

        if (angle >= HALF_PI) {
            if (frameCount % 10 === 0) {
            spilledDrops.push({
                x: width/2 + 190, // position to the "mouth" of the glass
                y: height/2,
                vy: random(2, 5), // random fall speed
                r: random(5, 10)  // radius
            });
            }
        }
        p.noStroke();
        if (p.random(1) < 0.9) {
        p.fill(color(colors[0])); // mostly color1
        } else {
        p.fill(color(colors[1])); // rare color2
        }
        for (let d of spilledDrops) {
            p.ellipse(d.x, d.y, d.r);
            d.y += d.vy;
            d.vy += 0.1; // gravity
        }
        spilledDrops = spilledDrops.filter(d => d.y < height + 20);
        }

    p.mousePressed = () => {
        toppled = true;
        if (toppled && angle < HALF_PI) {
            angle += 0.1;
        }
    }
    };
    
new p5(s4);