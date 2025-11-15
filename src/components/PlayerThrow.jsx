// PlayerThrow
// This component shows the three throws the player can pick from.
// I use buttons with images so it's mouse and keyboard friendly.

export default function PlayerThrow({
  choices,
  selectedChoice,
  onSelect,
  disabled,
}) {
  return (
    <section className="player-section">
      <h2>Your Throw</h2>
      <div className="choices-grid">
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            className={`choice-button ${
              selectedChoice === choice ? "choice-selected" : ""
            }`}
            onClick={() => onSelect(choice)}
            disabled={disabled}
          >
            <img
              src={`/images/${choice}.png`}
              alt={choice}
              className="choice-image"
            />
            <span className="choice-label">{choice}</span>
          </button>
        ))}
      </div>
      {disabled && (
        <p className="hint-text">
          The computer is thinking right now... I have to wait for it to stop
          shuffling.
        </p>
      )}
    </section>
  );
}
