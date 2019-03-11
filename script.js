 
 
var canvas = document.querySelector("#myCanvas"); //reference to canvas element, similar to GetElementById
var context = canvas.getContext("2d"); //2D rendering context
var canvasPos = getPosition(canvas); //pass element 'canvas' to find proper position
var mouseX = 360;//mouse x Starting position
var mouseY = 400; //mouse y Starting position
var hit = false;
var startGame = 0;
var score = 0;
var highScore = 0;



 
canvas.addEventListener("mousemove", setMousePosition, false);
canvas.addEventListener("touchmove", setMousePositionTouch, false );


class fallingRectangle{
	constructor(){
		this.xPosition = Math.floor(Math.random() * 741 -100); 
		this.yPosition = (Math.floor(Math.random() * 400 +20)) *-1;
		this.width = Math.floor(Math.random() * 60 +20);
		this.height=15;
		this.speed = 3; 
	}
	create(){
		context.fillStyle = "#FFE664";
		context.fillRect(this.xPosition,this.yPosition,this.width,this.height);
	}
	move(){
		this.yPosition = this.yPosition + this.speed;
	}
	touchEdge(){
		if(this.yPosition > 500){
			this.yPosition = (Math.floor(Math.random() * 300 +20)) *-1;
			this.xPosition= Math.floor(Math.random() * 700);
			if(this.speed < 20){
				this.speed = this.speed + 1; 
			}
			
		}
	}
	touchCursor(){
		if( (mouseX > this.xPosition && mouseX < this.xPosition+this.width) && (mouseY > this.yPosition && mouseY < this.yPosition+this.height) ){
			hit = true;
		}
			
		
		
	}
	
	resetBlock(){
		this.xPosition = Math.floor(Math.random() * 741 -100); 
		this.yPosition = (Math.floor(Math.random() * 300 +20)) *-1;
		this.width = Math.floor(Math.random() * 60 +20);
		this.height=15;
		this.speed = 3; 
		
	}
}

var rectangleList=[];
var fallingRect1 = new fallingRectangle;

for (var i = 0; i < 20; i++) { 
  rectangleList[i] = new fallingRectangle;
}


  

  
// main function
function update() {
	if(startGame >0){
		ball();
		fallingRect();
		displayTime();
		gameOver();
		score = score + .01;;
		//requestAnimationFrame(update)
		
	}
	
	

}



//Time
function displayTime() {
	if(hit == false){
		context.font="40px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText(score.toFixed(2), canvas.width/2, 50);
    
    context.font="20px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("High Score: "+highScore.toFixed(2), canvas.width -100, 50);
	}
	
	
	
  
}


//rectangles falling
function fallingRect() {
	if(hit == false){
		
		for (var i = 0; i < 20; i++) { 
			rectangleList[i].create();
			rectangleList[i].move();
			rectangleList[i].touchEdge();
			rectangleList[i].touchCursor();
		}
		
	}
  
}
//ball display
function ball() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI, true);
	context.fillStyle = "#FF6A6A";
	context.fill();
	context.closePath();
  
  
}
//game over function
function gameOver() {
	if(hit){
    
    document.getElementById("myFilter").style.display = "block";
    
    if(score > highScore){
      highScore = score;
    }
		
		context.font="50px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("Game Over", canvas.width/2, canvas.height/2);
    
    context.font="30px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("High Score: "+highScore.toFixed(2), canvas.width/2, canvas.height/2 +50);
		
		context.font="40px Tahoma";
		context.fillStyle = "white";
		context.textAlign = "center";
		context.fillText("Score: "+score.toFixed(2), canvas.width/2, canvas.height/2 +100);
    
		for (var i = 0; i < 20; i++) { 
			rectangleList[i].resetBlock();
		}
		startGame = 0;
		score = 0;

	}
  
  
}

 //for proper mouse postitioning
 function setMousePosition(e) {
	mouseX = e.clientX - canvasPos.x;
	mouseY = e.clientY - canvasPos.y;
} 

function getPosition(el) {
	var xPosition = 0;
	var yPosition = 0;
 
	while (el) {
		xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}    

function setMousePositionTouch(e) {
	mouseX =  e.touches[0].clientX - canvasPos.x;;
	mouseY =  e.touches[0].clientY - canvasPos.y;
  
} 

//play function
 function start(){
	 if(startGame == 0){
     document.getElementById("myFilter").style.display = "none";

		//requestAnimationFrame(update);
		hit = false;
		startGame++;
	 }

 }
var framesPer = setInterval(update, 1000/60);
