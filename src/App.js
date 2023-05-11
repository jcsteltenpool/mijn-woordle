import React, { useState, useEffect } from "react";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { initialKeyboard } from "./util/keyboard_keys";

export default function App() {
  let initGrid = Array(6).fill(Array(5).fill(''));
  let initResults = Array(6).fill(Array(5).fill(''));
  let initVisible = Array(6).fill(Array(5).fill(false));
  let initTarget = { row: 0, tile: 0 };

  const [grid, setGrid] = useState(initGrid);
  const [results, setResults] = useState(initResults);
  const [visible, setVisible] = useState(initVisible);
  const [target, setTarget] = useState(initTarget);

  useEffect(() => {
    if (!disabled) {
      function handleKeyDown(e) {
        e.preventDefault();
        initialKeyboard.forEach(key => {
          if (e.key === key.value) {
            handleClick(e.key);
          }
        })
      }
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
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
      evaluateGuess(keyValue);
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
        showResult();
        disableKeyboard();
        showNextKeyboard();
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

  function evaluateGuess(keyValue){
    if (keyValue === 'e' || keyValue === 'x' || keyValue === 'o') {
      updateResults('correct');
      updateKeyboard(keyValue, 'correct');
    } else if (keyValue === 'k' || keyValue === 'q'){
      updateResults('present');
      updateKeyboard(keyValue, 'present');
    } else {
      updateResults('absent');
      updateKeyboard(keyValue, 'absent');
    }
  }

  function updateResults(status) {
    setResults(results.map((row, i) => {
      if (i === target.row) {
        return row.map((tile, i) => {
          if (i === target.tile) {
            return status;
          } else {
            return tile;
          }
        });  
      } else {
        return row;
      }
    }));
  }

  // KEYBOARD ANIMATION
  const [tileToShow, setTileToShow] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const animationTime = 350;
  
  function showResult() {
    setTileToShow(0);
  }
  
  useEffect(() => {
    const nextVisible = visible.map((row, i) => {
      if (i === target.row - 1) {
        return row.map((tile, i) => {
          if (i === tileToShow) {
            return true;
          } else {
            return tile;
          }
        });
      } else {
        return row;
      }
    });
    
    if (tileToShow === 0) {
      setVisible(nextVisible);
      setTileToShow(tileToShow + 1);
    }
    while (tileToShow >= 1 && tileToShow < 5) {
      const intervalId = setInterval(() => {
        setVisible(nextVisible);
        setTileToShow(tileToShow + 1);
      }, animationTime)
      return () => clearInterval(intervalId);
    }
  }, [tileToShow, target.row, visible])


  function disableKeyboard() {
    setTimeout(() => {
      setDisabled(false);
    }, (5 * animationTime))
    setDisabled(true);
  }

  // KEYBOARD UPDATE
  const [keyboard, setKeyboard] = useState(initialKeyboard);
  const [nextKeyboard, setNextKeyboard] = useState(keyboard);

  function updateKeyboard(keyValue, keyStatus) {
    setNextKeyboard(nextKeyboard.map(key => {
      if (key.value === keyValue) {
        if (key.status === 'correct') {
          return key;
        } else {
          return {
            ...key,
            status: keyStatus,
          };

        }
      } else {
        return key;
      }
    }));
  }

  function showNextKeyboard() {
    setTimeout(() => {
      setKeyboard(nextKeyboard);
    }, (5 * animationTime))
  }

  return (
    <>
      <GridContainer rows={grid}
                     results={results}
                     visible={visible}
                     />
      <KeyboardContainer onKeyboardClick={handleClick}
                         keyboard={keyboard}
                         disabled={disabled} />
    </>
  );
}

