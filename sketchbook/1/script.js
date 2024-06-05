function setup() {
  createCanvas(1000, 1000);
  // Initially set shapes to empty array
  shapes = [];
}

function draw() {
  background(220);
}

function mousePressed() {
  // Check if mouse is within canvas boundaries
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    shapes = []; // Clear existing shapes on click

    // Generate five non-overlapping shapes centered around the mouse position
    for (let i = 0; i < 5; i++) {
      let attempts = 0; // Counter to limit attempts for each shape
      let validShape = false; // Flag to check if a valid non-overlapping shape is generated

      while (!validShape && attempts < 100) { // Loop with maximum attempts to prevent infinite loop
        stroke(random(255), random(255), random(255)); // Pick a random color for the outline
        fill(random(255), random(255), random(255), 100); // Pick a random color with transparency for fill

        const maxSize = min(width, height) * 0.1; // Maximum size of the shape (10% of canvas size)
        const numSides = int(random(3, 10)); // Choose how many sides the shape will have (between 3 and 9)
        const radius = random(maxSize / 2); // Set the size of the shape (limited by maxSize)
        const angle = TWO_PI / numSides; // Calculate an angle based on the number of sides

        let doesOverlap = false; // Flag to check for overlap with existing shapes

        // Generate random offset from mouse position within a reasonable range
        const maxOffset = radius * 2; // Maximum offset from mouse position
        const offsetX = random(-maxOffset, maxOffset);
        const offsetY = random(-maxOffset, maxOffset);
        const centerX = mouseX + offsetX;
        const centerY = mouseY + offsetY;

        // Check for overlap with previously generated shapes
        for (const existingShape of shapes) {
          if (isOverlapping(existingShape, radius, numSides, centerX, centerY)) {
            doesOverlap = true;
            break;
          }
        }

        // Continue checking only if shape doesn't overlap and fits within canvas
        if (!doesOverlap) {
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
          attempts++; // Increase attempt counter if overlap is found
        }
      }

      // Handle case where no valid shape is found after attempts
      if (!validShape) {
        console.warn(`Failed to create non-overlapping shape after ${attempts} attempts.`);
      }
    }
  }
}

// Function to check if a new shape overlaps with existing ones (same as before)
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