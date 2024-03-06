var ang = 90;
var playerX = 50;
var rock = document.getElementById("rock");
var rockX = 50;
var rockY = -20;
var count = 20;
var score = 0;
var key = 0;
var coins = 0;
var highscore = 0;
var skins = [0];
const items = [
    {
        "name":"Default",
        "value":":)",
        "price":0
    },
    {
        "name":"Ghost",
        "value":"",
        "price":15
    },
    {
        "name":"Blah",
        "value":":|",
        "price":25
    },
    {
        "name":"This guy actually has a nose!",
        "value":":>)",
        "price":40
    },
    {
        "name":"OMG",
        "value":":0",
        "price":75
    },
    {
        "name":"Wicked",
        "value":">:)",
        "price":100
    }
];
if(!localStorage.getItem("spinsquare-coins")) {
    localStorage.setItem("spinsquare-coins","0");
    localStorage.setItem("spinsquare-high","0");
    localStorage.setItem("spinsquare-skins","0");
}
coins = parseInt(localStorage.getItem("spinsquare-coins"));
highscore = parseInt(localStorage.getItem("spinsquare-high"));
skins = localStorage.getItem("spinsquare-skins").split(" ").map(a => parseInt(a));
function play() {
    document.getElementById("home").style.display = "none";
    document.getElementById("board").style.display = "block";
    score = 0;
    count = 20;
    rockY = -20;
    key = 0;
    update();
}
function shop() {
    document.getElementById("home").style.display = "none";
    document.getElementById("shop").style.display = "block";
    document.getElementById("coins").textContent = "Coins: " + coins;
}
function home() {
    document.getElementById("shop").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("home").style.display = "block";
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
        rockX = ((Math.random() * 64) - 52) + playerX;
    }
    rock.style.left = rockX + "vw";
    if(rockY >= 80 && playerX >= rockX && playerX <= rockX + 35) {
        document.getElementById("board").style.display = "none";
        document.getElementById("gameover").style.display = "block";
        coins += Math.floor((score / 300));
        if(score > highscore)
            highscore = score;
        document.getElementById("result").innerHTML = `YOU DIED!!!<br/>Score: ${score}<br/>Best score: ${highscore}<br/>Just by playing, you earned ${Math.floor((score / 300))} coins!<br/>Now that you have ${coins} coins, go buy something from the shop!`;
        localStorage.setItem("spinsquare-high",highscore);
        localStorage.setItem("spinsquare-coins",coins);
    } else window.setTimeout(update,count);
    count *= 0.9995;
    score++;
    document.getElementById("score").textContent = `Score: ${Math.floor(score)}`;
    move(key);
}
function buy(item) {
    if(coins >= items[item].price) {
        coins -= items[item].price;
        skins.push(item);
        document.querySelectorAll(`#shop button`)[item + 1].setAttribute("onclick",`equip(${item})`);
        document.querySelectorAll(`#shop button`)[item + 1].textContent = "EQUIP";
    } else {
        alert(`Sorry, but you don't have enough money to buy the "${items[item].name}" avatar.`);
    }
    localStorage.setItem("spinsquare-coins",coins);
    localStorage.setItem("spinsquare-skins",skins.join(" "));
    document.getElementById("coins").textContent = "Coins: " + coins;
}
function equip(item) {
    document.getElementById("char").textContent = items[item]["value"];
    //if(initialEquip)
    alert("Item equipped successfully!");
}
document.addEventListener("keydown", ((event) => key = (event.key == "ArrowLeft" ? -1 : event.key == "ArrowRight" ? 1 : 0)));
document.addEventListener("keyup", () => key = 0);
for(var i of items) {
    document.getElementById("shop").innerHTML += `<div class="item"><div class="char">${i.value}</div><br/>${i.name}<br/>$${i.price}<br/><button onclick="${skins.includes(items.indexOf(i)) ? "equip" : "buy"}(${items.indexOf(i)})">${skins.includes(items.indexOf(i)) ? "EQUIP" : "BUY"}</button></div>`;
}
