var player, e1, e2, e3, bullet, divider, reset, rImg;
var playerImg, eImg1, eImg2, eImg3;
var l1,l2,l3,h1,h2,h3;
var score;
var lifeCount = 3;
localStorage["highestScore"]=0;
var gameState = "PLAY";

function preload() {
  playerImg = loadImage('spaceship.png');
  eImg1 = loadImage('Enemy.png');
  eImg2 = loadImage('enemy1.png');
  eImg3 = loadImage('enemy3.png');
  rImg = loadImage('reset.png');
}

function setup() {
  createCanvas(400,600);
  player = createSprite(200,550,0,0);
  player.scale = .2;
  player.addImage('spaceship', playerImg);
  divider = createSprite(200,70,500,10);
  bullet = createSprite(0,0,0,0);
  bullet.visible = false;
  e1 = createSprite(0,0,0,0);
  e1.visible = false;
  e2 = createSprite(0,0,0,0);
  e2.visible = false;
  e3 = createSprite(0,0,0,0);
  reset = createSprite(187,400, 60 ,30);
  reset.addImage('reset', rImg);
  reset.scale = 0.099;
  reset.visible = false;
  e3.visible = false;
  score = 0;
  life = 3;
}


function draw() {
  background("black");  
  
  textFont('Helvetica')
  textSize(16);
  text("Score: " + score, 300, 40);
  text("Lives: " + life,30,40);

  
  if(gameState === "PLAY"){
    player.visible = true;
    divider.visible = true;
    reset.visible = false;
    player.x = mouseX;

    if(e1.isTouching(player)){
      e1.destroy();
      life = life - 1;
    }
  
    if(e2.isTouching(player)){
      e2.destroy();
      life = life - 1;
    }
  
    if(e3.isTouching(player)){
      e3.destroy();
      life = life - 1;
    }

    if(bullet.isTouching(e1)){
      e1.destroy();
      score = score + 5;
      bullet.destroy();
    }
    if(bullet.isTouching(e2)){
      e2.destroy();
      bullet.destroy();
      score = score + 2;
    }
    if(bullet.isTouching(e3)){
      e3.destroy();
      bullet.destroy();
      score = score + 1;
    }
  spawnEnemies();
  }
  if(life === 0){
      gameState = "END";
      fill('white');
      textSize(30);
      text("Game Over", 120,300);
      e1.destroy();
      e2.destroy();
      e3.destroy();
      player.visible = false;
      divider.visible = false;
      text("Highscore: "+localStorage["highestScore"], 105,150);
      textSize(20);
      text("Score: "+score,150,200);
      reset.visible = true;
      
  }
  if(mousePressedOver(reset)){
    gameState = "PLAY";
    score = 0;
    life = 3;
  }
  
  if(localStorage["highestScore"]<score){
     localStorage["highestScore"]=score; 
    } 

  
  drawSprites();
}

function spawnEnemies() {
  if(World.frameCount%230 === 0){
    e1 = createSprite(random(20,380),75, 10, 10);
    e1.setVelocity(0,random(2,7));
    e1.addImage('enemy1', eImg1);
    e1.scale = .12;
    e1.visible = true;
    e1.lifetime = 263;
  }
  if(World.frameCount%170 === 0){
    e2 = createSprite(random(15,385), 75, 30, 10);
    e2.setVelocity(0,random(2,7));
    e2.addImage('enemy2', eImg2);
    e2.scale = .2;
    e2.visible = true;
    e2.lifetime = 263;
  }
  if(World.frameCount%250 === 0){
    e3 = createSprite(random(20,380), 75, 20, 10);
    e3.setVelocity(0,random(2,7));
    e3.addImage('enemy3', eImg3);
    e3.scale = .2;
    e3.visible = true;
    e3.lifetime = 263;
  }
}

function keyPressed() {
  if(keyCode === 32||touches.length > 0){
    bullet = createSprite(player.x, player.y, 10,10);
    bullet.visible = true;
    bullet.setVelocity(0,-5);
    touches = []
  }
  
}

