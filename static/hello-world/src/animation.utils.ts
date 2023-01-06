import background from "./assets/design/office-level.png";
import characters from "./assets/Characters_MV.png";

export const backgroundImg = new Image();
backgroundImg.src = background;

export const playerSprite = new Image();
playerSprite.src = characters;

export const keys = [];

export const player = {
  x: 200,
  y: 200,
  width: 48,
  height: 96,
  frameX: 0,
  frameY: 0,
  speed: 10,
  moving: false,
};

export const movePlayer = (ctx) => {
  if (keys["ArrowUp"]) {
    player.frameY = 3;
    if (player.y > 0) {
      player.y -= player.speed;
      player.moving = true;
    }
  }
  if (keys["ArrowDown"]) {
    player.frameY = 0;
    if (player.y < ctx.canvas.height - player.height) {
      player.y += player.speed;
      player.moving = true;
    }
  }
  if (keys["ArrowRight"]) {
    player.frameY = 2;
    if (player.x < ctx.canvas.width - player.width) {
      player.x += player.speed;
      player.moving = true;
    }
  }
  if (keys["ArrowLeft"]) {
    player.frameY = 1;
    if (player.x > 0) {
      player.x -= player.speed;
      player.moving = true;
    }
  }
};

export const handlePlayerFrame = () => {
  if (player.frameX < 2 && player.moving) {
    player.frameX++;
    console.log("player.frameX", player.frameX);
  } else player.frameX = 0;
};

export const drawSprite = ({ ctx, img, sX, sY, sW, sH, dX, dY, dW, dH }) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};
