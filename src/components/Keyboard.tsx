import type { KeyboardProps } from '../types/game';
import styles from './Keyboard.module.css';

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, guessedLetters, disabled }) => {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className={styles.keyboard}>
      {keys.map((key) => {
        const isGuessed = guessedLetters.has(key);
        return (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            disabled={isGuessed || disabled}
            className={`${styles.key} ${isGuessed ? styles.guessed : ''}`}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard; 