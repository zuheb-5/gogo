
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var jungle,jungleImage;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameover,gameoverImage;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  gameoverImage = loadImage("gameover.png")
  groundImg = loadAnimation("ground.jpg") 
  jungleImage = loadAnimation("jungle.png") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  jungle= createSprite(300,150,600,10);
  jungle.scale = 1;
  jungle.addAnimation("jungle", jungleImage);
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  gameover= createSprite(300,150,600,10);
  gameover.scale = 1;
  gameover.addAnimation("gameover", gameoverImage);
  gameover.visible=false; 
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  background("skyblue");
  
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    jungle.velocityX = -(4+score*1.5/100);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -18; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    jungle.velocityX = 0;
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    gameover.visible=true;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      gameover.destroy();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  fill("white");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%110 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%180 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    
    obstacle.setCollider("circle", 0, 50, 73);
    obstacle.scale = 0.7 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






