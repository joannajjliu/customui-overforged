import React, { useEffect, useRef } from "react";
import {
  backgroundImg,
  drawSprite,
  handlePlayerFrame,
  keys,
  movePlayer,
  player,
  playerSprite,
} from "./animation.utils";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      startAnimation();
    }
  }, [canvasRef.current]);

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
      <button onClick={startAnimation}>Re-Start Canvas animation</button>
      <button onClick={stopAnimation}>Stop Canvas animation</button>

      <canvas ref={canvasRef} {...props} />
    </>
  );
};

export default Canvas;
