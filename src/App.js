import React, { useState } from "react";
import GameContainer from "./components/GameContainer";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";


export default function App() {
  const [isEvaluated, setIsEvaluated] = useState(false);

  return (
    <>
      <GridContainer isEvaluated={isEvaluated} />
      <button onClick={() => setIsEvaluated(!isEvaluated)}>Test</button>
      <KeyboardContainer />
    </>
  );
}