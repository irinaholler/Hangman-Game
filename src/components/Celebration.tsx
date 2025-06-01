import { useEffect, useState } from 'react';
import styles from './Celebration.module.css';

interface CelebrationProps {
  isVisible: boolean;
}

const Celebration = ({ isVisible }: CelebrationProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; rotation: number; scale: number; color: string }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Create confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      }));
      setConfetti(particles);

      // Cleanup after animation
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.celebration}>
      <div className={styles.winnerText}>Winner!</div>
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className={styles.confetti}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
};

export default Celebration; 