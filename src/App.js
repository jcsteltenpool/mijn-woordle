import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hint from "./components/Hint";
import Grid from "./components/GridContainer";
import Keyboard from "./components/KeyboardContainer";
import Modal from "./components/ModalContainer";
import { initialKeyboard } from "./util/keyboard_keys";
import { puzzle_words } from "./util/puzzle_words_5";

export default function App() {
  let initialGrid = Array(30).fill({ value: "", result: "", visible: false })
  let randomPuzzleWord = puzzle_words[Math.floor(Math.random() * puzzle_words.length)]

  const [grid, setGrid] = useState(initialGrid);
  const [keyboard, setKeyboard] = useState(initialKeyboard);
  const [target, setTarget] = useState(0);
  const [guessArray, setGuessArray] = useState([]);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);

  const [solution, setSolution] = useState(randomPuzzleWord);

  
  useEffect(() => {
    if (!disabled) {
      function handleKeyDown(e) {
          // e.preventDefault();
        keyboard.forEach(key => {
          if (e.key === key.value && e.key !== 'Enter') {
            handleClick(e.key);
            setShowHint(false);
          } else if (e.key === key.value) {
            handleClick(e.key);
          } 
        })
      }
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    } else if (disabled && modalContent !== null) {
      function handleEscKey(e) {
        if (e.key === 'Escape') {
          setShowModal(false);
        }
      }
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      }
    }
  });

  useEffect(() => {
    if (hint.length > 0) {
      setShowHint(true);
      const timeoutId = setTimeout(() => {
        setShowHint(false);
      }, 5000);
      return () => {clearTimeout(timeoutId)};
    } else {
      setShowHint(false);
    }
  }, [hint]);

  useEffect(() => {
    if(!showHint) {
      const timeoutId = setTimeout(() => {
        setHint('');
      }, 200);
      return () => {clearTimeout(timeoutId)};
    }
  }, [showHint]);
  
  function handleClick(keyValue) {
    if (keyValue === 'Enter') {
      handleEnter();
    } else if (keyValue === 'Backspace') {
      handleBackspace();
    } else {
      handleGuess(keyValue);
    }
  }
  
  function handleEnter() {
    const guessString = guessArray.join('');
    if (guessArray.length < 5) {
      setHint('Woorden moeten 5 letters lang zijn.');
    } else if (puzzle_words.indexOf(guessString) === -1) {
      setHint('Dit woord staat niet in de lijst.');
    } else {
      evaluateGuess();
      showResult();
      disableKeyboard();
      clearGuessArray();
      if (guessString === solution) {
        setTimeout(() => {
          alert(`Gefeliciteerd, het woord was inderdaad ${solution}! \n
                Je hebt het woord geraden in ${target/5} pogingen.`);
        }, (7 * animationTime));
      }
      if (target === 30 && guessString !== solution) {
        setTimeout(() => {
          alert(`Jammer! Het woord was ${solution}`);        
        }, (7 * animationTime));
      }
    }
  }

  function handleBackspace() {
    if (guessArray.length === 0) {
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
      setGuessArray([...guessArray.slice(0, -1)]);
      setTarget(target - 1);
    }
  }

  function handleGuess(keyValue) {
    if (guessArray.length === 5) {
      return;
    } else {
      setGrid(grid.map((tile, i) => {
        if (i === target) {
          return {
            ...tile,
            value: keyValue,
          };
        } else {
          return tile;
        }
      }));
      setGuessArray([
        ...guessArray,
        keyValue
      ]);
      setTarget(target + 1);
    }
  }

  function evaluateGuess() {
    const solutionTemp = solution.split('');
    let resultArray = [];

    guessArray.forEach((guess, i) => {
      if (guess === solution.charAt(i)) {
        delete solutionTemp[solutionTemp.indexOf(guess)];
        console.log(solutionTemp);
        resultArray.push({ value: guess, status: 'correct' });
      } else {
        resultArray.push({ value: guess, status: 'tbd' });
      }
    })

    resultArray.forEach((guess, i) => {
      if (guess.status === 'tbd') {
        if (solutionTemp.indexOf(guessArray[i]) !== -1) {
          delete solutionTemp[solutionTemp.indexOf(guessArray[i])];
          resultArray[i] = { ...guess, status: 'present' }; 
        } else {
          resultArray[i] = { ...guess, status: 'absent'};
        }
      }
    })

    resultArray.forEach((result, index) => {
      setGrid(gr => gr.map((tile, i) => {
        if (i === (target - 5) + index) {
          return {
            ...tile,
            result: result.status,
          }
        } else {
          return tile;
        }
      }));

      setTimeout(() => {
        setKeyboard(k => k.map(key => {
          if (key.value === result.value) {
            if (key.status === 'correct') {
              return key;
            } else if (result.status === 'absent' && key.status === 'present') {
              return key;
            } else {
              return {
                ...key,
                status: result.status,
              };
            }
          } else {
            return key;
          }
        }));
      }, (5 * animationTime));
    });
  }

  function clearGuessArray() {
    setGuessArray([]);
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

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (modalContent) {
      setShowModal(true);
    }
  }, [modalContent])
  
  useEffect(() => {
    if (showModal) {
      setDisabled(true);
    } else {
      setDisabled(false);
      const timeoutId = setTimeout(() => {
        console.log("setModalContent timeout " + timeoutId)
        setModalContent(null);
      }, 500);
      return () => {clearTimeout(timeoutId)};
    }
  }, [showModal]);

  return (
    <>
      <Header setHint={setHint}
              setModalContent={setModalContent}/>
      <Hint hint={hint}
            showHint={showHint} />
      <Grid grid={grid}/>
      <Keyboard onKeyboardClick={handleClick}
                         keyboard={keyboard}
                         disabled={disabled} />
      <Modal modalContent={modalContent}
             showModal={showModal}
             setShowModal={setShowModal}/>
    </>
  );
}

