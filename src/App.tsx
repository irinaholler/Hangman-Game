// front
import { useState, useEffect } from "react";
import { words } from "./data/words";
import type { GameState, GameStatus } from "./types/game";
import Keyboard from "./components/Keyboard";
import Hangman from "./components/Hangman";
import Celebration from "./components/Celebration";
import StreakCelebration from "./components/StreakCelebration";
import Statistics from "./components/Statistics";
import styles from "./App.module.css";

const MAX_ATTEMPTS = 6;

function App() {
  const [gameState, setGameState] = useState<GameState>({
    word: "",
    guessedLetters: new Set<string>(),
    status: "playing",
    remainingAttempts: MAX_ATTEMPTS,
  });

  const [showInfo, setShowInfo] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [totalWins, setTotalWins] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [perfectWins, setPerfectWins] = useState(0);

  useEffect(() => {
    startNewGame();
    // Show info popup after 1 second
    const showTimer = setTimeout(() => {
      setShowInfo(true);
    }, 1000);

    // Hide info popup after 20 seconds
    const hideTimer = setTimeout(() => {
      setShowInfo(false);
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setGameState({
      word: randomWord,
      guessedLetters: new Set<string>(),
      status: "playing",
      remainingAttempts: MAX_ATTEMPTS,
    });
    setStreak(0);
    setShowStreakCelebration(false);
    setTotalGames((prev) => prev + 1);
  };

  const handleKeyPress = (letter: string) => {
    if (gameState.status !== "playing") return;

    const newGuessedLetters = new Set(gameState.guessedLetters);
    newGuessedLetters.add(letter);

    const isCorrectGuess = gameState.word.includes(letter);
    const newRemainingAttempts = isCorrectGuess
      ? gameState.remainingAttempts
      : gameState.remainingAttempts - 1;

    const isWordComplete = gameState.word
      .split("")
      .every((char) => newGuessedLetters.has(char));

    const newStatus: GameStatus = isWordComplete
      ? "won"
      : newRemainingAttempts === 0
      ? "lost"
      : "playing";

    if (newStatus === "won") {
      handleWin();
    } else if (newStatus === "lost") {
      handleLose();
    }

    setGameState({
      ...gameState,
      guessedLetters: newGuessedLetters,
      remainingAttempts: newRemainingAttempts,
      status: newStatus,
    });
  };

  const handleWin = () => {
    setGameState({
      ...gameState,
      status: "won",
    });
    setTotalWins((prev) => prev + 1);
    if (gameState.remainingAttempts === MAX_ATTEMPTS) {
      setPerfectWins((prev) => prev + 1);
    }
    setStreak((prev) => {
      const newStreak = prev + 1;
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      return newStreak;
    });
    if (streak + 1 >= 3) {
      setShowStreakCelebration(true);
    }
  };

  const handleLose = () => {
    setGameState({
      ...gameState,
      status: "lost",
    });
    setStreak(0);
    setShowStreakCelebration(false);
    setTotalGames((prev) => prev + 1);
  };

  const displayWord = gameState.word
    .split("")
    .map((letter) => (gameState.guessedLetters.has(letter) ? letter : "_"))
    .join(" ");

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Hangman</h1>
      <div className={styles.gameContainer}>
        <div className={styles.leftPanel}>
          <Statistics
            streak={streak}
            totalWins={totalWins}
            totalGames={totalGames}
            perfectWins={perfectWins}
          />
          {gameState.status === "playing" && (
            <div className={styles.attemptsContainer}>
              <div className={styles.attempts}>
                <span>Remaining attempts:</span>
                <span className={styles.attemptsNumber}>
                  {gameState.remainingAttempts}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.status}>
            {gameState.status === "won" && (
              <div className={styles.message}>
                <span className={styles.emoji}>🎉</span>
                Congratulations! You won!
              </div>
            )}
            {gameState.status === "lost" && (
              <div className={styles.message}>
                <span className={styles.emoji}>😢</span>
                Game Over! The word was: {gameState.word}
              </div>
            )}
          </div>
          <Hangman remainingAttempts={gameState.remainingAttempts} />
          <div className={styles.word}>{displayWord}</div>
          <Keyboard
            onKeyPress={handleKeyPress}
            guessedLetters={gameState.guessedLetters}
            disabled={gameState.status !== "playing"}
          />
          {gameState.status !== "playing" && (
            <button className={styles.newGameButton} onClick={startNewGame}>
              Play Again
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.infoPopup} ${!showInfo ? styles.hidden : ''}`}>
        <button className={styles.closeButton} onClick={() => setShowInfo(false)} aria-label="Close info popup">&times;</button>
        <h3>Game Information</h3>
        <p>This game features IT-related words. Try to guess the programming terms, technologies, and computer science concepts!</p>
      </div>
      {gameState.status === "won" && <Celebration isVisible={true} />}
      {showStreakCelebration && streak >= 3 && (
        <StreakCelebration streak={streak} isVisible={true} />
      )}
    </div>
  );
}

export default App;
