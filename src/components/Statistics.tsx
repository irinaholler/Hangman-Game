import styles from "./Statistics.module.css";

interface StatisticsProps {
  streak: number;
  totalWins: number;
  totalGames: number;
}

const Statistics = ({
  streak,
  totalWins,
  totalGames,
}: StatisticsProps) => {
  const winRate =
    totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

  return (
    <div className={styles.statistics}>
      <h3 className={styles.title}>Game Statistics</h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Current</span>
          <span
            className={`${styles.statValue} ${
              streak >= 3 ? styles.highlight : ""
            }`}
          >
            {streak}
            {streak >= 3 && <span className={styles.streakBadge}>🔥</span>}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Games</span>
          <span className={styles.statValue}>{totalGames}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Wins</span>
          <span className={styles.statValue}>{totalWins}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Win Rate</span>
          <span className={styles.statValue}>{winRate}%</span>
        </div>
      </div>
      {streak >= 3 && (
        <div className={styles.streakMessage}>
          <span className={styles.streakEmoji}>🎉</span>
          <span className={styles.streakText}>Amazing streak!</span>
        </div>
      )}
    </div>
  );
};

export default Statistics;
