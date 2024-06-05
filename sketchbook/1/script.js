function setup() {
  createCanvas(400, 400);
  // Draw the shapes only once in setup instead of repeatedly in draw
  draw();
  // No need for loop in draw anymore since shapes are drawn in setup
  noLoop();
}

function draw() {
  background(220);

  // Draw five shapes (polygons) with random properties
  for (let i = 0; i < 5; i++) {
    stroke(random(255), random(255), random(255));
    fill(random(255), random(255), random(255), 100);

    const numSides = int(random(3, 10));
    const radius = random(50, 150);
    const angle = TWO_PI / numSides;

    beginShape();
    for (let j = 0; j < numSides; j++) {
      const theta = angle * j;
      const x = radius * cos(theta) + width / 2;
      const y = radius * sin(theta) + height / 2;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}