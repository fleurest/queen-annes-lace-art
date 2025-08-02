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

    for (let cluster of clusters) {
        cluster.update();
    }

    // stems first
    for (let cluster of clusters) {
        cluster.drawStem();
    }

    // flower heads on top
    for (let cluster of clusters) {
        cluster.display();
    }
    // Central red floret
    noStroke();
    fill(140, 10, 20, 100);
    ellipse(0, 0, 6, 6);
}

class FlowerCluster {
    constructor(angle, radius) {
        this.baseAngle = angle;
        this.baseRadius = radius;
        this.t = random(1000);
        // Different motion to make movements different per stem
        this.angleNoise = random(1000);
        this.radiusNoise = random(1000);
    }

    update() {
        // Slow, smooth movement using noise and a smaller time step
        this.t += 0.003;
        this.angle = this.baseAngle + (noise(this.t + this.angleNoise) - 0.5) * 10;
        this.radius = this.baseRadius + (noise(this.t + this.radiusNoise) - 0.5) * 6;
        this.x = cos(this.angle) * this.radius;
        this.y = sin(this.angle) * this.radius;
    }
    drawStem() {

        stroke(60, 120, 60, 180);
        strokeWeight(1.2);
        line(0, 0, this.x, this.y);
    }


    display() {
        push();
        let x = cos(this.angle) * this.radius;
        let y = sin(this.angle) * this.radius;
        // Draw stem so the flower and stem sway together
        stroke(100, 100, 100, 100);
        line(0, 0, x, y);
        translate(this.x, this.y);
        this.drawUmbel(5, 6, 5);
        pop();
    }

    drawUmbel(rings, baseFlorets, radiusStep) {
        // Central cluster of tiny florets
        stroke(100, 100, 100, 150);
        strokeWeight(0.6);
        fill(255, 240);
        let centerCount = 6;
        for (let i = 0; i < centerCount; i++) {
            let ca = (360 / centerCount) * i;
            let cr = random(1, 3);
            ellipse(cos(ca) * cr, sin(ca) * cr, 2.5, 2.5);
        }

        // Outer rings of florets
        for (let ring = 1; ring <= rings; ring++) {
            let florets = baseFlorets + ring * 3;
            let r = ring * radiusStep;
            for (let i = 0; i < florets; i++) {
                let a = (360 / florets) * i + sin(this.t * 0.4 + i) * 0.5;
                let fx = cos(a) * r + (noise(this.t * 0.5 + i) - 0.5) * 0.4;
                let fy = sin(a) * r + (noise(this.t * 0.5 + i + 100) - 0.5) * 0.4;
                push();
                translate(fx, fy);
                if (ring === rings) {
                    this.drawMiniUmbel(5, 2.5 + ring * 0.4);
                } else {
                    ellipse(0, 0, 3 + ring * 0.5, 3 + ring * 0.5);
                }
                pop();
            }
        }
    }
    drawMiniUmbel(count, size) {
        // Small umbel used on the outer ring
        ellipse(0, 0, size, size);
        for (let i = 0; i < count; i++) {
            let a = (360 / count) * i;
            let x = cos(a) * size;
            let y = sin(a) * size;
            ellipse(x, y, size * 0.7, size * 0.7);
        }
    }
}