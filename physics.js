var physics = {};

physics.AABB = function(w, h, x, y) {
  this.min = [x, y];
  this.max = [x + w, y + h];
  return this;
};

physics.AABBtest = function(a, b) {
  if (a.max[0] < b.min[0] || a.min[0] > b.max[0]) {
    return false;
  }
  if (a.max[1] < b.min[1] || a.min[1] > b.max[1]) {
    return false;
  }
  return true;
};