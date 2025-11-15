// ResetButton
// I separated the reset into its own component so App stays a little cleaner.

export default function ResetButton({ onReset }) {
  return (
    <button type="button" className="reset-button" onClick={onReset}>
      Reset Game &amp; Score
    </button>
  );
}
