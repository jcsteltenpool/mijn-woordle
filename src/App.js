import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import Hint from "./components/Hint";
import GridContainer from "./components/GridContainer";
import KeyboardContainer from "./components/KeyboardContainer";
import { initialKeyboard } from "./util/keyboard_keys";
import { puzzle_words } from "./util/puzzle_words_5";

export default function App() {
  let initialGrid = Array(30).fill({ value: "", result: "", visible: false })
  let randomPuzzleWord = puzzle_words[Math.floor(Math.random() * puzzle_words.length)]

  const [grid, setGrid] = useState(initialGrid);
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState([]);
  const [hint, setHint] = useState('');
  const [solution, setSolution] = useState('kater'); //Replace for randomPuzzleWord
  
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
  
  function handleEnter() {
    let guessString = guess.join('');
    if (guess.length < 5) {
      setHint('Woorden moeten 5 letters lang zijn.');
    } else if (puzzle_words.indexOf(guessString) === -1) {
      setHint('Dit woord staat niet in de lijst.');
    } else {
      showResult();
      disableKeyboard();
      showNextKeyboard();
      clearGuess();
      if (guessString === solution) {
        setTimeout(() => {
          alert(`Gefeliciteerd, het woord was inderdaad ${solution}!`);
        }, (7 * animationTime));
      }
      if (target === 30 && guessString !== solution) {
        setTimeout(() => {
          alert("Jammer joh, loser!");        
        }, (7 * animationTime));
      }
    }
  }

  function handleBackspace() {
    if (guess.length === 0) {
      return
    } else {
      setGrid(grid.map((tile, i) => {
        if (i === target - 1) {
          return {
            ...tile,
            value: '',
          }
        } else {
          return tile;
        }
      }));
      setGuess([...guess.slice(0, -1)]);
      setTarget(target - 1);
    }
  }

  function handleGuess(keyValue) {
    if (keyValue === 'e' || keyValue === 'x' || keyValue === 'o') {
      updateGrid(keyValue, 'correct');
      updateKeyboard(keyValue, 'correct');
    } else if (keyValue === 'k' || keyValue === 'q'){
      updateGrid(keyValue, 'present');
      updateKeyboard(keyValue, 'present');
    } else {
      updateGrid(keyValue, 'absent');
      updateKeyboard(keyValue, 'absent');
    }
  }

  function updateGrid(keyValue, result) {
    if (guess.length === 5) {
      return;
    } else {
      setGrid(grid.map((tile, i) => {
        if (i === target) {
          return {
            ...tile,
            value: keyValue,
            result: result,
          };
        } else {
          return tile;
        }
      }));
      setGuess([
        ...guess,
        keyValue
      ]);
      setTarget(target + 1);
    }
  }

  function clearGuess() {
    setGuess([]);
  }

  // KEYBOARD ANIMATION
  const [tileToShow, setTileToShow] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const animationTime = 350;
  
  function showResult() {
    setTileToShow(target - 5);
    setTimeout(() => {
      setTileToShow(null);
    }, (5 * animationTime))
  }
  
  useEffect(() => {
    const nextGrid = grid.map((tile, i) => {
      if (i === tileToShow) {
        return {
          ...tile,
          visible: true,
        }
      } else {
        return tile;
      }
    });
    if (tileToShow === null) {
      return;
    } else if (tileToShow === target - 5) {
      setGrid(nextGrid);
      setTileToShow(tileToShow + 1);
    }
    while (tileToShow > target - 6 && tileToShow < target) {
      const intervalId = setInterval(() => {
        setGrid(nextGrid);
        setTileToShow(tileToShow + 1);
      }, animationTime)
      return () => clearInterval(intervalId);
    }
  }, [tileToShow, target, grid]);

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
      <GridContainer grid={grid}/>
      <KeyboardContainer onKeyboardClick={handleClick}
                         keyboard={keyboard}
                         disabled={disabled} />
    </>
  );
}

