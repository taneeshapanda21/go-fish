
let sound; 
let fft; let rows = 5; let waveMaxHeight = 150; let baseT = 0; let t=0;
let night = false;
let xs = []; let ys = []; let vxs = []; let alphas = [];
let work = ["Go Fish","Try again","Go","Won't you go?"]; let word = ["...","there are none","will i sea you","are you shore", "nothing returns"];
let currentWork = "Go Fish"; let currentWord = "";
let prevPressed = false;

let scrollPos = 0;


function preload() {
  sound = loadSound("assets/cler.mp3");
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent('sketch');
  fft = new p5.FFT();

  // ADD: volume slider hookup
const vol = document.getElementById('vol');
const volVal = document.getElementById('volVal');
sound.setVolume(parseFloat(vol.value));
volVal.textContent = parseFloat(vol.value).toFixed(2);

vol.addEventListener('input', () => {
const v = parseFloat(vol.value);
sound.setVolume(v);
volVal.textContent = v.toFixed(2);
});

// ADD: play/stop button
document.getElementById('toggle-sound').addEventListener('click', () => {
if (!sound.isPlaying()) {
sound.play();
sound.setLoop(true);
} else {
sound.stop();
}
});

window.addEventListener('scroll', () => {
    scrollPos = window.scrollY;
  });

/*document.getElementById('next-scene').addEventListener('click', () => {
  window.location.href = 'scene2.html';
});

const prevBtn = document.getElementById('prev-scene');
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}*/

}

function draw() {
  if (night) {
    background(25, 76, 102);
  } else {
    background(130, 158, 200);
  }

  strokeWeight(20);
  textSize(40);
  fill(25, 76, 102)
  text(currentWork,width/4,height/5);
  
  fill(130, 158, 200)
  text(currentWord,width/1.4,height/1.2);

  // clouds
   if (frameCount % 20 === 0) {
    xs.push(random(0, width / 2));
    ys.push(random(0, 500));
    vxs.push(random(2, 5));
    alphas.push(200);
  }
  for (let i = xs.length - 1; i >= 0; i--) {
    vxs[i] -= 0.01;
    xs[i] += vxs[i];
    alphas[i] -= 1;
    noStroke();
    fill(209, 215, 227, alphas[i]);
    ellipse(xs[i], ys[i], 100, 40);
    ellipse(xs[i] + 10, ys[i] + 10, 100, 40);
    ellipse(xs[i] - 20, ys[i] + 10, 100, 40);
      if (alphas[i] <= 0) {
        xs.splice(i, 1);
        ys.splice(i, 1);
        vxs.splice(i, 1);
        alphas.splice(i, 1);}}


  // waves
  noStroke();
  let spectrum = fft.analyze(); 
  let treble = fft.getEnergy("treble");
  let trebleSize = map(treble, 0, 255, 50, 400);
  for (let n = rows; n >= 0; n--) {
    let baseY = height - n * waveMaxHeight / 3;
    let t = baseT + n * 100;
    let startX = 0;
    push();
      fill(110, 219, 204, 50); 
      noStroke();
      beginShape();
        vertex(startX, baseY);
        for (let x = startX; x <= width; x += 10) {
          let y = baseY - map(noise(t), 0, 1, 10, waveMaxHeight);
          vertex(x, y);
          t += 0.01;
        }
        vertex(width, baseY);
        vertex(width, height);
        vertex(0, height);
      endShape();
    pop();
  }
  baseT += 0.008 * (trebleSize / 25);
  
  // moon
  fill(237, 251, 255,200);
  translate(width / 2, height / 2);
  beginShape(); 
  for (let angle = 0; angle < TWO_PI; angle += 0.05) {
    let r = 100;
    let nx = cos(angle) * 0.5 + 1;
    let ny = sin(angle) * 0.5 + 1;
    let variation = map(noise(nx + t, ny + t), 0, 1, -10, 10);
    let x = (r + variation) * cos(angle);
    let y = (r + variation) * sin(angle);
    vertex(x, y);}
  endShape(CLOSE);
  t += 0.01;

if (mouseIsPressed && !prevPressed) {
    night = !night; 
    currentWork = random(work);
    currentWord = random(word);

  }
  prevPressed = mouseIsPressed; 
  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  }