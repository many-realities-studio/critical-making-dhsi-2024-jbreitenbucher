(function() {
    // Define Tracery grammar
    var grammar = {
    "origin": ["You #action# #location# as it took your head from your shoulders."],
    "action": ["didn't see", "caught a glimpse"],
    "location": ["the blade", "the axe"]
	}

    function generateStory() {
        var traceryGrammar = tracery.createGrammar(grammar);
        var story = traceryGrammar.flatten("#origin#");
        return story;
    }

    document.getElementById('story').innerText = generateStory();

    function setupP5() {
        let angle = 0;
        let angleSpeed = 0.05;

        function setup() {
            let canvas = createCanvas(400, 400);
            canvas.parent('p5-canvas');
            angleMode(RADIANS);
        }

        function draw() {
            background(30);
            drawAxe();
        }

        function drawAxe() {
            // Center point for swinging
            let pivotX = width / 2;
            let pivotY = height / 4;

            // Calculate axe position based on angle
            let axeLength = 200;
            let axeX = pivotX + axeLength * sin(angle);
            let axeY = pivotY + axeLength * cos(angle);

            // Update angle for swinging motion
            angle += angleSpeed;

            // Draw axe handle
            stroke(139, 69, 19); // brown color for handle
            strokeWeight(10);
            line(pivotX, pivotY, axeX, axeY);

            // Draw axe blade
            noStroke();
            fill(150); // gray color for blade
            push();
            translate(axeX, axeY);
            rotate(angle + PI / 2);
            rect(-20, 0, 40, 60);
            pop();
        }

        return { setup, draw };
    }

    // Wait for both libraries to load before running the setupP5 function
    function checkLibrariesLoaded() {
        if (typeof tracery !== 'undefined' && typeof p5 !== 'undefined') {
            new p5(setupP5);
        } else {
            setTimeout(checkLibrariesLoaded, 100);
        }
    }

    checkLibrariesLoaded();
})();