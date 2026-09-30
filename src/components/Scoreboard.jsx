export default function Scoreboard({
  score,
  bestScore,
}) {
  return (
    <section
      className="scoreboard"
      aria-label="Game score"
    >
      <div className="score">
        <span>Current score</span>
        <strong>{score}</strong>
      </div>

      <div className="score">
        <span>Best score</span>
        <strong>{bestScore}</strong>
      </div>
    </section>
  );
}