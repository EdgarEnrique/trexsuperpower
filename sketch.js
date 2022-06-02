var trex, trexAnimacion;
var suelo, sueloImagen;
var sueloInvisible;
var nube, nubeImagen;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var grupoobstaculos
var gruponubes
var gamestate="play"
var score = 0;
var trexparado;
var restart, gameover;
var restartImg;
var gameoverimg;
var salto,muerte,puntos
var poder,poderanimacion, grupopoderes;
var inmortal = 0, bonusInmortal=0;
var band = 0, poderScore=0;
 
// cargar imagenes, sonidos, animaciones
function preload(){
  trexAnimacion = loadAnimation("trexp1.png", "trexp3.png", "trexp4.png");
  sueloImagen = loadImage("ground2.png");
  nubeImagen=loadImage("cloud.png");
  obstaculo1=loadImage("obstacle1.png")
  obstaculo2=loadImage("obstacle2.png")
  obstaculo3=loadImage("obstacle3.png")
  obstaculo4=loadImage("obstacle4.png")
  obstaculo5=loadImage("obstacle5.png")
  obstaculo6=loadImage("obstacle6.png")
  trexparado=loadAnimation("trexp1.png")
  restartImg = loadImage("restart.png")
  gameoverimg = loadImage("gameOver.png")
  salto = loadSound("jump.mp3");
  muerte = loadSound("die.mp3")
  puntos=loadSound("checkPoint.mp3")
  poderanimacion=loadAnimation("bola1.png","bola2.png","bola3.png","bola4.png")
}
 
//crear sprites
function setup() {
  //createCanvas(600, 200);
  createCanvas(windowWidth, windowHeight);
 
  //trex = createSprite(50,170,20,50);
  trex = createSprite(100,height-70,20,50);
  trex.addAnimation("trex",trexAnimacion);
  trex.addAnimation("trexparado",trexparado)
  trex.scale=0.7
  //trex.debug=true
  trex.setCollider("circle",0,0,40);
 
   suelo = createSprite(width/2,height-40,width*2,2);
   suelo.addImage("ground",sueloImagen);
   suelo.addAnimation("ground", sueloImagen);
   suelo.scale=1.3
 
  sueloInvisible = createSprite(width/2,height-10,width,40);
  sueloInvisible.visible = false;
 
  var aleatorio= Math.round(random(1,100))
  console.log(aleatorio)
 
  grupoobstaculos=new Group ()
  gruponubes=new Group ()
  grupopoderes =new Group()
 
  gameover = createSprite(width/2,height/2- 50);
  gameover.addImage(gameoverimg)
  gameover.visible = false;
  gameover.scale = 0.5;
 
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg)
  restart.visible=false
  restart.scale = 0.5;
 
 
}
 
function draw() {
  background(240);
//console.log(trex.y)
 
text("score "+score,50,50);
 
  if(gamestate === "play"){
    //getFrameRate -- numero veces dibuja juego x segundo
    score+=Math.round(getFrameRate()/60);
    if(score > 0 && score % 1000 === 0){
      puntos.play()
    }
 
    
    if(score>0 && score % 1000 ===0 && band===0){
      if(poderScore === 0){
        crearPoder();
        band =1;
      }
      else if(poderScore < score && poderScore > 0 ){
        crearPoder();
      }
      else if(poderScore === score && band === 0){
        band =1;
      }
      poderScore=score;
      
    }
    if(poderScore < score && poderScore > 0 ){
        band =0;
    }
 
   if(trex.isTouching(grupopoderes)){
      grupopoderes.destroyEach();
      inmortal=1
      bonusInmortal = score;
    }
   
   /* if(keyDown("space") && trex.y >= 150 ){
 
      trex.velocityY=-7;
      salto.play()
    }*/
 
    if((touches.length > 0 || keyDown("space")) && trex.y >= height-80) {
      trex.velocityY = -7;
      touches=[];
      salto.play()
    }
 
    trex.velocityY +=0.3;
 
   
    suelo.velocityX =-(2+(score/300));
    if(suelo.x <0){
        suelo.x = 200
    }
 
    drawClouds ();
    dibujaobstaculos();
 
    if(grupoobstaculos.isTouching(trex) && inmortal === 0){
      gamestate="gameover"
      muerte.play()
     }
    if(inmortal === 1){
      if(score === (bonusInmortal+200)){
        inmortal = 0;
      }
      else {
        textSize(50)
        var r = Math.round(random(0,255))
        var g = Math.round(random(0,255))
        var b = Math.round(random(0,255))
        fill(rgb(r,g,b))
        text("PODERES", width/2-50, height/2-100);
      }
      
    }
 
     gameover.visible = false;
     restart.visible=false
  }
  if(gamestate === "gameover"){
    gameover.visible = true;
    restart.visible=true
    grupoobstaculos.setLifetimeEach(-1)
    grupoobstaculos.setVelocityXEach(0)
    trex.changeAnimation("trexparado",trexparado)
    gruponubes.setLifetimeEach(-1)
    suelo.velocityX=0
    trex.velocityY=0
    gruponubes.setVelocityXEach(0)
  if(mousePressedOver(restart)){
    reset()
  }
  }
 
 
 
  trex.collide(sueloInvisible);
 
 
 
 
 
 
 
  drawSprites();
}
 
function drawClouds (){
 
  if(frameCount % 95 === 0){
    //nube=createSprite(600,100,30,10)
    nube=createSprite(width+20,height-400,40,10);
    nube.addImage("nube",nubeImagen);
    nube.velocityX=-3;
    nube.scale=Math.random(40,60);
    nube.y=Math.round(random(10,100));
    trex.depth=nube.depth+1
    nube.lifetime=width/2;
    gruponubes.add(nube)
  }
 
}
function dibujaobstaculos(){
  if (frameCount % 105 === 0 ){
   // obstaculo=createSprite(600,170,10,40);
    obstaculo= createSprite(width+20,height-60,20,30);
   
    var numero = Math.round(random(1,6));
   
switch(numero){
  case 1: obstaculo.addImage(obstaculo1);
  obstaculo.scale=0.6
  break;
  case 2: obstaculo.addImage(obstaculo2);
  obstaculo.scale=0.6
  break;
  case 3: obstaculo.addImage(obstaculo3);
  obstaculo.scale=0.4
  break;
  case 4: obstaculo.addImage(obstaculo4);
  obstaculo.scale=0.4
  break;
  case 5: obstaculo.addImage(obstaculo5);
  obstaculo.scale=0.5
  break;
  case 6: obstaculo.addImage(obstaculo6);
  obstaculo.scale=0.5
  break;
}
 
obstaculo.lifetime=width/2;
//obstaculo.velocityX=-(2+(score/300));
    grupoobstaculos.add(obstaculo)
    grupoobstaculos.setVelocityXEach(-(2+(score/300)))
  }
}
 
function reset(){
  grupoobstaculos.destroyEach()
  gruponubes.destroyEach()
  gameover.visible = false;
  restart.visible=false
  gamestate="play"
  trex.changeAnimation("trex",trexAnimacion)
  score=0
}
 
function crearPoder (){
  var aX= Math.round(random(65, 100))
  var aY= Math.round(random(height-50, height-235));
  var poder=createSprite(aX, aY,10,10)
  poder.addAnimation("poder", poderanimacion)
  poder.scale= 0.03
 
  grupopoderes.add(poder)
}