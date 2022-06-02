var trex, trexAnimacion;
var suelo, sueloImagen;
var sueloInvisible;
var nube, nubeImagen;

// cargar imagenes, sonidos, animaciones
function preload(){
  trexAnimacion = loadAnimation("trexp1.png", "trexp3.png", "trexp4.png");
  sueloImagen = loadImage("ground2.png"); 
  nubeImagen=loadImage("cloud-prueba.png");
}

//crear sprites 
function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,170,20,50);
  trex.addAnimation("trex",trexAnimacion);
  trex.scale=0.7
  
   suelo = createSprite(200,180,400,10);
   suelo.addImage("ground",sueloImagen);
   suelo.addAnimation("ground", sueloImagen);
  
  sueloInvisible = createSprite(200,190,400,10);
  sueloInvisible.visible = false;

  var aleatorio= Math.round(random(1,100))
  console.log(aleatorio)
}

function draw() {
  background(240);
//console.log(trex.y)

  if(keyDown("space") && trex.y >= 150 ){ 
    trex.velocityY=-7;
  }
  trex.velocityY +=0.3;

  trex.collide(sueloInvisible);

  suelo.velocityX =-2 
  if(suelo.x <0){
    suelo.x = 200
  }
  
  drawClouds ();
  
  drawSprites();
}

function drawClouds (){

  if(frameCount % 95 === 0){
    nube=createSprite(600,100,30,10)
    nube.addImage("nube",nubeImagen);
    nube.velocityX=-3;
    nube.scale=Math.random(40,60);
    nube.y=Math.round(random(10,100));
    trex.depth=nube.depth+1
  }
  
}
