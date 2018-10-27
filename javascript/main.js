
// crée le canvas et lui donne les dimensions
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score = 0;
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
 * Variables met en place les bricks à casser avec la balle
 * on met aussi en place le height et le wight de chaque brique 
 * son padding et les espacements entre.
 */
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks =[];
for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBricks() {
    for(var c = 0; c < brickColumnCount; c++){
        for(var r=0; r <brickRowCount; r++){
            if(bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score = score + (score += 2);
            if(b.status == 0){
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
            }
            if(score == brickColumnCount * brickRowCount) {
                alert("Vous avez gagnée, Bravo !");
                document.location.reload();
            }
          }
        }
      }
    }
  }
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
/**
 * fonction permettant d'afficher le score du joueur
 * 
 */

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}


// function qui donne le mouvement à une balle 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    if(y + dy < ballRadius){
        dy = -dy;  
    }
    else if( y + dy > canvas.height-ballRadius ) {
        if( x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            dx + 3;
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