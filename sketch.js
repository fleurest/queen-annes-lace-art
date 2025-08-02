let clusters = [];
let ringCount = 4;
let ringSpacing = 60;
let maxRadius;

function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    smooth();
    strokeWeight(1.2);
    noFill();

    maxRadius = ringCount * ringSpacing;
    let angleOffset = random(360);

    for (let r = 1; r <= ringCount; r++) {
        let radius = r * ringSpacing;
        let numClusters = r * 7;

        for (let i = 0; i < numClusters; i++) {
            let angle = (360 / numClusters) * i + angleOffset;
            clusters.push(new FlowerCluster(angle, radius));
        }
    }
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    // Central red floret
    noStroke();
    fill(140, 10, 20, 100);
    ellipse(0, 0, 6, 6);

    for (let cluster of clusters) {
        cluster.update();
        cluster.display();
    }
}

class FlowerCluster {
    constructor(angle, radius) {
        this.baseAngle = angle;
        this.baseRadius = radius;
        this.t = random(1000);
    }

    update() {
        this.t += 0.01;
        this.angle = this.baseAngle + sin(this.t * 0.5) * 3;
        this.radius = this.baseRadius + sin(this.t * 0.8) * 2;
    }

    display() {
        push();
        let x = cos(this.angle) * this.radius;
        let y = sin(this.angle) * this.radius;
        translate(x, y);
        this.drawUmbel(6, 7, 4);
        pop();
    }

    drawUmbel(layers, baseFlorets, radiusStep) {
        for (let layer = 1; layer <= layers; layer++) {
            let florets = baseFlorets + layer * 2;
            let r = layer * radiusStep;
            for (let i = 0; i < florets; i++) {
                let a = (360 / florets) * i + sin(this.t * 1.2 + i) * 1;
                let fx = cos(a) * r + random(-0.5, 0.5);
                let fy = sin(a) * r + random(-0.5, 0.5);
                stroke(100, 100, 100, 150);
                strokeWeight(0.6);
                fill(255, 240);
                ellipse(fx, fy, 5.5, 5.5);
            }
        }
    }
}