var physics = {};

physics.vector = function(x, y) {
  this.x = x;
  this.y = y;
  this.mag = function() {
    return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 1 / 2);
  };
  this.dir = function() {
    return Math.atan((this.y) / (this.x));
  };
  return this;
};

physics.addVect = function(a, b) {
  return new physics.vector(a.x + b.x, a.y + b.y);
};

physics.subVect = function(a, b) {
  return new physics.vector(a.x - b.x, a.y - b.y);
};

physics.dotProd = function(a, b) {
  return a.mag() * b.mag() * Math.cos(Math.max(a.dir(), b.dir()) - Math.min(a.dir(), b.dir()));
};

physics.AABB = function(w, h, x, y) {
  this.min = [x, y];
  this.max = [x + w, y + h];
  return this;
};

physics.AABBTest = function(a, b) {
  if (a.max[0] < b.min[0] || a.min[0] > b.max[0]) {
    return false;
  }
  if (a.max[1] < b.min[1] || a.min[1] > b.max[1]) {
    return false;
  }
  return true;
};

physics.circle = function(x, y, r) {
  this.center = [x, y];
  this.radius = r;
  this.velocity = new physics.vector(x, x, y, y);
  return this;
};

physics.circleTest = function(a, b) {
  var r = a.radius + b.radius;
  r *= r;
  return r < Math.pow(a.x + b.x, 2) + Math.pow(a.y + b.y, 2);
};

physics.resolve = function(a, b) {
  var normal = new physics.vector();
  
  var rv = physics.subVect(a.velocity, b.velocity);
  
  var velAlongNormal = physics.dotProd(rv, normal);
  
  //if the two objects are moving away from each other already, do nothing
  if(velAlongNormal > 0) {
    return;
  }
  // Calculate restitution
  float e = min( A.restitution, B.restitution)
 
  // Calculate impulse scalar
  float j = -(1 + e) * velAlongNormal
  j /= 1 / A.mass + 1 / B.mass
 
  // Apply impulse
  Vec2 impulse = j * normal
  A.velocity -= 1 / A.mass * impulse
  B.velocity += 1 / B.mass * impulse
};