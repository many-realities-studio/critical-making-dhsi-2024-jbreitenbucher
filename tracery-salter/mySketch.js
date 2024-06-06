//Tracery example by Allison Parrish
//But we'll also create a box to hold our lines as they move
let particles = [];
let backgroundImage;

function preload() {
	backgroundImage = loadImage('gho.jpg'); // Add the path to your background image here
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50);
}

function draw() {
	// Draw the background image with 50% opacity
	background(50);
	tint(255, 127); // Apply transparency without changing color
	image(backgroundImage, 0, 0, windowWidth, windowHeight);
	noTint(); // Reset tint

	// This moves the particles
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].finished()) {
			// remove this particle
			particles.splice(i, 1);
		}
	}
}

// This draws the word with each mouse click
function mouseClicked() {
	var grammar = tracery.createGrammar(grammarSource); // set up tracery library
	grammar.addModifiers(tracery.baseEngModifiers); // set up English grammar properly (capitals and a/an)
	var output = grammar.flatten("#origin#"); // creates sentence from grammar source
	let p = new Particle(mouseX, mouseY, output);
	particles.push(p);
}

// grammerSource is generated using:
// http://tracery.io/ 
// See the tutorial here: http://www.crystalcodepalace.com/traceryTut.html
var grammarSource = {
	"origin": [
		"#fiveSyllable#\n#sevenSyllable#\n#fiveSyllable#"
	],
	"fiveSyllable": [
		"#adj# #noun# #verb#",
		"#noun# #verb# #prep#",
		"#verb# #prep# #noun#",
		"#adj# #noun# #prep#",
		"#noun# #adj# #prep#",
		"#verb# #adj# #noun#"
	],
	"sevenSyllable": [
		"#noun# #verb# #prep# #adj# #noun#",
		"#adj# #noun# #verb# #prep# #noun#",
		"#verb# #prep# #adj# #noun# #prep#",
		"#adj# #noun# #prep# #verb# #noun#",
		"#noun# #verb# #adj# #noun# #prep#"
	],
	"noun": [
		"owl",
		"tree",
		"night",
		"moon",
		"mouse",
		"feather",
		"wing",
		"forest",
		"shadow",
		"sky",
		"hoot",
		"prey"
	],
	"verb": [
		"glides",
		"swoops",
		"hunts",
		"hoots",
		"seeks",
		"flies",
		"watches",
		"soars",
		"rests",
		"perches"
	],
	"adj": [
		"silent",
		"wise",
		"nocturnal",
		"ancient",
		"soft",
		"swift",
		"dark",
		"mysterious",
		"lonely",
		"quiet"
	],
	"prep": [
		"in",
		"on",
		"under",
		"through",
		"above",
		"with",
		"by",
		"at",
		"over",
		"near"
	]
};

class Particle {
	constructor(x, y, text) {
		// This sets the x value to mouse position
		this.x = x;
		// This keeps the y at mouse position
		this.y = y;
		// This sets the range of x movement - try limiting it to + or -
		this.vx = random(-2, 2);
		// This sets the range of y movement - try limiting it to + or -
		this.vy = random(-2, 2);
		// This sets the text size to be consistent
		this.size = random(18, 24);
		// This sets the current line to the particle
		this.text = text;
	}

	finished() {
		// Change this to 255 if you reverse the fade
		return (this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
	}

	show() {
		noStroke();
		textSize(this.size);
		// Try any web safe font
		textFont("Helvetica");
		// This centers the text on the click
		textAlign(CENTER, CENTER);
		// This sets the fill to a random color
		fill(random(50, 255), random(50, 255), random(50, 255));
		// This positions the text
		text(this.text, this.x, this.y);
	}
}