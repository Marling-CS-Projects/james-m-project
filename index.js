let app;
let player;
let keys = {};
let keysDiv;
let enemy;
let speed = 4; 


app = new PIXI.Application(

    {
        width: 1000,
        height: 800,
        backgroundColor: 0xCD5C5C
    }
);

document.body.appendChild(app.view);

// preloading sprite so it loads when game is opened and feedback system to report on progress, loading and errors.
app.loader.baseUrl = "images";
app.loader
.add("player", "bloat03.png");

app.loader.onProgress.add(showProgress);
app.loader.onComplete.add(doneLoading);
app.loader.onError.add(reportError);

app.loader.load();

function showProgress(e) {
    console.log(e.progress);
}

function reportError(e) {
    console.error("ERROR: " + e.message);
}

function doneLoading(e) {
    console.log("DONE LOADING!");

    player = PIXI.Sprite.from(app.loader.resources.player.texture);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    player.anchor.set(0.5);
    app.stage.addChild(player);
}

// Implementing keyboard movement and setting a speed for the sprite.
function gameLoop(delta){
    player.x += speed;
    enemy.x -= speed;

    if (rectsIntersect(player, enemy)) {
        speed = 0;
    }

}


function rectsIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y < bBox.y + bBox.height;
}

// keybord event handlers
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

keysDiv = document.querySelector("#keys");


function keysDown(e) {
    keys[e.keyCode] = true;

}

function keysUp(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = false;

}

function gameLoop() {
    keysDiv.innerHTML = JSON.stringify(keys);
    // W
    if (keys["87"]) {
        player.y -= 5;
    }
    //A
    if (keys["65"]) {
        player.x -= 5;
    }
    //S
    if (keys["83"]) {
        player.y += 5;
    }
    //D
    if (keys["68"]) {
        player.x += 5;
    }

}



app.ticker.add(gameLoop);