import React from 'react';
import type { HangmanProps } from '../types/game';
import styles from './Hangman.module.css';

const Hangman: React.FC<HangmanProps> = ({ remainingAttempts }) => {
  return (
    <div className={styles.hangman}>
      <div className={styles.figure}>
        {/* Base */}
        <div className={styles.base}></div>
        {/* Vertical pole */}
        <div className={styles.pole}></div>
        {/* Top beam */}
        <div className={styles.beam}></div>
        {/* Rope */}
        <div className={styles.rope}></div>
        {/* Head */}
        {remainingAttempts < 6 && <div className={styles.head}></div>}
        {/* Body */}
        {remainingAttempts < 5 && <div className={styles.body}></div>}
        {/* Left arm */}
        {remainingAttempts < 4 && <div className={styles.leftArm}></div>}
        {/* Right arm */}
        {remainingAttempts < 3 && <div className={styles.rightArm}></div>}
        {/* Left leg */}
        {remainingAttempts < 2 && <div className={styles.leftLeg}></div>}
        {/* Right leg */}
        {remainingAttempts < 1 && <div className={styles.rightLeg}></div>}
      </div>
    </div>
  );
};

export default Hangman; 