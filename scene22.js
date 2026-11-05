const s4 = (p) => {
    // Glass
    let glass;
    let sky;
    let angle = 0;
    let toppled = false;
    let spilledDrops = [];
    let colors = ["#8dacdb","#0a0e16"]
    let scene;

    p.preload = () => {
    sky = p.loadImage('assets/sky.jpg');
    glass = p.loadImage('assets/glass.jpg');
    }

    p.setup = () => {
    const c = p.createCanvas(p.windowWidth, p.windowHeight);
    c.parent('scene22');
    scene = document.getElementById('scene22').closest('.scene');
    p.imageMode(p.CENTER);

    }

    p.draw = () => {

        p.background(255);
        p.push();
        if (toppled && angle < p.HALF_PI) {
            angle = Math.min(angle + 0.02, p.HALF_PI);
        }

        p.translate(p.width / 2, p.height / 2);
        p.rotate(angle);
        p.image(glass, 0, 0, 400,400);
        p.pop();

        if (angle >= p.HALF_PI) {
            if (p.frameCount % 10 === 0) {
            spilledDrops.push({
                x: p.width / 2 + 190,
                y: p.height / 2,
                vx: p.random(2, 5),
                vy: p.random(-0.5, 0.5),
                r: p.random(5, 10)
            });
            }
        }
        p.noStroke();
        if (p.random(1) < 0.9) {
        p.fill(p.color(colors[0]));
        } else {
        p.fill(p.color(colors[1]));
        }
        for (let d of spilledDrops) {
            p.ellipse(d.x, d.y, d.r);
            d.x += d.vx;
            d.y += d.vy;
        }
        spilledDrops = spilledDrops.filter(d => d.x < p.width + 20);
        }

    p.mousePressed = () => {
        if (scene.classList.contains('is-active')) {
            toppled = true;
        }
    }
    };

new p5(s4);