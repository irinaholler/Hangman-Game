import styles from "./Statistics.module.css";

interface StatisticsProps {
  perfectWins: number;
  totalWins: number;
  totalGames: number;
}

const Statistics = ({
  perfectWins,
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
          <span className={styles.statLabel}>Total Games</span>
          <span className={styles.statValue}>{totalGames}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Wins</span>
          <span className={styles.statValue}>{totalWins}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Errorless Wins</span>
          <span className={styles.statValue}>{perfectWins ?? 0}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Win Rate</span>
          <span className={styles.statValue}>{winRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
