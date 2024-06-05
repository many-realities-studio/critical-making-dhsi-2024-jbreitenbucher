function setup() {
  createCanvas(400, 400); // Set canvas size
}

function draw() {
  background(220); // Clear background on each frame
}

function mousePressed() {
  // Get mouse position
  const x = mouseX;
  const y = mouseY;

  // Calculate random number of sides based on mouseX (adjust as needed)
  const numSides = Math.floor(map(mouseX, 0, width, 3, 8)); // Sides between 3 and 8

  // Draw polygon with random sides
  stroke(0); // Set black stroke
  fill(random(255), random(255), random(255)); // Random fill color
  beginShape();
  for (let i = 0; i < numSides; i++) {
    const angle = TWO_PI * i / numSides;
    const radius = 30; // Fixed radius
    const tipX = x + radius * cos(angle);
    const tipY = y + radius * sin(angle);
    vertex(tipX, tipY);
  }
  endShape(CLOSE); // Close the shape for polygon
}
