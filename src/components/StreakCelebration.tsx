import { useEffect, useState } from 'react';
import styles from './StreakCelebration.module.css';

interface StreakCelebrationProps {
  streak: number;
  isVisible: boolean;
}

const messages = [
  {
    text: "Three in a Row! You're on Fire! 🔥",
    subtext: "Keep that winning streak alive!",
    emoji: "🎉"
  },
  {
    text: "Hat Trick Hero! 🏆",
    subtext: "You've guessed 3 words straight—can you make it 4?",
    emoji: "🚀"
  },
  {
    text: "Triple Triumph! ⭐",
    subtext: "You're unstoppable! Keep guessing!",
    emoji: "🌟"
  },
  {
    text: "Streak Alert: 3 Wins Strong! 💪",
    subtext: "Dare to continue the streak?",
    emoji: "🏆"
  },
  {
    text: "Lucky Three! 🍀",
    subtext: "Or is it pure skill? Keep guessing to prove it!",
    emoji: "✨"
  }
];

const StreakCelebration = ({ streak, isVisible }: StreakCelebrationProps) => {
  const [showStreak, setShowStreak] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (isVisible && streak >= 3) {
      setShowStreak(true);
      // Rotate through messages every 3 seconds
      const messageInterval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 3000);

      return () => clearInterval(messageInterval);
    } else {
      setShowStreak(false);
    }
  }, [isVisible, streak]);

  if (!showStreak) return null;

  const message = messages[currentMessage];

  return (
    <div className={styles.streakCelebration}>
      <div className={styles.streakContainer}>
        <div className={styles.streakBadge}>
          <span className={styles.streakNumber}>{streak}</span>
          <span className={styles.streakLabel}>STREAK</span>
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.emoji}>{message.emoji}</div>
          <h2 className={styles.message}>{message.text}</h2>
          <p className={styles.subtext}>{message.subtext}</p>
        </div>
      </div>
      <div className={styles.fireworks}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.firework} style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
};

export default StreakCelebration; 