var PLAY = 1;
var END = 0;
var gameState = PLAY;

var main, main_running, trex_collided;
var loose;
var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var sanitizer;
var injection;

var vaccine;
var points;


function preload(){
  main_running = loadAnimation("boy1.png","boy2.png","boy3.png");
  trex_collided = loadImage("fall.png");
  loose = loadImage("th.png")
  
  groundImage = loadImage("ground 1.png");
  bgImg = loadImage("bg1.jpg")
  
  cloudImage = loadImage("cloud.png");
  restartImg = loadImage("restart.png")
  
  obstacle1 = loadImage("virus 1.png");
  obstacle2 = loadImage("virus 2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  sanitizer5= loadImage("san.png")
  inj = loadImage("syr.png")

  
  
  
  // For loading the sounds
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")

}

function setup() {
  createCanvas(1500, 500);
  
  main = createSprite(150,180,20,50);
  main.addAnimation("running", main_running);
 main.scale = 0.6;

  fall = createSprite(450,380,20,50);
  fall.addImage(trex_collided);
  fall.scale = 0.6;
  fall.visible=false;

  touch = createSprite(150,300,20,50);
  touch.addImage(loose);
  touch.scale = 0.6;
  touch.visible = false;
  
  ground = createSprite(200,500,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=4;
  ground.x = ground.width /2;

  restart = createSprite(750,320);
  restart.addImage(restartImg);

  restart.scale = 0.5;
  
  
  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 sanGroup = createGroup();
 injeGroup = createGroup();
  
  console.log("Hello" + 5);
  //For the colliation radius 
  
  main.setCollider("rectangle",0,0,80,220);
  main.debug = false;
  
  score = 0;
  points = 0;
  vaccine = 0;
  
}

function draw() {
  if (keyDown(LEFT_ARROW)) {
    gameState = PLAY;
  }
  background(bgImg);

  
 

  
    
  
  if(gameState === PLAY){
        
    stroke ("black")
    fill ("Black")
    textSize(40);
    text("Score: "+ score, 150,50);
   text("Points:" + points , 650, 50);
    text("Vaccines:"+ vaccine , 1150 , 50)

    restart.visible = false;
  
  
    ground.velocityX = -(10 + 3* score/500)
    //scoring
    score = score + Math.round(frameCount/100);
    // TO PLAY SOUND IF THE SCORE MULTIPLE OF100
    if(score >0 && score %100 === 0){
      
      //checkPointSound.play();
    }
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    
    if(keyDown("space")&& main.y >= 290||mousePressedOver(main)&& main.y >= 290) {
        main.velocityY = -12;
    }
    
    
    //add gravity
    main.velocityY = main.velocityY + 0.8
  
     
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnSan();
    spawnInje();
 
   
  if(sanGroup.isTouching(main)){
    points = points +1 ;
    sanGroup.destroyEach();
    
  

}



if(obstaclesGroup.isTouching(main)){

  gameState = END;
  obstaclesGroup.destroyEach();

 
} 




  
  }
  




   
 
   else if (gameState === END) {
     console.log("hey")
     if(mousePressedOver(restart)) {
        location.reload();
      }
    
     stroke ("black")
     fill ("Black")
     textSize(40);
     text("Score: "+ score, 150,50);
    text("Points:" + points , 650, 50);
     text("Vaccines:"+ vaccine , 1150 , 50)
    
      fall.addImage(trex_collided);
     
      ground.velocityX = 0;
      main.velocityY = 0
      fill("black")
     textSize(50)
      text("🦠You are Infected🦠",550,200)
   
      //change the trex animation
      main.visible=false;
      fall.visible= true;
      restart.visible = true;
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
     obstaclesGroup.setVelocityXEach(0);

     

   
   }
  
 
 
  main.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(1400,400,10,40);
   //To increase the speed 
   obstacle.velocityX = -(5+ score / 500);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
function reset(){
        gameState=PLAY;

         restart.visible=false;
         score = 0;
       obstaclesGroup.destroyEach(); 
       sanGroup.destroyEach();
     
       
       }

function spawnSan(){
  if (frameCount %  800 === 0){
    var sanitizer = createSprite(1450,400,10,40);
    //To increase the speed 
    sanitizer.velocityX = -(6+ score / 500);
    
     //generate random obstacles
     var rand = Math.round(random(1,1));
     switch(rand) {
       case 1: sanitizer.addImage(sanitizer5);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     sanitizer.scale = 0.4;
     sanitizer.lifetime = 300;
    
    //add each obstacle to the group
    sanGroup.add(sanitizer);
  }
 }

 function spawnInje(){
  if (frameCount % 1400 === 0){
    var injection = createSprite(1450,400,10,40);
    //To increase the speed 
    injection.velocityX = -(6+ score / 500);
    
     //generate random obstacles
     var rand = Math.round(random(1,1));
     switch(rand) {
       case 1: injection.addImage(inj);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     injection.scale = 0.2;
     injection.lifetime = 300;
    
    //add each obstacle to the group
    injeGroup.add(injection);
  }
 }


 
