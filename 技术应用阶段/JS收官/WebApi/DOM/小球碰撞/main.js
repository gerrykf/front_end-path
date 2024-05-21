var ball = document.querySelector(".ball");
var disX = 5;
var disY = 5;

var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
var ew = ball.offsetWidth;
var eh = ball.offsetHeight;
var maxW = w - ew;
var maxH = h - eh;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getColor() {
  return (
    "rgb(" +
    parseInt(random(0, 255)) +
    "," +
    parseInt(random(0, 255)) +
    "," +
    parseInt(random(0, 255)) +
    ")"
  );
}

setInterval(function () {
  var rect = ball.getBoundingClientRect();
  var ex = rect.left;
  var ey = rect.top;

  var left = ex + disX;
  var top = ey + disY;

  if (left > maxW) {
    left = maxW;
    disX = -disX;
    ball.style.backgroundColor = getColor();
  }
  if (left < 0) {
    left = 0;
    disX = -disX;
    ball.style.backgroundColor = getColor();
  }
  if (top > maxH) {
    top = maxH;
    disY = -disY;
    ball.style.backgroundColor = getColor();
  }
  if (top < 0) {
    top = 0;
    disY = -disY;
    ball.style.backgroundColor = getColor();
  }

  ball.style.left = left + "px";
  ball.style.top = top + "px";
}, 16);
