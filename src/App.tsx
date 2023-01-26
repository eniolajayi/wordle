import { useCallback, useEffect, useState } from "react";
import * as Wordle from "./wordle";
import "./App.css";
import { Guess } from "./Guess";
import words from "./words";

const isLetter = (char: string) => /^[a-z]$/.test(char);

const rand = (min = 0, max = words.length - 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};



function App() {
  const [game, guess, valid] = useWordle();

  const emptyRows = Array(Math.max(0, game.guessesRemaining - 1))
    .fill(0)
    .map((_, idx) => <Guess key={idx} word="" active={false} />);

  return (
    <div className="app">
      {game.guesses.map((guess, idx) => (
        <Guess key={idx + guess} word={guess} score={game.scores[idx]} />
      ))}
      {game.guessesRemaining > 0 ? <Guess word={guess} valid={valid} /> : null}
      {emptyRows}
      {game.guessesRemaining !== 0 ? null : (
        <div>
          <hr />
          <Guess word={game.answer} score={Array(4).fill("C")} />
        </div>
      )}
    </div>
  );
}

export default App;
