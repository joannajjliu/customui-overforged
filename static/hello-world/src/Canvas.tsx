import React, { useEffect, useRef } from "react";
import background from "./assets/background.png";
import characters from "./assets/Characters_MV.png";

const backgroundImg = new Image();
backgroundImg.src = background;

const playerSprite = new Image();
playerSprite.src = characters;

const keys = [];

const player = {
  x: 200,
  y: 200,
  width: 48,
  height: 96,
  frameX: 0,
  frameY: 0,
  speed: 10,
  moving: false,
};

const movePlayer = (ctx) => {
  if (keys["ArrowUp"] && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys["ArrowDown"] && player.y < ctx.canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys["ArrowRight"] && player.x < ctx.canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
};

const handlePlayerFrame = () => {
  if (player.frameX < 2 && player.moving) {
    player.frameX++;
    console.log("player.frameX", player.frameX);
  } else player.frameX = 0;
};

const drawSprite = ({ ctx, img, sX, sY, sW, sH, dX, dY, dW, dH }) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

const Canvas = (props) => {
  const canvasRef = useRef(null);

  let requestID;
  const startAnimation = () => {
    let fpsInterval, now, then, elapsed;

    // Animation using requestAnimationFrame
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
      player.moving = true;
    });

    window.addEventListener("keyup", (e) => {
      delete keys[e.key];
      player.moving = false;
    });

    const startAnimating = (fps: number) => {
      fpsInterval = 1000 / fps;
      then = Date.now();
      animate();
    };

    function animate() {
      requestID = requestAnimationFrame(animate);
      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.drawImage(backgroundImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
        drawSprite({
          ctx,
          img: playerSprite,
          sX: player.width * player.frameX,
          sY: player.height * player.frameY,
          sW: player.width,
          sH: player.height,
          dX: player.x,
          dY: player.y,
          dW: player.width,
          dH: player.height,
        });

        movePlayer(ctx);
        handlePlayerFrame();
      }
    }
    startAnimating(15);
  };

  const stopAnimation = () => cancelAnimationFrame(requestID);

  return (
    <>
      <button onClick={startAnimation}>Start Canvas animation</button>
      <button onClick={stopAnimation}>Stop Canvas animation</button>

      <canvas ref={canvasRef} {...props} />
    </>
  );
};

export default Canvas;
