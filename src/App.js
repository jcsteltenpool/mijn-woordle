import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Hint from "./components/Hint";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { initialKeyboard } from "./util/keyboard_keys";
import { puzzle_words } from "./util/puzzle_words_5";

export default function App() {
  let initGrid = Array(6).fill(Array(5).fill(''));
  let initResults = Array(6).fill(Array(5).fill(''));
  let initTarget = { row: 0, tile: 0 };
  let randomPuzzleWord = puzzle_words[Math.floor(Math.random() * puzzle_words.length)]

  const [solution, setSolution] = useState('kater'); //Replace for randomPuzzleWord
  const [grid, setGrid] = useState(initGrid);
  const [results, setResults] = useState(initResults);
  const [target, setTarget] = useState(initTarget);
  const [hint, setHint] = useState('');
  
  let currentGuess = grid[target.row].join('');

  useEffect(() => {
    if (!disabled) {
      function handleKeyDown(e) {
        e.preventDefault();
        keyboard.forEach(key => {
          if (e.key === key.value && e.key !== 'Enter') {
            handleClick(e.key);
            setHint('');
          } else if (e.key === key.value) {
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

  useEffect(() => {
    if (hint.length > 0) {
      const timeoutId = setTimeout(() => {
        setHint('');
      }, 5500);
      return () => {clearTimeout(timeoutId)};
    }
  }, [hint]);
  
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
    if (currentGuess.length < 5) {
      setHint('Woorden moeten 5 letters lang zijn.');
    } else if (puzzle_words.indexOf(currentGuess) === -1) {
      setHint('Dit woord staat niet in de lijst.');
    } else {
      showResult();
      disableKeyboard();
      showNextKeyboard();
      updateTargetRow();
      if (currentGuess === solution) {
        setTimeout(() => {
          alert(`Gefeliciteerd, het woord was inderdaad ${solution}!`);
        }, (7 * animationTime));
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
  let initVisible = Array(6).fill(Array(5).fill(false));

  const [visible, setVisible] = useState(initVisible);
  const [tileToShow, setTileToShow] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const animationTime = 350;
  
  function showResult() {
    setTileToShow(0);
  }
  
  useEffect(() => {
    const nextVisible = visible.map((row, i) => {
      if (i  === target.row) {
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

  function updateTargetRow() {
    if (target.row === 5) {
      return;
    }
    setTimeout(() => {
      setTarget({ row: target.row + 1, tile: 0 });
    }, (5 * animationTime));
  }

  function disableKeyboard() {
    setTimeout(() => {
      setDisabled(false);
    }, (5 * animationTime));
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
      <Menu />
      <Hint hint={hint} />
      <GridContainer rows={grid}
                     results={results}
                     visible={visible}
                     />
      {/* <p>{currentGuess}</p> */}
      {/* <button onClick={() => setSolution(randomPuzzleWord)}>Click</button> */}
      <KeyboardContainer onKeyboardClick={handleClick}
                         keyboard={keyboard}
                         disabled={disabled} />
    </>
  );
}

