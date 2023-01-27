import "./App.css";
import { Guess } from "./Guess";
import { useWordle } from "./wordle";

function App() {
  const [game, guess, valid] = useWordle();

  const emptyRows = Array(Math.max(0, game.guessesRemaining - 1))
    .fill(0)
    .map((_, idx) => (
      <Guess key={idx} word={"".padEnd(game.maxWordLength)} active={false} />
    ));

  return (
    <div className="app">
      {game.guesses.map((guess, idx) => (
        <Guess key={idx + guess} word={guess} score={game.scores[idx]} />
      ))}
      {game.guessesRemaining > 0 && (
        <Guess
          key="guess"
          active
          valid={valid}
          word={guess.padEnd(game.maxWordLength)}
        />
      )}
      {emptyRows}
    </div>
  );
}

export default App;
