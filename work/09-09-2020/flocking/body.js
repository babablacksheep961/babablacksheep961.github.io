class body {
    constructor(x , y) {
        this.vec = createVector(x , y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(this.speed); 
        this.perception = 25;
        this.alignStrength = 0.1;
        this.sepStrength = 0.2;
        this.speed = 5;
        this.cohesionStrength = 0.2;
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
    show() {
        
        this.update();
        stroke('white');
        strokeWeight(10);
        point(this.vec.x, this.vec.y);
        //fill(0,255,0,100);
        //stroke(1);
        //strokeWeight(0);
        //circle(this.vec.x, this.vec.y, this.perception * 2);
        
    } 
    separation(cmp, index) {
        var steer = createVector();
        
        for(let i = 0; i < cmp.length; i++) {
            if(index !== i) {
                if(p5.Vector.sub(this.vec, cmp[i].vec).mag() < 15) {
                    steer = p5.Vector.sub(this.vec, cmp[i].vec);
                    steer.limit(this.sepStrength);
                    this.vel.add(steer); 
                    this.vel.limit(this.speed);  
                }
            }
        }    
    }
    allignment(cmp, index) {
        
        let count = 0;
        var avgvel = createVector();
        for(let i = 0; i < cmp.length; i++) {
            if(index !== i)
                if(p5.Vector.sub(this.vec, cmp[i].vec).mag() < this.perception) 
                 {   avgvel.add(cmp[i].vel); count++ }       
        }
        if(count > 0) {
            avgvel.mult(1 / count);
            avgvel.limit(this.alignStrength);
            this.vel.add(avgvel);
            this.vel.limit(this.speed);
        }
    }

    cohesion(cmp, index) {
        var avgPos = createVector();
        var redArrow = createVector();
        let count = 0;
        for(let i = 0; i < cmp.length; i++) {
            if(index !== i)
                if(p5.Vector.sub(this.vec, cmp[i].vec).mag() < this.perception)  
                  {  avgPos.add(cmp[i].vec);    count++; }    
        }
        if(count > 0) {
            avgPos.mult(1 / count);
            redArrow = p5.Vector.sub(avgPos,this.vec);
            redArrow.limit(this.cohesionStrength);
            this.vel.add(redArrow);
            this.vel.limit(this.speed);
        }
    }
}