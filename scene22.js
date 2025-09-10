const s2 = (p) => {

    let glass;
    let sky;
    let angle = 0;
    let toppled = false;
    let spilledDrops = [];

    p.preload = () => {
    sky = loadImage('assets/sky.jpg');
    glass = loadImage('assets/glass.jpg');
    }

    p.setup = () => {
    const c = p.createCanvas(windowWidth,windowHeight);
    c.parent('scene22');
    
    p.imageMode(CENTER);
    }

    p.draw = () => {
        //image(sky, 0,0,windowWidth,windowHeight);
    p.background(255);
    p.push();
    p.translate(width/2, height/2);
    p.rotate(angle);
    p.image(glass, 0, 0, 400,400);
    p.pop();

    if (angle >= HALF_PI) {
        // occasionally create new drops
        if (frameCount % 10 === 0) {
        spilledDrops.push({
            x: width/2 + 60, // position to the "mouth" of the glass
            y: height/2,
            vy: random(2, 5), // random fall speed
            r: random(5, 10)  // radius
        });
        }
    }
    p.noStroke();
    p.fill(0, 150, 255, 180);
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
    

new p5(s2);
