// Global variables to store the polyhedra
let originalPolyhedron, duplicatePolyhedron;

function setup() {
  createCanvas(600, 600, WEBGL); // Create a 3D canvas of size 600x600 pixels
}

function draw() {
  background(255); // Set the background color to white
  orbitControl(); // Enable mouse control for 3D view

  if (originalPolyhedron) { // If the original polyhedron exists
    originalPolyhedron.update(); // Update its rotation
    originalPolyhedron.display(); // Display the original polyhedron
  }
  if (duplicatePolyhedron) { // If the duplicate polyhedron exists
    duplicatePolyhedron.update(); // Update its position and rotation
    duplicatePolyhedron.display(); // Display it
  }
}

function mousePressed() {
  let faces = floor(random(4, 22)), // Generate a random number of faces for the polyhedron (between 4 and 21)
    col = color(random(255), random(255), random(255)); // Generate a random color for the polyhedron
  originalPolyhedron = new Polyhedron(mouseX - width / 2, mouseY - height / 2, faces, col); // Create the original polyhedron at the mouse position
  duplicatePolyhedron = new Polyhedron(mouseX - width / 2 + 90, mouseY - height / 2, faces, col); // Create a duplicate polyhedron slightly offset from the original
  duplicatePolyhedron.setVelocity(random(-2, 2), random(-2, 2), random(-2, 2)); // Set a random velocity for the duplicate polyhedron
}

// Class to define a Polyhedron
class Polyhedron {
  constructor(x, y, faces, col) {
    Object.assign(this, { x, y, faces, col, size: random(50, 100), velocity: createVector(0, 0, 0), rotation: createVector(random(-0.02, 0.02), random(-0.02, 0.02), random(-0.02, 0.02)), angle: createVector(0, 0, 0) }); // Initialize the polyhedron's properties
    this.vertices = []; // Array to store the vertices of the polyhedron

    // Generate vertices based on the number of faces
    for (let i = 0; i < faces; i++) {
      let theta = random(TWO_PI), phi = random(PI);
      this.vertices.push(createVector(
        this.size * sin(phi) * cos(theta),
        this.size * sin(phi) * sin(theta),
        this.size * cos(phi)
      ));
    }
  }

  // Method to display the polyhedron
  display() {
    push();
    fill(this.col); // Set the fill color of the polyhedron
    stroke(0); // Set the stroke color (outline) of the polyhedron
    translate(this.x, this.y, 0); // Move the origin to the polyhedron's center
    rotateX(this.angle.x); // Apply rotation around x-axis
    rotateY(this.angle.y); // Apply rotation around y-axis
    rotateZ(this.angle.z); // Apply rotation around z-axis
    beginShape(TRIANGLES); // Begin defining the shape as triangles
    for (let v of this.vertices) {
      vertex(v.x, v.y, v.z); // Define each vertex of the polyhedron
    }
    endShape(CLOSE); // Close the shape
    pop();
  }

  // Method to set the velocity of the polyhedron
  setVelocity(x, y, z) {
    this.velocity.set(x, y, z); // Set the velocity vector
  }

  // Method to update the position and rotation of the polyhedron
  update() {
    this.x += this.velocity.x; // Update the x-coordinate by the velocity
    this.y += this.velocity.y; // Update the y-coordinate by the velocity
    this.z += this.velocity.z; // Update the z-coordinate by the velocity
    this.angle.add(this.rotation); // Update the rotation angles
    if (this.x > width / 2 - this.size || this.x < -width / 2 + this.size) this.velocity.x *= -1; // Reverse x-velocity if it hits canvas edge
    if (this.y > height / 2 - this.size || this.y < -height / 2 + this.size) this.velocity.y *= -1; // Reverse y-velocity if it hits canvas edge
    if (this.z > 300 - this.size || this.z < -300 + this.size) this.velocity.z *= -1; // Reverse z-velocity if it hits depth boundaries
    if (originalPolyhedron && dist(this.x, this.y, this.z, originalPolyhedron.x, originalPolyhedron.y, originalPolyhedron.z) < this.size + 10) {
      this.velocity.mult(-1); // Reverse the velocity if too close to the original polyhedron
    }
  }
}