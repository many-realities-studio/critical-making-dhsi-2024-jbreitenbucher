function setup() {
  // Create a drawing area (canvas) 400 pixels wide and 400 pixels tall
  createCanvas(400, 400);
}

function draw() {
  // Set the background color to a light gray
  background(220);

  // Draw five shapes (polygons) with random properties
  for (let i = 0; i < 5; i++) {
    // Pick a random color for the outline of the shape
    stroke(random(255), random(255), random(255));
    // Pick a random color to fill the inside of the shape (with some transparency)
    fill(random(255), random(255), random(255), 100);

    // Choose how many sides the shape will have (between 3 and 9)
    const numSides = int(random(3, 10));

    // Set the size of the shape
    const radius = random(50, 150);

    // Calculate an angle based on the number of sides
    const angle = TWO_PI / numSides;

    // Start drawing the shape
    beginShape();

    // Loop to draw each side of the shape
    for (let j = 0; j < numSides; j++) {
      // Calculate the angle for this side
      const theta = angle * j;

      // Calculate the X position for this corner of the shape
      const x = radius * cos(theta) + width / 2;

      // Calculate the Y position for this corner of the shape
      const y = radius * sin(theta) + height / 2;

      // Add a corner (vertex) to the shape at the calculated position
      vertex(x, y);
    }

    // Connect the last corner back to the first corner to complete the shape
    endShape(CLOSE);
  }
}