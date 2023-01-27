import * as Wordle from "./wordle";

type GuessProps = {
  word: string;
  score?: Wordle.GuessScore;
  active?: boolean;
  valid?: boolean;
};

export const Guess = ({ word, score, active, valid = true }: GuessProps) => {
  let classListStr;
  if (active) {
    if (valid) {
      classListStr = "guess";
    } else {
      classListStr = "guess invalid";
    }
  } else {
    classListStr = "guess inactive";
  }

  return (
    <div className={classListStr}>
      {word.split("").map((letter, idx) => {
        return (
          <div key={idx} className={`letter ${score && score[idx]}`}>
            <div>{letter}</div>
          </div>
        );
      })}
    </div>
  );
};
