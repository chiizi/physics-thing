var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild("canvas");

var time = 0;

var control = function() {
  
};

var render = function() {
  
};

var main = function() {
  control();
  render();
  
  time += 1 / 60;
  requestAnimationFrame(main);
};