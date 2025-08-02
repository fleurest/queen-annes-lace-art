let clusters = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  smooth();
  strokeWeight(1.2);
  noFill();

  // Rings of clusters
  let ringCount = 4;
  let ringSpacing = 50;
  let angleOffset = random(360);

  for (let r = 1; r <= ringCount; r++) {
    let radius = r * ringSpacing;
    let numClusters = r * 6;

    for (let i = 0; i < numClusters; i++) {
      let angle = (360 / numClusters) * i + angleOffset;
      clusters.push(new FlowerCluster(angle, radius));
    }
  }
}


function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Central red/purple dot
  noStroke();
  fill(140, 10, 20, 100);
  ellipse(0, 0, 6, 6);

  // Moving clusters
  for (let cluster of clusters) {
    cluster.update();
    cluster.display();
  }
}

class FlowerCluster {
  constructor(angle, baseRadius) {
    this.angle = angle;
    this.baseRadius = baseRadius;
    this.offset = random(1000);
    this.flowerHeads = [];

    let rings = int(random(3, 5));
    for (let r = 1; r <= rings; r++) {
      let petals = r * 12;
      let ringRadius = r * 6;
      // All flowers in the same ring share a size that grows with the ring index
      let flowerSize = map(r, 1, rings, 0.8, 1.8);
      for (let i = 0; i < petals; i++) {
        let theta = (360 / petals) * i + random(-1, 1);
        let fx = ringRadius * cos(theta);
        let fy = ringRadius * sin(theta);
        this.flowerHeads.push({ x: fx, y: fy, size: flowerSize });
      }
    }
  }

  update() {
    let t = millis() * 0.0003;

    // growth and wind
    this.radius = this.baseRadius + sin(t + this.offset) * 4;
    this.x = this.radius * cos(this.angle) + noise(this.offset + t) * 4 - 2;
    this.y = this.radius * sin(this.angle) + noise(this.offset + 100 + t) * 4 - 2;

    // scaling for growth
    this.scale = map(sin(t * 0.5 + this.offset), -1, 1, 0.6, 1);
  }

  display() {
    push();

    // Main stem from center
    stroke(80, 160, 100, 150);
    strokeWeight(1);
    line(0, 0, this.x, this.y);

    pop();

    push();
    translate(this.x, this.y);
    scale(this.scale);

    for (let head of this.flowerHeads) {
      // Thin line from cluster center to each mini flower
      stroke(150, 180, 150, 90);
      strokeWeight(0.5);
      line(0, 0, head.x, head.y);

      // Mini flower scaled based on its ring
      push();
      translate(head.x, head.y);
      rotate(frameCount * 0.1 + this.offset);
      stroke(50);
      fill(255);
      ellipse(0, 0, 1.5 * head.size, 1.5 * head.size);
      for (let i = 0; i < 5; i++) {
        let a = i * 72;
        let px = 3 * head.size * cos(a);
        let py = 3 * head.size * sin(a);
        ellipse(px, py, 1.5 * head.size, 1.5 * head.size);
      }
      pop();
    }
    pop();
  }
}


