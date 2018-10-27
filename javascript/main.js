
// crée le canvas et lui donne les dimensions
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// nos variables 
var x = canvas.width/5;
var y = canvas.height-40;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// nos fonctions pour la balle et le rectangle
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


// function qui donne le mouvement à une balle 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;  
    }
    if( x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;   
    }
}
setInterval(draw, 10);