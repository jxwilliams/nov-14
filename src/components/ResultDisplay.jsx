// ResultDisplay
// I keep this component small on purpose: it just shows the result message.

export default function ResultDisplay({ result }) {
  return (
    <div className="result-display">
      <h2>Round Result</h2>
      {result ? (
        <p className="result-text">{result}</p>
      ) : (
        <p className="result-text result-placeholder">
          No result yet. I need to pick rock, paper, or scissors to start a
          round.
        </p>
      )}
    </div>
  );
}
