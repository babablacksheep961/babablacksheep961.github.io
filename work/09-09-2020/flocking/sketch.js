let obs = [];
let count = 100;
function setup() {
    var canvas = createCanvas(600 , 600);
    canvas.parent('sketch-div');
    background(0);
    
    for( i = 0 ; i < count ; i++ ){
        ob = new body(random(1,500) , random(1,500));
        obs.push(ob);
		} 
}

function draw() {
    
    background(0);
    for(let i = 0; i < count; i++) {
			
        obs[i].flocking_simulation(obs, i);    
        obs[i].separation(obs, i);    
		obs[i].show();
			
		}	
    
}