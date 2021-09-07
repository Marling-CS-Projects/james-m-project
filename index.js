let app;
let player;
let keys = {};
let keysDiv = document.querySelector("#keys");
let playerSheet = {};
let enemy;
let speed = 2;

  app = new PIXI.Application(

    {
      width: 512,
      height: 512,
      antialiasing: true, 
      transparent: false, 
      resolution: 1
    }
  );

  document.querySelector("#gameDiv").appendChild(app.view);
  app.stage.interative = true;
  document.querySelector("#gameDiv").addEventListener("pointerdown", fireBullet);

  player = PIXI.Sprite.from("images/dungeon.png");
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;
  player.anchor.set(0.5);

  app.stage.addChild(player);

  app.ticker.add(gameLoop);

// preloading sprite so it loads when game is opened
app.loader.add("viking", "images/viking.png");
app.loader.load(doneLoading);


// feedback system to report on progress, loading and errors.
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
}

function fireBullet(e) {
  console.log("FIRE!");

  let bullet = createBullet();
  bullets.push(bullet);
}

function createBullet() {
  let bullet = new PIXI.Sprite.from("images/bullet.png");
  bullet.anchor.set(0.5);
  bullet.x = player.x;
  bullet.y = player.y;
  bullets = [];
  bullet.speed = 10;
  app.stage.addChild(bullet);

  return bullet;
}


function updateBullets(delta) {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].position.y -= bullets[i].speed;

    if (bullets[i].position.y < 0) {
      bullets[i].dead = true;
    }
  }

  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].dead) {
      app.stage.removeChild(bullets[i]);
      bullets.splice(i, 1);
    }
  }


}

function gameLoop(delta) {
  updateBullets(delta);

}

// Implementing keyboard movement and setting a speed for the sprite.
function gameLoop(delta) {
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

function doneLoading(e) {
  createPlayerSheet();
  createPlayer();
  app.ticker.add(gameLoop);
}

// preloading the image used for the spritesheet.
function createPlayerSheet() {
  let ssheet = new PIXI.BaseTexture.from(
    app.loader.resources["viking"].url
  );
  let w = 26;
  let h = 36;

  // creating frames for the sprite
  playerSheet["standSouth"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
  ];

  playerSheet["standWest"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
  ];
  playerSheet["standEast"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
  ];
  playerSheet["standNorth"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
  ];

  playerSheet["walkSouth"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
  ];
  playerSheet["walkWest"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h)),
  ];
  playerSheet["walkEast"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0, w, h)),
  ];
  playerSheet["walkNorth"] = [
    new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
    new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h)),
  ];
}

// creating a player for my sprite.
function createPlayer() {
  player = new PIXI.AnimatedSprite(playerSheet.walkSouth);
  player.anchor.set(0.5);
  player.animationSpeed = 0.18;
  player.loop = false;
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;
  app.stage.addChild(player);
  player.play();
}


// kb interactivity
function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

function gameLoop() {
  keysDiv.innerHTML = JSON.stringify(keys);

  //w
  if (keys["87"]) {
    if (!player.playing) {
      player.textures = playerSheet.walkNorth;
      player.play();
    }
    player.y -= speed;
  }
  //a
  if (keys["65"]) {
    if (!player.playing) {
      player.textures = playerSheet.walkWest;
      player.play();
    }
    player.x -= speed;
  }
  //s
  if (keys["83"]) {
    if (!player.playing) {
      player.textures = playerSheet.walkSouth;
      player.play();
    }
    player.y += speed;
  }
  //d
  if (keys["68"]) {
    if (!player.playing) {
      player.textures = playerSheet.walkEast;
      player.play();
    }
    player.x += speed;
  }
}
