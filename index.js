let app;
let player;
let keys = {};
let keysDiv;

window.onload = function () {
    app = new PIXI.Application(

        {
            width: 1000,
            height: 800,
            backgroundColor: 0xAAAAAA
        }
    );

    document.body.appendChild(app.view);

    player = new PIXI.Sprite.from("images/player.png");
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    app.stage.addChild(player);

    // keybord event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);

    keysDiv = document.querySelector("#keys");
}

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



