// ScoreBoard
// This is my extra credit section that tracks wins, losses, and ties.

export default function ScoreBoard({ wins, losses, ties }) {
  return (
    <div className="scoreboard">
      <h2>Score Board</h2>
      <div className="score-grid" aria-label="Game score so far">
        <div className="score-item">
          <span className="score-label">Wins</span>
          <span className="score-value">{wins}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Losses</span>
          <span className="score-value">{losses}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Ties</span>
          <span className="score-value">{ties}</span>
        </div>
      </div>
    </div>
  );
}
