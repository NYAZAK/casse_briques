
// crée le canvas et lui donne les dimensions
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// nos variables 
var x = canvas.width/5;
var y = canvas.height-40;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// cree un paddle pour tapper la balle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

/**
 * on creer deux variables qui stockent 
 * le fait que la fleche droite ou gauche du 
 * clavier sont appuiées ou relachées
 * 
 */
var rightPressed = false;
var leftPressed = false;

/**
 * on ajoute deux écouteurs d'evenment 
 * un lorsque la touche est appuiée
 * lautre quand la touche est relachée
 */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/**
 * on ajoute deux fonctions pour faire passer les variables
 * à true si elles sont touchées, et à false quand elles sont 
 * relachées
 */

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
        console.log(e.keyCode);
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    } else if ( e.keyCode == 37){
        leftPressed = false;
    }
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

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
    drawPaddle();
   
    if(y + dy < ballRadius){
        dy = -dy;  
    }
    else if( y + dy > canvas.height-ballRadius ) {
        if( x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            console.log(x);
        } else { 
        alert("Game Over");
        document.location.reload(); 
        }
    }
    if( x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;   
    } 

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}
setInterval(draw, 10);