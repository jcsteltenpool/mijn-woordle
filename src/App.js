import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./components/TitleBarContainer";
import Hint from "./components/Hint";
import Grid from "./components/GridContainer";
import Keyboard from "./components/KeyboardContainer";
import Modal from "./components/ModalContainer";
import { initialKeyboard } from "./util/keyboard_keys";
import { puzzle_words } from "./util/puzzle_words_5";
import PlayAgainContainer from "./components/PlayAgainContainer";

const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default function App() {
  let initialGrid = Array(30).fill({ value: "", result: "", visible: false })
  let randomPuzzleWord = puzzle_words[Math.floor(Math.random() * puzzle_words.length)]

  const [grid, setGrid] = useState(initialGrid);
  const [keyboard, setKeyboard] = useState(initialKeyboard);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [target, setTarget] = useState(0);
  const [guessArray, setGuessArray] = useState([]);
  const [hint, setHint] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [isWon, setIsWon] = useState(false);
  const [currentWin, setCurrentWin] = useState(null);

  const [largeCharSize, setLargeCharSize] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const solution = useRef(randomPuzzleWord);
  console.log(solution);

  // LOCAL STORAGE
  const [total, setTotal] = useLocalStorage('totalGames', '0');
  const [gamesWon, setGamesWon] = useLocalStorage('gamesWon', '0');
  const [currentStreak, setCurrentStreak] = useLocalStorage('streak', '0');
  const [maxStreak, setMaxStreak] = useLocalStorage('maxStreak', '0');

  const statsInitial = [0, 0, 0, 0, 0, 0];
  const [stats, setStats] = useLocalStorage('stats', statsInitial);


  function incrementTotal() {
    let totalParseInt = parseInt(total);
    totalParseInt ++;
    setTotal(totalParseInt.toString());
  }

  function incrementGamesWon() {
    let gamesWonParseInt = parseInt(gamesWon);
    gamesWonParseInt ++;
    setGamesWon(gamesWonParseInt.toString());
  }

  function incrementCurrentStreak() {
    let currentStreakParseInt = parseInt(currentStreak);
    currentStreakParseInt ++;
    setCurrentStreak(currentStreakParseInt.toString());
  }

  function updateMaxStreak() {
    let currentStreakParseInt = parseInt(currentStreak);
    let maxStreakParseInt = parseInt(maxStreak);
    if (currentStreakParseInt >= maxStreakParseInt) {
      setMaxStreak((currentStreakParseInt + 1).toString());
    }
  }

  function resetCurrentStreak() {
    setCurrentStreak('0');    
  }

  function updateStatsDistribution(index) {
    let nextStats = [];

    for (let i = 0; i < stats.length; i++) {
      if (i === index) {
        nextStats.push(stats[i] += 1);
      } else {
        nextStats.push(stats[i]);
      }
    }
    setStats(nextStats);
  }

  function clearStats() {
    setTotal('0');
    setGamesWon('0');
    setCurrentStreak('0');
    setMaxStreak('0');
    setStats(statsInitial);
  }


  // RESET GAME
  function startNewGame() {
    setGrid(initialGrid);
    setKeyboard(initialKeyboard);
    setShowKeyboard(true);
    setTarget(0);
    setShowModal(false);
    setTimeout(() => {
      solution.current = randomPuzzleWord;
      setIsWon(false);
      setInProgress(true);
      setCurrentWin(null);
    }, 500);
  }


  // PLAY GAME
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
    } else {
      function handleEscKey(e) {
        if (e.key === 'Escape') {
          setShowModal(false);
        } else {
          return;
        }
      }
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      }
    }
  });
  
  useEffect(() => {
    if (showHint) {
      const timeoutId = setTimeout(() => {
        setShowHint(false);
      }, 5000);
      return () => {clearTimeout(timeoutId)};
    } else {
      const timeoutId = setTimeout(() => {
        setHint(null);
      }, 500);
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
    const guess = guessArray.join('');

    if (guess.length < 5) {
      setHint('Woorden moeten 5 letters lang zijn.');
      setShowHint(true);
    } else if (puzzle_words.indexOf(guess) === -1) {
      setHint('Dit woord staat niet in de lijst.');
      setShowHint(true);
    } else {
      evaluateGuess();
      showResult();
      clearGuessArray();
      if (showAnimations) {
        disableKeyboard();
      }
      if (guess === solution.current) {
        let statIndex = (target / 5) - 1;
        incrementTotal();
        incrementGamesWon();
        incrementCurrentStreak();
        updateMaxStreak();
        updateStatsDistribution(statIndex);
        setCurrentWin(statIndex);
        setInProgress(false);
        setIsWon(true);
        setTimeout(() => {
          setModalContent('result');
          setShowModal(true);
          setShowKeyboard(false);
        }, showAnimations ? (7 * animationTime) : 500);
      } else if (target === 30 && guess !== solution.current) {
        incrementTotal();
        resetCurrentStreak();
        setInProgress(false);
        setCurrentWin(null);
        setTimeout(() => {
          setModalContent('result');
          setShowModal(true);
          setShowKeyboard(false);
        }, showAnimations ? (7 * animationTime) : 500);
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
    const solutionTemp = solution.current.split('');
    let resultArray = [];

    guessArray.forEach((guess, i) => {
      if (guess === solution.current.charAt(i)) {
        delete solutionTemp[solutionTemp.indexOf(guess)];
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
      }, showAnimations ? (5 * animationTime) : 0);
    });
  }

  function clearGuessArray() {
    setGuessArray([]);
  }

  // KEYBOARD ANIMATION
  const [tileToShow, setTileToShow] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const animationTime = 300;
  
  function showResult() {
    setTileToShow(target - 5);
    setTimeout(() => {
      setTileToShow(null);
    }, showAnimations ? (5 * animationTime) : 1000);
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
      }, showAnimations ? animationTime : 0)
      return () => clearInterval(intervalId);
    }
  }, [tileToShow, target, grid, showAnimations]);

  function disableKeyboard() {
    setTimeout(() => {
      setDisabled(false);
    }, (5 * animationTime));
    setDisabled(true);
  }

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  
  useEffect(() => {
    if (modalContent) {
      setShowModal(true);
    }
  }, [modalContent]);
  
  useEffect(() => {
    if (showModal) {
      setDisabled(true);
    } else {
      !showKeyboard ? setDisabled(true) : setDisabled(false);
      const timeoutId = setTimeout(() => {
        setModalContent(null);
      }, 500);
      return () => {clearTimeout(timeoutId)};
    }
  }, [showModal, showKeyboard]);

  //SETTINGS
  const [settings, setSettings] = useState([
    {id: 0, title: "Grotere toetsenbordletters", event: "toggleCharSize", toggled: false},
    {id: 1, title: "Animaties", event: "toggleAnimations", toggled: true},
    {id: 2, title: "Donker thema", event: "toggleDarkMode", toggled: false},
    {id: 3, title: "Verhoogd contrast", event: "toggleHighContrast", toggled: false}
  ]);

  function handleToggle(id, event) {
    const nextSettings = settings.map(setting => {
        if (setting.id === id) {
            return {
                ...setting,
                toggled: !setting.toggled
            };
        } else {
            return setting;
        }
    })
    setSettings(nextSettings);

    switch(event) {
        case 'toggleCharSize':
          setLargeCharSize(!largeCharSize);
            break;
        case 'toggleAnimations':
          setShowAnimations(!showAnimations);
            break;
        case 'toggleDarkMode':
          setDarkMode(!darkMode);
            break;
        case 'toggleHighContrast':
          setHighContrast(!highContrast);
            break;
        default: return;
    }
  }

  return (
    <>
      <div className={`game-container ${darkMode ? "darkMode":""} ${highContrast ? "high-contrast":""}`}>
        <TitleBar setHint={setHint}
                setModalContent={setModalContent}/>
        <Hint hint={hint}
              showHint={showHint} />
        <Grid grid={grid}
              showAnimations={showAnimations} />
        {showKeyboard 
          ? <Keyboard onKeyboardClick={handleClick}
                    keyboard={keyboard}
                    largeCharSize={largeCharSize}
                    disabled={disabled} />
          : <PlayAgainContainer startNewGame={startNewGame}/>
        }
        {modalContent && 
          <Modal modalContent={modalContent}
                setModalContent={setModalContent}
                showKeyboard={showKeyboard}
                showModal={showModal}
                setShowModal={setShowModal}
                settings={settings}
                handleToggle={handleToggle}
                startNewGame={startNewGame}
                solution={solution.current}
                currentWin={currentWin}
                clearStats={clearStats}
                inProgress={inProgress}
                isWon={isWon} />
        }
      </div>
      <footer><p> </p></footer>
    </>
  );
}

