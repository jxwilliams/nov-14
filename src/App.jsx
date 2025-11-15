

// Rock, Paper, Scissors X React
// In this file I wire together all my components and control the main game state.

import { useState, useEffect } from "react";
import PlayerThrow from "./components/PlayerThrow.jsx";
import ComputerThrow from "./components/ComputerThrow.jsx";
import ResultDisplay from "./components/ResultDisplay.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import ResetButton from "./components/ResetButton.jsx";

const CHOICES = ["rock", "paper", "scissors"];

export default function App() {
  // I keep track of what I clicked for this round.
  const [playerChoice, setPlayerChoice] = useState(null);
  // This is what the computer ends up throwing.
  const [computerChoice, setComputerChoice] = useState(null);
  // This string tells me if I won, lost, or tied.
  const [result, setResult] = useState("");
  // This flag lets me know when the computer is in the "shuffling" animation.
  const [isShuffling, setIsShuffling] = useState(false);
  // I use this interval id so I can stop the shuffle later.
  const [shuffleId, setShuffleId] = useState(null);

  // Here I track the score across multiple rounds (extra credit).
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);

  // I clean up any old interval if the component unmounts.
  useEffect(() => {
    return () => {
      if (shuffleId) {
        clearInterval(shuffleId);
      }
    };
  }, [shuffleId]);

  function handlePlayerSelect(choice) {
    // If the computer is still shuffling, I just ignore new clicks so I don't break the animation.
    if (isShuffling) return;

    setPlayerChoice(choice);
    setResult("");
    startComputerShuffle(choice);
  }

  function startComputerShuffle(playerChoiceLocal) {
    setIsShuffling(true);

    // I start with a quick cycling of the three choices every 500ms.
    let i = 0;
    const id = setInterval(() => {
      // This just cycles rock -> paper -> scissors visually.
      const currentChoice = CHOICES[i % CHOICES.length];
      setComputerChoice(currentChoice);
      i++;
    }, 500);

    setShuffleId(id);

    // After 3 seconds the computer stops and picks a final random throw.
    setTimeout(() => {
      clearInterval(id);
      setShuffleId(null);

      const finalChoice =
        CHOICES[Math.floor(Math.random() * CHOICES.length)];
      setComputerChoice(finalChoice);
      setIsShuffling(false);
      decideWinner(playerChoiceLocal, finalChoice);
    }, 3000);
  }

  function decideWinner(player, computer) {
    // I double-check that both choices exist before checking the logic.
    if (!player || !computer) return;

    // This covers all 9 possibilities with simple if/else instead of anything fancy.
    if (player === computer) {
      setResult("Tie! We picked the same thing.");
      setTies((t) => t + 1);
      return;
    }

    const playerWins =
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper");

    if (playerWins) {
      setResult("Nice! You win this round.");
      setWins((w) => w + 1);
    } else {
      setResult("Ouch, you lost this one.");
      setLosses((l) => l + 1);
    }
  }

  function handleReset() {
    // When I reset, I clear everything so it feels like a fresh game.
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setWins(0);
    setLosses(0);
    setTies(0);
    setIsShuffling(false);

    if (shuffleId) {
      clearInterval(shuffleId);
      setShuffleId(null);
    }
  }

  return (
    <main className="app-wrapper">
      <header className="app-header">
        <h1>Rock, Paper, Scissors X React</h1>
        <p>
          I click a throw below, the computer shuffles for a second, and then
          the winner is shown.
        </p>
      </header>

      <section className="game-sections" aria-label="Rock Paper Scissors game">
        <PlayerThrow
          choices={CHOICES}
          selectedChoice={playerChoice}
          onSelect={handlePlayerSelect}
          disabled={isShuffling}
        />

        <ComputerThrow
          computerChoice={computerChoice}
          isShuffling={isShuffling}
        />
      </section>

      <section className="result-section" aria-live="polite">
        <ResultDisplay result={result} />
      </section>

      <section className="score-section">
        <ScoreBoard wins={wins} losses={losses} ties={ties} />
        <ResetButton onReset={handleReset} />
      </section>
    </main>
  );
}
