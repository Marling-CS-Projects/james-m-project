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
        backgroundColor: 0xAAAAAA
    }
);

document.body.appendChild(app.view);

// preloaded assets
app.loader.baseUrl = "images";
app.loader
.add("sprite01", "bloat01.png")
.add("sprite02", "bloat02.png")
.add("sprite03", "bloat03.png")
.add("sprite04", "bloat04.png")
.add("sprite05", "bloat05.png")
.add("player", "player.png");

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

player = new PIXI.Sprite.from("images/player.png");
player.anchor.set(0.5);
player.x = 16;
player.y = app.view.height / 2;
app.stage.addChild(player);

enemy = new PIXI.Sprite.from("images/player.png");
enemy.anchor.set(0.5);
enemy.x = app.view.width - 16;
enemy.y = app.view.height / 2;
app.stage.addChild(enemy);

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