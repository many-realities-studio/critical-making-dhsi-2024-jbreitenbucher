function setup() {
  createCanvas(600, 600);
  // Draw the shapes only once in setup
  draw();
  // Stop the animation loop (shapes drawn only once)
  noLoop();
}

function draw() {
  background(220);

  let shapes = []; // Array to store generated shapes

  // Loop to create five non-overlapping shapes with different centers
  for (let i = 0; i < 5; i++) {
    let attempts = 0; // Counter to limit attempts for each shape
    let validShape = false; // Flag to check if a valid non-overlapping shape is generated

    while (!validShape && attempts < 100) { // Loop with maximum attempts to prevent infinite loop
      stroke(random(255), random(255), random(255)); // Pick a random color for the outline
      fill(random(255), random(255), random(255), 100); // Pick a random color with transparency for fill

      const maxSize = min(width, height) * 0.6; // Maximum size of the shape (10% of canvas size)
      const numSides = int(random(3, 10)); // Choose how many sides the shape will have (between 3 and 9)
      const radius = random(maxSize / 2); // Set the size of the shape (limited by maxSize)
      const angle = TWO_PI / numSides; // Calculate an angle based on the number of sides

      let doesOverlap = false; // Flag to check for overlap with existing shapes
      let fitsWithinCanvas = true; // Flag to check if shape fits within canvas
      let centerValid = true; // Flag to check if center avoids existing shapes

      // Generate random center within a reasonable area (not too close to edges)
      const minCenterDistance = radius * 3 + 20; // Minimum distance between center and edges/existing shapes
      let centerX = random(minCenterDistance, width - minCenterDistance);
      let centerY = random(minCenterDistance, height - minCenterDistance);

      // Check if center overlaps existing shapes
      for (const existingShape of shapes) {
        const distanceX = existingShape.x - centerX;
        const distanceY = existingShape.y - centerY;
        const centerDistance = sqrt(distanceX * distanceX + distanceY * distanceY);
        if (centerDistance < existingShape.radius + radius + 20) { // Buffer for overlap
          centerValid = false;
          break;
        }
      }

      // Continue checking only if shape doesn't overlap, fits canvas, and has valid center
      if (!doesOverlap && fitsWithinCanvas && centerValid) {
        validShape = true;
        beginShape();
        for (let j = 0; j < numSides; j++) {
          const theta = angle * j;
          const x = radius * cos(theta) + centerX;
          const y = radius * sin(theta) + centerY;
          vertex(x, y); // Add a corner (vertex) to the shape
        }
        endShape(CLOSE);
        shapes.push({ numSides, radius, x: centerX, y: centerY }); // Store shape data
      } else {
        attempts++; // Increase attempt counter if issues are found
      }
    }

    // Handle case where no valid shape is found after attempts
    if (!validShape) {
      console.warn(`Failed to create non-overlapping shape after ${attempts} attempts.`);
    }
  }
}

// Function to check if a new shape overlaps with existing ones (explaination in comments)
function isOverlapping(existingShape, newRadius, newNumSides, newX, newY) {
  // Calculate minimum distance to avoid overlap with a buffer of 20 pixels
  const minDistance = existingShape.radius + newRadius + 20;

  // Calculate center-to-center distance between shapes
  const distanceX = existingShape.x - newX;
  const distanceY = existingShape.y - newY;
  const centerDistance = sqrt(distanceX * distanceX + distanceY * distanceY);

  // Check if center-to-center distance is less than minimum distance to avoid overlap
  return centerDistance < minDistance;
}
