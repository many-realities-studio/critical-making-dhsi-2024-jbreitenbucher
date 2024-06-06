// Define global variables for the original and duplicated polygons
let originalPolygon = null;
let duplicatePolygon = null;

function setup() {
  // Create a canvas
  createCanvas(600, 600);
}

function draw() {
  // Set background to white
  background(255);

  // If the original polygon exists, display it
  if (originalPolygon) {
    originalPolygon.display();
  }

  // If the duplicate polygon exists, update and display it
  if (duplicatePolygon) {
    duplicatePolygon.update();
    duplicatePolygon.display();
  }
}

function mousePressed() {
  // Generate a random number of sides between 3 and 12
  let sides = floor(random(3, 30));
  // Generate a random color
  let col = color(random(255), random(255), random(255));
  // Create a new polygon at the mouse position with the random sides and color
  originalPolygon = new Polygon(mouseX, mouseY, sides, col);
  // Create the duplicate polygon
  duplicatePolygon = new Polygon(mouseX + 90, mouseY, sides, col);
  // Set the velocity for the duplicate polygon
  duplicatePolygon.setVelocity(random(-2, 2), random(-2, 2));
}

// Polygon class
class Polygon {
  constructor(x, y, sides, col) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.radius = 50; // Set the radius of the polygon
    this.col = col;
    this.velocity = createVector(0, 0);
  }

  // Function to display the polygon
  display() {
    push();
    fill(this.col);
    stroke(0);
    translate(this.x, this.y);
    beginShape();
    // Calculate the angle between each vertex
    let angle = TWO_PI / this.sides;
    for (let i = 0; i < this.sides; i++) {
      let sx = cos(i * angle) * this.radius;
      let sy = sin(i * angle) * this.radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }

  // Function to set the velocity of the polygon
  setVelocity(x, y) {
    this.velocity.set(x, y);
  }

  // Function to update the position of the polygon
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Check for collision with the edges of the canvas
    if (this.x > width - this.radius || this.x < this.radius) {
      this.velocity.x *= -1;
    }
    if (this.y > height - this.radius || this.y < this.radius) {
      this.velocity.y *= -1;
    }

    // Check for proximity to the original polygon and adjust velocity if too close
    if (originalPolygon && dist(this.x, this.y, originalPolygon.x, originalPolygon.y) < this.radius + 10) {
      this.velocity.mult(-1);
    }
  }
}