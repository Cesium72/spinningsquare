var ang = 90;
var playerX = 50;
var rock = document.getElementById("rock");
var rockX = 50;
var rockY = -20;
var count = 20;
var score = 0;
var key = 0;
function play() {
    document.getElementById("home").style.display = "none";
    document.getElementById("board").style.display = "block";
    score = 0;
    count = 20;
    rockY = -20;
    update();
}
function shop() {
    document.getElementById("home").style.display = "none";
    document.getElementById("shop").style.display = "block";
}
function move(type) {
    ang += type * 5;
    playerX += type;
    document.getElementById("char").style.rotate = ang + "deg";
    if(playerX > 97) {
        playerX = 97;
    } else if(playerX < 0) {
        playerX = 0;
    }
    document.getElementById("char").style.left = playerX + "vw";
}
function update() {
    rockY++;
    rock.style.top = rockY + "vh";
    if(rockY == 100) {
        rockY = -20;
        rockX = ((Math.random() * 32) - 16) + playerX;
    }
    rock.style.left = rockX + "vw";
    if(rockY >= 80 && playerX >= rockX && playerX <= rockX + 35) {
        alert(`Game over!\nYour score was: ${score}\nGood job`);
        document.getElementById("board").style.display = "none";
        document.getElementById("home").style.display = "block";
    } else window.setTimeout(update,count);
    count *= 0.9995;
    score++;
    document.getElementById("score").textContent = `Score: ${Math.floor(score)}`;
    move(key);
}
document.addEventListener("keydown", ((event) => key = (event.key == "ArrowLeft" ? -1 : event.key == "ArrowRight" ? 1 : 0)));
document.addEventListener("keyup", () => key = 0);