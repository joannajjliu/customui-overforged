import { useRef, useEffect } from "react";

import background from "./assets/background.png";
import characters from "./assets/Characters_MV.png";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx.canvas.width = 800;
    ctx.canvas.height = 500;

    let frameCount = 0;
    let animationFrameId: any;

    // draw(ctx, frameCount);
    // window.requestAnimationFrame(draw);

    const render = () => {
      // frameCount++;
      draw(ctx, frameCount);
      // animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
