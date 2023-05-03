import React, { useState } from "react";
import GameContainer from "./components/GameContainer";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";


export default function App() {
  const [isEvaluated, setIsEvaluated] = useState(false);

  return (
    <>
      <button onClick={() => setIsEvaluated(!isEvaluated)}>Test</button>
      <GridContainer isEvaluated={isEvaluated} />
      <KeyboardContainer />
    </>
  );
}