// Global variables to store the polygons
let originalPolygon, duplicatePolygon;

function setup() {
  createCanvas(600, 600); // Create a canvas of size 600x600 pixels
}

function draw() {
  background(255); // Set the background color to white
  originalPolygon?.display(); // Display the original polygon if it exists
  if (duplicatePolygon) { // If the duplicate polygon exists
    duplicatePolygon.update(); // Update its position
    duplicatePolygon.display(); // Display it
  }
}

function mousePressed() {
  let sides = floor(random(3, 30)), // Generate a random number of sides for the polygon (between 3 and 29)
    col = color(random(255), random(255), random(255)); // Generate a random color for the polygon
  originalPolygon = new Polygon(mouseX, mouseY, sides, col); // Create the original polygon at the mouse position
  duplicatePolygon = new Polygon(mouseX + 90, mouseY, sides, col); // Create a duplicate polygon slightly offset from the original
  duplicatePolygon.setVelocity(random(-2, 2), random(-2, 2)); // Set a random velocity for the duplicate polygon
}

// Class to define a Polygon
class Polygon {
  constructor(x, y, sides, col) {
    // Initialize the polygon's properties
    Object.assign(this, { x, y, sides, col, radius: random(10, 50), velocity: createVector(0, 0) });
  }

  // Method to display the polygon
  display() {
    push();
    fill(this.col); // Set the fill color of the polygon
    stroke(0); // Set the stroke color (outline) of the polygon
    translate(this.x, this.y); // Move the origin to the polygon's center
    beginShape(); // Start defining the shape
    for (let i = 0, angle = TWO_PI / this.sides; i < this.sides; i++) { // Calculate the angle between each vertex
      vertex(cos(i * angle) * this.radius, sin(i * angle) * this.radius); // Define each vertex of the polygon
    }
    endShape(CLOSE); // Close the shape
    pop();
  }

  // Method to set the velocity of the polygon
  setVelocity(x, y) {
    this.velocity.set(x, y); // Set the velocity vector
  }

  // Method to update the position of the polygon
  update() {
    this.x += this.velocity.x; // Update the x-coordinate by the velocity
    this.y += this.velocity.y; // Update the y-coordinate by the velocity
    if (this.x > width - this.radius || this.x < this.radius) this.velocity.x *= -1; // Reverse x-velocity if it hits canvas edge
    if (this.y > height - this.radius || this.y < this.radius) this.velocity.y *= -1; // Reverse y-velocity if it hits canvas edge
    if (originalPolygon && dist(this.x, this.y, originalPolygon.x, originalPolygon.y) < this.radius + 10) { // If too close to original
      this.velocity.mult(-1); // Reverse the velocity
    }
  }
}