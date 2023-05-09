import React, { useState, useEffect } from "react";
import GameContainer from "./components/GameContainer";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { KEYBOARD_KEYS } from "./util/keyboard_keys";



export default function App() {
  let initialGrid = Array(6).fill(Array(5).fill(''));
  let initialTarget = { row: 0, tile: 0 };

  const [isEvaluated, setIsEvaluated] = useState(false);
  const [grid, setGrid] = useState(initialGrid);
  const [target, setTarget] = useState(initialTarget);
  
  const [result, setResult] = useState(Array(5).fill(null));

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();
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
      handleEnter();
    } else if (keyValue === 'Backspace') {
      handleBackspace();
    } else {
      handleGuess(keyValue);
    }
  }

  function handleGuess(keyValue) {
    if (target.tile === 5) {
      return;
    } else {
      setGrid(grid.map((row, i) => {
        if (i === target.row) {
          return row.map((tile, i) => {
            if (i === target.tile) {
              return keyValue;
            } else {
              return tile;
            }
          })  
        } else {
          return row;
        }
      }))
      setTarget({
        ...target,
        tile: target.tile + 1
      });
    }
  }
  
  function handleEnter() {
    if (target.tile < 5) {
      alert('Het woord is te kort');
    } else {
      if (target.row > 5) {
        return;
      } else {
        setTarget({ 
          row: target.row + 1, 
          tile: 0
        })
      }
    }
  }

  function handleBackspace() {
    if (target.tile === 0) {
      return
    } else {
      setGrid(grid.map((row, i) => {
        if (i === target.row) {
          return row.map((tile, i) => {
            if (i === target.tile - 1) {
              return '';
            } else {
              return tile;
            }
          })  
        } else {
          return row;
        }
      }))
      setTarget({
        ...target,
        tile: target.tile - 1
      });
    }
  }

  return (
    <>
      <button onClick={() => setIsEvaluated(!isEvaluated)}>Test</button>
      <GridContainer isEvaluated={isEvaluated}
                     rows={grid}
                     />
      <KeyboardContainer onKeyboardClick={handleClick}/>
    </>
  );
}