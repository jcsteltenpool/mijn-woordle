import React, { useState } from "react";
import GameContainer from "./components/GameContainer";
import GridContainer from "./components/GridContainer";
import Keyboard from "./components/KeyboardContainer";


export default function App() {
  const [flip, setFlip] = useState(false);

  const toggleFlip = () => {
    setFlip(!flip);
  }

  return (
    <>
      <GridContainer flip={flip}/>
      <button onClick={toggleFlip}>Test</button>
    </>
  );
}