import React, { useState, useEffect } from "react";
import GameContainer from "./components/GameContainer";
import Grid from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { KEYBOARD_KEYS } from "./util/keyboard_keys";



export default function App() {
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [guess, setGuess] = useState(Array(5).fill(null));
  const [tile, setTile] = useState(0);

  useEffect(() => {
    function handleKeyDown(e) {
      KEYBOARD_KEYS.forEach(key => {
        if (e.key === key) {
          handleClick(e.key);
        }
      })
    }
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });
  
  function handleClick(keyValue) {
    if (keyValue === 'Enter' ) {
      return
    } else if (keyValue === 'Backspace') {
      removeLastLetter();
    } else {
      handleNextGuess(keyValue);
    }
  }
  
  function handleNextGuess(keyValue) {
    if (tile === 5) {
      return
    } else {
      const nextGuess = guess.slice();
      nextGuess[tile] = keyValue;
      setGuess(nextGuess);
      const nextTile = tile + 1;
      setTile(nextTile);
    }
  }

  function removeLastLetter() {
    if (tile === 0) {
      return
    } else {
      const prevGuess = guess.slice();
      prevGuess[tile - 1] = null;
      setGuess(prevGuess);
      const prevTile = tile - 1;
      setTile(prevTile);
    }
  }

  return (
    <>
      <button onClick={() => setIsEvaluated(!isEvaluated)}>Test</button>
      <Grid isEvaluated={isEvaluated}
            guess={guess} />
      <p>Value: {guess.toString()}</p>
      <p>Target tile: {tile}</p>
      <KeyboardContainer onKeyboardClick={handleClick}/>
    </>
  );
}