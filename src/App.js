import React, { useState, useEffect } from "react";
import GameContainer from "./components/GameContainer";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { KEYBOARD_KEYS } from "./util/keyboard_keys";



export default function App() {
  let initGrid = Array(6).fill(Array(5).fill(''));
  let initResults = Array(6).fill(Array(5).fill(''));
  let initVisible = Array(6).fill(Array(5).fill(false));
  let initTarget = { row: 0, tile: 0 };

  const [isEvaluated, setIsEvaluated] = useState(false);
  const [grid, setGrid] = useState(initGrid);
  const [results, setResults] = useState(initResults);
  const [visible, setVisible] = useState(initVisible);
  const [target, setTarget] = useState(initTarget);
  

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
    if (keyValue === 'e' || keyValue === 'a' || keyValue === 'o') {
      setResults(results.map((row, i) => {
        if (i === target.row) {
          return row.map((tile, i) => {
            if (i === target.tile) {
              return 'correct';
            } else {
              return tile;
            }
          });  
        } else {
          return row;
        }
      }))
    } else if (keyValue === 'k' || keyValue === 'r'){
      setResults(results.map((row, i) => {
        if (i === target.row) {
          return row.map((tile, i) => {
            if (i === target.tile) {
              return 'present';
            } else {
              return tile;
            }
          });  
        } else {
          return row;
        }
      }))
    } else {
      setResults(results.map((row, i) => {
        if (i === target.row) {
          return row.map((tile, i) => {
            if (i === target.tile) {
              return 'absent';
            } else {
              return tile;
            }
          });  
        } else {
          return row;
        }
      }));
    }
  }

  const [tileToShow, setTileToShow] = useState(null);
  
  function showResult() {
    setTileToShow(0);
  }

  useEffect(() => {
    if (tileToShow === 0) {
      setVisible(visible.map((row, i) => {
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
      })
      );
      setTileToShow(1);
    }
    while (tileToShow >= 1 && tileToShow < 5) {
      const intervalId = setInterval(() => {
        setVisible(visible.map((row, i) => {
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
        })
        );
        setTileToShow(tileToShow + 1);
      }, 350)
      return () => clearInterval(intervalId);
    }
  }, [tileToShow, target.row, visible])

  // function showResult() {
  //   const nextVisible = visible.map((row, i) => {
  //     if (i === target.row) {
  //       return row.map((tile, i) => {
  //         if (i === tileToShow) {
  //           return true;
  //         } else {
  //           return tile;
  //         }
  //       });
  //     } else {
  //       return row;
  //     }
  //   })

  //   setVisible(nextVisible);
  // }

  return (
    <>
      <button onClick={() => setIsEvaluated(!isEvaluated)}>Test</button>
      <GridContainer rows={grid}
                     results={results}
                     visible={visible}
                     />
      <KeyboardContainer onKeyboardClick={handleClick}/>
    </>
  );
}