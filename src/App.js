import React, { useState, useEffect, useRef } from "react";
import TitleBar from "./components/TitleBarContainer";
import Hint from "./components/Hint";
import Grid from "./components/GridContainer";
import Keyboard from "./components/KeyboardContainer";
import Modal from "./components/ModalContainer";
import { initialKeyboard } from "./util/keyboard_keys";
import { puzzle_words } from "./util/puzzle_words_5";
import PlayAgainContainer from "./components/PlayAgainContainer";
import CookieAlert from "./components/CookieAlert.js";

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

  const solution = useRef(randomPuzzleWord);
  const guess = guessArray.join('');

  // LOCAL STORAGE
  const [largeCharSize, setLargeCharSize] = useLocalStorage('largeCharSize', false);
  const [animations, setAnimations] = useLocalStorage('animations', true);
  // const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [highContrast, setHighContrast] = useLocalStorage('highContrast', false);
  const [total, setTotal] = useLocalStorage('totalGames', '0');
  const [gamesWon, setGamesWon] = useLocalStorage('gamesWon', '0');
  const [currentStreak, setCurrentStreak] = useLocalStorage('streak', '0');
  const [maxStreak, setMaxStreak] = useLocalStorage('maxStreak', '0');

  const statsInitial = [0, 0, 0, 0, 0, 0];
  const [stats, setStats] = useLocalStorage('stats', statsInitial);


  const incrementTotal = () => {
    let totalParseInt = parseInt(total);
    totalParseInt ++;
    setTotal(totalParseInt.toString());
  }

  const incrementGamesWon = () => {
    let gamesWonParseInt = parseInt(gamesWon);
    gamesWonParseInt ++;
    setGamesWon(gamesWonParseInt.toString());
  }

  const incrementCurrentStreak = () => {
    let currentStreakParseInt = parseInt(currentStreak);
    currentStreakParseInt ++;
    setCurrentStreak(currentStreakParseInt.toString());
  }

  const updateMaxStreak = () => {
    let currentStreakParseInt = parseInt(currentStreak);
    let maxStreakParseInt = parseInt(maxStreak);
    if (currentStreakParseInt >= maxStreakParseInt) {
      setMaxStreak((currentStreakParseInt + 1).toString());
    }
  }

  const resetCurrentStreak = () => {
    setCurrentStreak('0');    
  }

  const updateStatsDistribution = index => {
    let nextStats = [];

    for (let i = 0; i < stats.length; i++) {
      i === index
       ? nextStats.push(stats[i] += 1)
       : nextStats.push(stats[i]);
    }
    setStats(nextStats);
  }

  const clearStats = () => {
    setTotal('0');
    setGamesWon('0');
    setCurrentStreak('0');
    setMaxStreak('0');
    setStats(statsInitial);
  }

  // RESET GAME
  const startNewGame = () => {
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
      const handleKeyDown = e => {
        keyboard.forEach(key => {
          if (e.key === key.value) {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClick('Enter');
            } else {
              handleClick(e.key);
              setShowHint(false);
            } 
          }
        })
      }
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      }
    } else {
      const handleEscKey = e => {
        e.key === 'Escape' && setShowModal(false)
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
  
  const handleClick = keyValue => {
    switch(keyValue) {
      case 'Enter':
        handleEnter();
        break;
      case 'Backspace':
        handleBackspace();
        setShowHint(false);
        break;
      default:
        handleGuess(keyValue);
        setShowHint(false);
    }
  }
  
  const handleEnter = () => {
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
      if (animations) {
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
        }, animations ? (7 * animationTime) : 500);
      } else if (target === 30 && guess !== solution.current) {
        incrementTotal();
        resetCurrentStreak();
        setInProgress(false);
        setCurrentWin(null);
        setTimeout(() => {
          setModalContent('result');
          setShowModal(true);
          setShowKeyboard(false);
        }, animations ? (7 * animationTime) : 500);
      }
    }
  }

  const handleBackspace = () => {
    if (guessArray.length === 0) {
      return
    } else {
      setGrid(grid.map((tile, i) => 
        i === target - 1 
          ? {...tile, value: ''}
          :  tile  
      ));
      setGuessArray([...guessArray.slice(0, -1)]);
      setTarget(target - 1);
    }
  }

  const handleGuess = keyValue => {
    if (guessArray.length === 5) {
      return;
    } else {
      setGrid(grid.map((tile, i) => 
        i === target
          ? {...tile, value: keyValue}
          : tile
        ));
      setGuessArray([
        ...guessArray,
        keyValue
      ]);
      setTarget(target + 1);
    }
  }

  const evaluateGuess = () => {
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
      setGrid(gr => gr.map((tile, i) => 
        i === (target - 5) + index
          ? {...tile, result: result.status}
          : tile
      ));

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
      }, animations ? (5 * animationTime) : 0);
    });
  }

  const clearGuessArray = () => {
    setGuessArray([]);
  }

  // KEYBOARD ANIMATION
  const [tileToShow, setTileToShow] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const animationTime = 300;
  
  const showResult = () => {
    setTileToShow(target - 5);
    setTimeout(() => {
      setTileToShow(null);
    }, animations ? (5 * animationTime) : 1000);
  }
  
  useEffect(() => {
    const nextGrid = grid.map((tile, i) =>
      i === tileToShow
        ? {...tile, visible: true,}
        : tile
    );
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
      }, animations ? animationTime : 0)
      return () => clearInterval(intervalId);
    }
  }, [tileToShow, target, grid, animations]);

  const disableKeyboard = () => {
    setTimeout(() => {
      setDisabled(false);
    }, (5 * animationTime));
    setDisabled(true);
  }

  // MODAL
  const [showModal, setShowModal] = useState(true);
  const [modalContent, setModalContent] = useState('info');
  
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
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(mq.matches);

  useEffect(() => {
    const toggleDarkMode = () => {
      function updateSettings(value) {
        setSettings(s => s.map(setting =>
          setting.event === "toggleDarkMode"
          ? {...setting, toggled: value}
          : setting))
      }
      if (mq.matches) {
        setDarkMode(true);
        updateSettings(true);
      } else {
        setDarkMode(false);
        updateSettings(false);
      }
    }
    mq.addEventListener('change', toggleDarkMode);
    return() => mq.removeEventListener('change', toggleDarkMode);
  }, [mq])

  const [settings, setSettings] = useState([
    {id: 0, title: "Grotere toetsenbordletters", event: "toggleCharSize", toggled: largeCharSize},
    {id: 1, title: "Animaties", event: "toggleAnimations", toggled: animations},
    {id: 2, title: "Donker thema", event: "toggleDarkMode", toggled: darkMode},
    {id: 3, title: "Verhoogd contrast", event: "toggleHighContrast", toggled: highContrast}
  ]);
  
  const handleToggle = (id, event) => {
    const nextSettings = settings.map(setting => 
      setting.id === id
        ? {...setting, toggled: !setting.toggled}
        : setting
    );
      
    setSettings(nextSettings);

    switch(event) {
        case 'toggleCharSize':
          setLargeCharSize(!largeCharSize);
            break;
        case 'toggleAnimations':
          setAnimations(!animations);
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
                setModalContent={setModalContent} />
        <Hint hint={hint}
              showHint={showHint}
              setModalContent={setModalContent} />
        <Grid grid={grid}
              animations={animations} />
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
                guess={guess}
                solution={solution.current}
                currentWin={currentWin}
                clearStats={clearStats}
                inProgress={inProgress}
                isWon={isWon} />
        }
      </div>
      <CookieAlert setModalContent={setModalContent}/>
    </>
  );
}

