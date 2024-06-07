function setup() {
  createCanvas(400, 400);
    }

function draw() {
  background(30);
  drawCandle();
}

function drawCandle() {
  // Candle properties
  let candleX = width / 2;
  let candleY = height * 3 / 4;
  let candleWidth = 40;
  let candleHeight = 100;

  // Draw candle body
  noStroke();
  fill(200, 150, 100);
  rect(candleX - candleWidth / 2, candleY - candleHeight, candleWidth, candleHeight);

  // Draw wick
  fill(0);
  rect(candleX - 2, candleY - candleHeight - 10, 4, 10);

  // Draw flame
  let flameX = candleX + random(-2, 2);
  let flameY = candleY - candleHeight - 20 + random(-2, 2);
  let flameSize = 30 + random(-5, 5);

  noStroke();
  fill(255, 140, 0, 150);
  ellipse(flameX, flameY, flameSize, flameSize * 2);

  fill(255, 200, 0, 200);
  ellipse(flameX, flameY, flameSize / 2, flameSize);
}