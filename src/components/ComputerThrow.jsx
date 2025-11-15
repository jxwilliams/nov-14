// ComputerThrow
// This part is responsible for showing the computer's current throw.
// While shuffling, it reuses the same images but adds a simple animation class.

export default function ComputerThrow({ computerChoice, isShuffling }) {
  const imageSrc = computerChoice
    ? `/images/${computerChoice}.png`
    : "/images/question.png";

  const imageAlt = computerChoice
    ? `Computer chose ${computerChoice}`
    : "Computer has not chosen yet";

  return (
    <section className="computer-section">
      <h2>Computer Throw</h2>
      <div className="computer-image-wrapper">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`computer-image ${isShuffling ? "computer-shuffle" : ""}`}
        />
      </div>
      {isShuffling ? (
        <p className="hint-text">
          The computer is shuffling through rock, paper, and scissors...
        </p>
      ) : (
        <p className="hint-text">
          As soon as I click a throw, the computer will shuffle and reveal its
          move.
        </p>
      )}
    </section>
  );
}
