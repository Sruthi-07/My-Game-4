class BowThread{
  constructor(bodyA, pointB) {
    var options = {
      bodyA: bodyA,
      pointB:pointB,
      stiffness: 0.04,
      length:1
    }
    this.pointB = pointB;
    this.body = Constraint.create(options);
    World.add(world, this.body);
  }
  fly(){
    Matter.Body.applyForce(arrow.body, arrow.body.position, {x:200, y:0})
    this.body.bodyA = null;
  }

  attach(body){
    this.body.bodyA = body;
  }

  display(){
    if(this.body.bodyA){
      var pointA = this.body.bodyA.position;
      var pointB = this.pointB;
      line(pointA.x, pointA.y, pointB.x, pointB.y);
    }
  }
}