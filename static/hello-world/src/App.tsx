// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from "react";
import { invoke } from "@forge/bridge";
import Canvas from "./Canvas";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable" }).then(setData);
  }, []);

  return (
    <div>
      {data ? data : "Give me a minute..."}
      <Canvas />
    </div>
  );
}

export default App;
