class body {
  constructor(x, y) {
    this.vec = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.speed = 5;
    this.vel.mult(this.speed);
    this.perception = 30;
    this.alignStrength = 0.02;
    this.sepStrength = 0.01;
    this.cohesionStrength = 0.02;
  }
  
  update() {
    
    
    this.wrap();
    this.vec.add(this.vel); 
  }
  wrap() {
    if(this.vec.x > width) this.vec.x = 0; 
    if(this.vec.x < 0) this.vec.x = width;
    if(this.vec.y > height) this.vec.y = 0;
    if(this.vec.y < 0) this.vec.y = height;
  }
  separation(arr, index) {
    var steer = createVector();
    var check = createVector();

    for(let i = 0; i < arr.length ; i++) {
      if(index !== i) {
        check = p5.Vector.sub(this.vec, arr[i].vec);
        if(check.mag() < 20) {
          steer = check;
          steer.limit(this.sepStrength);
          this.vel.add(steer);
          this.vel.limit(this.speed);
        }
      }
    }
  }

  flocking_simulation(arr, index) {
    //alignment
    let count1 = 0;
    var avgvel = createVector();
    //cohesion
    var avgPos = createVector();
    var redArrow = createVector();
    let count2 = 0;
    for(let i = 0; i < arr.length; i++) {
      if(index !== i) {
        if(p5.Vector.sub(this.vec, arr[i].vec).mag() < this.perception) {
          //allignment
          avgvel.add(arr[i].vel);
          count1++;
          //cohesion
          avgPos.add(arr[i].vec);    
          count2++;
        }
      }
    }
    if(count1 > 0 && count2 > 0) {
      
      //allignment
      avgvel.mult(1 / count1);
      avgvel.limit(this.alignStrength);
      this.vel.add(avgvel);
      this.vel.limit(this.speed);
      //cohesion
      avgPos.mult(1 / count2);
      redArrow = p5.Vector.sub(avgPos,this.vec);
      redArrow.limit(this.cohesionStrength);
      this.vel.add(redArrow);
      this.vel.limit(this.speed);
  }
  }

 show() {
  this.update();
  stroke('white');
  strokeWeight(10);
  point(this.vec.x, this.vec.y);
 }
}