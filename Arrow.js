class Arrow{
  constructor(x, y, width, height) {
    var options = {
      'restitution':0.8,
      'friction':1.0,
      'density':1.0,
      isStatic: true
    }
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;
    this.image = loadImage("sprites/arrow.png");
    this.smokeImage = loadImage("sprites/smoke.png");
    this.smokeTrail = [];
    World.add(world, this.body);
  }

  display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();

    if(gameState2 === "released"){
    var position = [this.body.position.x,this.body.position.y];
    this.smokeTrail.push(position);
    }

    if(gameState2 === "onThread"){
      this.smokeTrail = [];
    }

    for(var i = 0; i < this.smokeTrail.length; i+=3){
      image(this.smokeImage, this.smokeTrail[i][0], this.smokeTrail[i][1]);
    }
  }
}