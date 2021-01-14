/*
The game is a bow and arrow game where the player is give 5 chances to shoot an arrow from a bow to the targets.
There are 4 targets on the screen and each one provides different number of points. 10, 20, 40 and 50.
The player's aim is to score the largest number of points in his or her 5 trials.
The mouse is dragged by the player to release the arrow.
The space bar is used to launch the arrow back onto the now for another attempt.
Smoke images have been added to the arrow.
*/
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var target1, target2, target3;
var arrow, bow;
var backgroundImg,platform;
var gameState = "stop";
var gameState2 = "onThread";
var score = 0;
var flag = 0;
var count = 0;

function preload() {
    targetImg = loadImage("sprites/target.png");
    dayImg = loadImage("sprites/day.png");
    nightImg = loadImage("sprites/night.png");
    gameOverImg = loadImage("sprites/gameOver.jpg");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);

    target1 = createSprite(1000, 80, 100, 100);
    target1.addImage(targetImg)
    target1.scale = 0.25;
    target2 = createSprite(600, 150, 100, 100);
    target2.addImage(targetImg)
    target2.scale = 0.25;
    target3 = createSprite(1100, 300, 100, 100);
    target3.addImage(targetImg)
    target3.scale = 0.25;
    target4 = createSprite(850, 200, 100, 100);
    target4.addImage(targetImg)
    target4.scale = 0.25;

    arrow = new Arrow(185, 200, 150, 75);
    bow = new Bow(185, 200, 150, 350);

    bowThread = new BowThread(arrow.body, {x:190, y:200});
}

function draw(){

    if(score >= 200){
        background(dayImg);
    }
    else{
        background(nightImg);
    }
    
    drawSprites();

    ground.display();

    arrow.display();
    bow.display();
    bowThread.display();
    
    textSize(20);
    fill("black");
    text("10", 1000, 80);
    text("20", 600, 150);
    text("40", 1100, 300);
    text("50", 850, 200);

    textSize(25);
    fill("black");
    text("Score"+score, 200, 100)

    if(gameState === "play" && (flag === 0)){
        if(arrow.body.position.x > 550 && arrow.body.position.y < 200 && arrow.body.position.x < 650 && arrow.body.position.y > 100){
            Matter.Body.setStatic(arrow.body,true);
            if(!flag){
                score = score+20;
                flag = 1;
            }
        }
    
        if(arrow.body.position.x > 800 && arrow.body.position.y < 250 && arrow.body.position.x < 900 && arrow.body.position.y > 150){
            Matter.Body.setStatic(arrow.body,true);
            if(!flag){
                score = score+50;
                flag = 1;
            }
        }
    
        if(arrow.body.position.x > 950 && arrow.body.position.y < 130 && arrow.body.position.x < 1050 && arrow.body.position.y > 30){
            Matter.Body.setStatic(arrow.body,true);
            if(!flag){
                score = score+10;
                flag = 1;
            }
        }
    
        if(arrow.body.position.x > 1050 && arrow.body.position.y < 350 && arrow.body.position.x < 1150 && arrow.body.position.y > 250){
            Matter.Body.setStatic(arrow.body,true);
            if(!flag){
                score = score+40;
                flag = 1;
            }
        }
    }
    else{
        Matter.Body.setStatic(arrow.body,false);
    }

    if(gameState === "play"){
        if(flag === 1){
            score = score+20;
            gameState = "stop";
        }
    }

    if(gameState === "play"){
        if(flag === 2){
            score = score+50;
            gameState = "stop";
        }
    }

    if(gameState === "play"){
        if(flag === 3){
            score = score+10;
            gameState = "stop";
        }
    }

    if(gameState === "play"){
        if(flag === 4){
            score = score+40;
            gameState = "stop";
        }
    }

    if(count === 10){
        gameState = "end"
    }

    if(gameState === "end"){
        var gameOver = createSprite(600, 200, 50, 50);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.25;
    }

    Engine.update(engine);
}

function mouseDragged(){
    if(gameState !== "end"){
        if(gameState2 !== "released"){
            Matter.Body.setPosition(arrow.body, {x: mouseX , y: mouseY});
        }
    }
}

function mouseReleased(){
    if(gameState !== "end"){
        bowThread.fly();
        gameState = "play";
        flag = 0;
        gameState2 = "released"
    }
}

function keyPressed(){
    if(gameState !== "end"){
        if(keyCode === 32){
            count+=1;
            gameState = "play";
            gameState2 = "onThread"
            bowThread.attach(arrow.body)
            Matter.Body.setPosition(arrow.body, {x:185, y:200});
        }
    }
}