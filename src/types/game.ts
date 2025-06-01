export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  word: string;
  guessedLetters: Set<string>;
  status: GameStatus;
  remainingAttempts: number;
}

export interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  guessedLetters: Set<string>;
  disabled: boolean;
}

export interface HangmanProps {
  remainingAttempts: number;
} 