/* Create the canvas*/
var canvas = document.createElement("canvas");
canvas.width = 780
canvas.height = 480
var context = canvas.getContext("2d");
var wrapper = document.createElement('div');
document.body.appendChild(wrapper);
wrapper.appendChild(canvas);
wrapper.className = "gradient-border";

/* Background image*/
var showBackground = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    showBackground = true;
};
backgroundImage.src = "images/Mars.jpg";
backgroundImage.id = "backgroundPic";

/*Monster image*/
var showMonster = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    showMonster = true;
};
monsterImage.src = "images/greendeath.png";

var score = 0;

/* Game objects*/
var monster = {
    x: 0,
    y: 0,
    delay: 2600 // movement in pixels per second
}

/* Handle mouse controls/ Are they touching?*/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

canvas.onmousedown = function (e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;

    if (posx >= monster.x
        && posx <= monster.x + 70
        && posy >= monster.y
        && posy <= monster.y + 70) {
        reset();
        monster.delay -= 50;
        if (monster.delay > 1600) {
            ++score;
        }
        if (monster.delay == 1600) {
            ++score;
            alert("It's not difficult yet but good job");
        }
        if (monster.delay < 1600 && monster.delay > 800) {
            ++score;
        }
        if (monster.delay == 800) {
            ++score;
            alert("It's about to become almost impossible.");
        }
        if (monster.delay < 800 && monster.delay > 0) {
            ++score;
        }
        else if (monster.delay == 0) {
            ++score;
            alert("Good job, You killed all the monsters. Start a new game.");
            score = 0;
            monster.delay = 2600;
        }

        then = Date.now()
    }
}


/* Reset the game when the player catches the monster*/
var reset = function () {
    /* Throw the monster somewhere on the screen randomly*/
    monster.x = 70 + Math.random() * ((canvas.width - 125) - 70);
    monster.y = 70 + Math.random() * ((canvas.height - 125) - 70);

}


/* Draw everything on canvas*/
var render = function () {
    if (showBackground) {
        context.drawImage(backgroundImage, 0, 0, 900, 600);
    }
    if (showMonster) {
        context.drawImage(monsterImage, monster.x, monster.y);
    }

    var scoreResult = document.getElementById('scoreResult');
    var delayResult = document.getElementById('delayResult');
    var result = "Score:" + score;
    var displayDelay = "Spawn Delay: " + monster.delay;
    scoreResult.innerHTML = result;
    delayResult.innerHTML = displayDelay;
}
function resetScore() {
    score = 0;
    monster.delay = 2600;
}
function resetSpeed() {
    monster.delay = 2600;
}
scoreResult = score.value;

/* The main game loop*/
var main = function () {
    var now = Date.now();
    var delta = now - then;
    if (delta > monster.delay) {
        reset();
        then = now;
    }
    render();
    requestAnimationFrame(main);
}
/* Cross-browser support for requestAnimationFrame*/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

/* Let's play this game!*/
reset();
var then = Date.now();
main();