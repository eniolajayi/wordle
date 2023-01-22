import * as Wordle from "./wordle";

type GuessProps = {
  word: string;
  score?: Wordle.GuessScore;
  active?: boolean;
  valid?: boolean;
};


export const Guess = ({ word, score, active, valid = true }: GuessProps) => {
  word = word.padEnd(4);
  return (
    <div
      className={[
        "guess",
        active ? "" : "inactive",
        valid ? "" : "invalid",
      ].join(" ")}
    >
      {word.split("").map((letter, idx) => {
        return (
          <div
            key={idx}
            className={["letter", score ? score[idx] : " "].join(" ")}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};
