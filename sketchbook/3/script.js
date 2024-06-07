  function setupP5(p) {
    p.setup = function () {
      let canvas = p.createCanvas(400, 400);
      canvas.parent('p5-canvas-hall');
    }

    function draw() {
      p.background(30);
      drawCandle();
    }

    function drawCandle() {
      // Candle properties
      let candleX = p.width / 2;
      let candleY = p.height * 3 / 4;
      let candleWidth = 40;
      let candleHeight = 100;

      // Draw candle body
      p.noStroke();
      p.fill(200, 150, 100);
      p.rect(candleX - candleWidth / 2, candleY - candleHeight, candleWidth, candleHeight);

      // Draw wick
      p.fill(0);
      p.rect(candleX - 2, candleY - candleHeight - 10, 4, 10);

      // Draw flame
      let flameX = candleX + p.random(-2, 2);
      let flameY = candleY - candleHeight - 20 + p.random(-2, 2);
      let flameSize = 30 + p.random(-5, 5);

      p.noStroke();
      p.fill(255, 140, 0, 150);
      p.ellipse(flameX, flameY, flameSize, flameSize * 2);

      p.fill(255, 200, 0, 200);
      p.ellipse(flameX, flameY, flameSize / 2, flameSize);
    }
    return;
  }
  new p5(setupP5);