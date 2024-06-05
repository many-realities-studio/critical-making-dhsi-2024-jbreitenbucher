let originalPolygon; // Variable to store the original polygon
let bouncingPolygon; // Variable to store the bouncing polygon

function setup() {
  createCanvas(windowWidth, windowHeight); // Create the canvas based on window size
  originalPolygon = null; // Initialize originalPolygon to null
  bouncingPolygon = null; // Initialize bouncingPolygon to null
}

function draw() {
  background(220); // Set the background color

  // If the originalPolygon exists, draw it
  if (originalPolygon) {
    fill(originalPolygon.fillColor); // Set the fill color of the original polygon
    stroke(0); // Set the stroke color to black
    strokeWeight(1); // Set the stroke weight to 1
    beginShape(); // Begin drawing the shape
    for (let i = 0; i < originalPolygon.sides; i++) { // Loop through each vertex of the polygon
      let angle = map(i, 0, originalPolygon.sides, 0, TWO_PI); // Calculate the angle for each vertex
      let radius = originalPolygon.radius; // Set the radius for the polygon
      let x = originalPolygon.x + radius * cos(angle); // Calculate the x position of the vertex
      let y = originalPolygon.y + radius * sin(angle); // Calculate the y position of the vertex
      vertex(x, y); // Add the vertex to the shape
    }
    endShape(CLOSE); // Close the shape
  }

  // If the bouncingPolygon exists, update its position and draw it
  if (bouncingPolygon) {
    bouncingPolygon.updatePosition(); // Update the position of the bouncing polygon
    fill(bouncingPolygon.fillColor); // Set the fill color of the bouncing polygon
    stroke(0); // Set the stroke color to black
    strokeWeight(1); // Set the stroke weight to 1
    beginShape(); // Begin drawing the shape
    for (let i = 0; i < bouncingPolygon.sides; i++) { // Loop through each vertex of the polygon
      let angle = map(i, 0, bouncingPolygon.sides, 0, TWO_PI); // Calculate the angle for each vertex
      let radius = bouncingPolygon.radius; // Set the radius for the polygon
      let x = bouncingPolygon.x + radius * cos(angle); // Calculate the x position of the vertex
      let y = bouncingPolygon.y + radius * sin(angle); // Calculate the y position of the vertex
      vertex(x, y); // Add the vertex to the shape
    }
    endShape(CLOSE); // Close the shape
  }
}

function mousePressed() {
  // Create a new polygon object with random properties at the mouse click position
  originalPolygon = {
    x: mouseX,
    y: mouseY,
    sides: Math.floor(Math.random() * 10) + 3, // Generate a random number of sides between 3 and 12
    radius: 30, // Set the radius of the polygon
    fillColor: color(Math.random() * 255, Math.random() * 255, Math.random() * 255), // Generate a random fill color
  };

  // Clone the original polygon to create the bouncing polygon
  bouncingPolygon = { ...originalPolygon };
}

// Function to update the position of the bouncing polygon
Polygon.prototype.updatePosition = function () {
  // Move the polygon based on its velocity
  this.x += this.velocityX;
  this.y += this.velocityY;

  // Check for edge collisions and bounce if necessary
  if (this.x - this.radius < 0) {
    this.velocityX *= -1;
    this.x = this.radius;
  } else if (this.x + this.radius > width) {
    this.velocityX *= -1;
    this.x = width - this.radius;
  }

  if (this.y - this.radius < 0) {
    this.velocityY *= -1;
    this.y = this.radius;
  } else if (this.y + this.radius > height) {
    this.velocityY *= -1;
    this.y = height - this.radius;
  }

// Check for