function setup() {
  createCanvas(400, 400);
  // Draw the shapes only once in setup
  draw();
  // Stop the animation loop (shapes drawn only once)
  noLoop();
}

function draw() {
  background(220);

  let shapes = []; // Array to store generated shapes

  // Loop to create five non-overlapping shapes
  for (let i = 0; i < 5; i++) {
    let validShape = false; // Flag to check if a valid non-overlapping shape is generated

    while (!validShape) { // Keep trying until a valid shape is found
      stroke(random(255), random(255), random(255));
      fill(random(255), random(255), random(255), 100);

      const numSides = int(random(3, 10));
      const radius = random(50, 150);
      const angle = TWO_PI / numSides;

      let doesOverlap = false; // Flag to check for overlap with existing shapes

      // Check for overlap with previously generated shapes
      for (const shape of shapes) {
        if (isOverlapping(shape, radius, numSides, width / 2, height / 2)) {
          doesOverlap = true;
          break; // Exit the inner loop if overlap is found
        }
      }

      if (!doesOverlap) { // If no overlap, create and store the shape
        validShape = true;
        beginShape();
        for (let j = 0; j < numSides; j++) {
          const theta = angle * j;
          const x = radius * cos(theta) + width / 2;
          const y = radius * sin(theta) + height / 2;
          vertex(x, y);
        }
        endShape(CLOSE);
        shapes.push({ numSides, radius, x: width / 2, y: height / 2 }); // Store shape data
      }
    }
  }
}

// Function to check if a new shape overlaps with existing ones (explaination in comments)
function isOverlapping(existingShape, newRadius, newNumSides, newX, newY) {
  // Calculate minimum distance between shapes to avoid overlap
  const minDistance = existingShape.radius + newRadius;

  // Calculate center-to-center distance between shapes
  const distanceX = existingShape.x - newX;
  const distanceY = existingShape.y - newY;
  const centerDistance = sqrt(distanceX * distanceX + distanceY * distanceY);

  // Check if center-to-center distance is less than minimum distance to avoid overlap
  return centerDistance < minDistance;
}
