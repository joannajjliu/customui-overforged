import React, { useEffect, useState, useRef, useCallback } from "react";
// import { invoke } from "@forge/bridge";
import Canvas from "./Canvas";
import background from "./assets/background.png";
import characters from "./assets/Characters_MV.png";

const backgroundImg = new Image();
backgroundImg.src = background;

const playerSprite = new Image();
playerSprite.src = characters;

const keys = [];

const player = {
  x: 0,
  y: 0,
  width: 48,
  height: 96,
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false,
};

const movePlayer = () => {
  if (keys["ArrowUp"] && player.y > 100) {
    player.y -= player.speed;
  }
};

const drawSprite = ({ ctx, img, sX, sY, sW, sH, dX, dY, dW, dH }) => {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};

const draw = (ctx, frameCount) => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // ctx.fillStyle = "#000000";
  // ctx.beginPath();
  // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  ctx.fill();

  backgroundImg.onload = () => {
    ctx.drawImage(backgroundImg, 0, 0, width, height);
    drawSprite({
      ctx,
      img: playerSprite,
      sX: 0,
      sY: 0,
      sW: player.width,
      sH: player.height,
      dX: 20 * Math.sin(frameCount * 0.05) ** 2,
      dY: player.y,
      dW: player.width,
      dH: player.height,
    });

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
      console.log("keys", keys, keys["ArrowUp"]);
    });

    window.addEventListener("keyup", (e) => {
      delete keys[e.key];
    });
  };

  console.log("player ", 20 * Math.sin(frameCount * 0.05) ** 2, player.y);
  movePlayer();
  // window.requestAnimationFrame(() => draw(ctx, frameCount));
};

function App() {
  useEffect(() => {
    movePlayer();
  }, [keys]);

  const [data, setData] = useState(null);

  //   useEffect(() => {
  //     invoke("getText", { example: "my-invoke-variable" }).then(setData);
  //   }, []);

  console.log("background", background);
  return (
    <div>
      {/* {data ? data : "Give me a minute..."} */}
      {/* <img src={background} /> */}
      <Canvas draw={draw} />
    </div>
  );
}

export default App;
