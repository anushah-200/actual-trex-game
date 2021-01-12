var trex,ground,ground2,trexrun,groundimg,cloud,cloudimg,cloudGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score,gameState,trexcollide,restartimg,gameoverimg,gameover,restart
var jumpsound,diesound,checkpoint

function preload(){
 trexrun=loadAnimation ("trex1.png","trex3.png","trex4.png")
  groundimg=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
   obstacle2=loadImage("obstacle2.png")
   obstacle3=loadImage("obstacle3.png")
   obstacle4=loadImage("obstacle4.png")
   obstacle5=loadImage("obstacle5.png")
   obstacle6=loadImage("obstacle6.png")
  trexcollide=loadImage("trex_collided.png")
  restartimg=loadImage("restart.png")
  gameoverimg=loadImage("gameOver.png")
 jumpsound=loadSound("jump.mp3")
  diesound=loadSound("die.mp3")
  checkpoint=loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50);
  trex.addAnimation("running",trexrun)
   trex.addAnimation("collided",trexcollide)
  trex.scale=0.5
  ground=createSprite(300,180,width,20)
  ground.addImage("ground",groundimg)
  ground2=createSprite(300,190,width,20)
  ground2.visible=false

  restart=createSprite(300,140,10,10)
  restart.addImage(restartimg)
  restart.scale=0.8
   gameover=createSprite(300,100,10,10)
  gameover.addImage(gameoverimg)
  gameover.scale=0.8
  restart.visible=false
  gameover.visible=false
  cloudGroup=new Group()
  obstacleGroup=new Group()
   score=0
  gameState="play"
}

function draw() {
  background(180);
  if(gameState==="play"){
 if(keyDown("space")&&trex.collide(ground2)) {
   trex.velocityY=-12
  jumpsound.play()
 }
  if(score%100===0&&score>0) {
  checkpoint.play()}
   
   
 trex.velocityY=trex.velocityY+0.8
trex.collide(ground2)  
if(ground.x<0){
 ground.x=width/2   
}
 ground.velocityX=-(5+3*Math.round(score/100))
score=score+Math.round (getFrameRate()/60)
  text("score:"+score,500,50)
  
  spawnobstacles()
   spawnclouds()
  if(trex.isTouching(obstacleGroup))
  gameState="end"
  diesound.play()
  }
  else if(gameState==="end"){
  trex.velocityY=0 
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    ground.velocityX=0
     trex.changeAnimation("collided",trexcollide)
    obstacleGroup.setLifetimeEach(-1)
     cloudGroup.setLifetimeEach(-1) 
    restart.visible=true
    gameover.visible=true
   
    if(mousePressedOver(restart)){
       reset()
    }
  }
    drawSprites()
}
function reset(){
 gameState="play" 
  gameover.visible=false
 restart.visible=false 
 obstacleGroup.destroyEach() 
  cloudGroup.destroyEach()
  trex.changeAnimation("running",trexrun)
  score=0
}

function spawnclouds(){
if(frameCount%50===0) {
cloud=createSprite(600,Math.round(random(80,120)),40,10) 
cloud.addImage(cloudimg)
cloud.velocityX=-5  
cloud.lifetime=134 
  trex.depth=cloud.depth+1
  cloudGroup.add(cloud)
} 
   
}
function spawnobstacles(){
 if(frameCount%80===0) {
 obstacle=createSprite(600,165,10,40)  
 var a=Math.round(random(1,6))  
 switch(a){ 
   case 1: obstacle.addImage(obstacle1) 
     break;
       case 2: obstacle.addImage(obstacle2) 
     break;
       case 3: obstacle.addImage(obstacle3) 
     break;
       case 4: obstacle.addImage(obstacle4) 
     break;
       case 5: obstacle.addImage(obstacle5) 
     break;
       case 6: obstacle.addImage(obstacle6) 
     break; 
     default:  break; 
 }
 obstacle.scale=0.5
 obstacle.velocityX=-6  
 obstacle.lifetime=134  
   obstacleGroup.add(obstacle)
 }
  
  
}






