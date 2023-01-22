export const CORRECT = 'C';
export const ALMOST = 'A';
export const INCORRECT = 'I';

const EMPTY = '';

export type LetterScore = typeof CORRECT | typeof ALMOST | typeof INCORRECT;
export type GuessScore = LetterScore[];

export type Game = {
    answer: string;
    hardMode: boolean;
    guesses: string[];
    scores: GuessScore[];
    guessesRemaining: number;
    dictionary: string[];
    maxWordLength: number;
}

export const createGame = (dictionary: string[], answer: string, hardMode = false): Game => {
    return {
        answer,
        hardMode,
        guesses: [],
        scores: [],
        guessesRemaining: 6,
        dictionary,
        maxWordLength: 4
    };
}

export const scoreGuess = (guess: string, answer: string): GuessScore => {
    const answerLetters = answer.split('');
    const guessLetters = guess.split('');


    const score: GuessScore = [];

    for (let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === answerLetters[i]) {
            score[i] = CORRECT;
            answerLetters[i] = EMPTY;
            guessLetters[i] = EMPTY;
        }

    }

    for (let i = 0; i < guessLetters.length; i++) {
        if (guessLetters[i] === "") continue;

        const answerIdx = answerLetters.findIndex(char => char === guessLetters[i]);
        if (answerIdx > -1) {
            score[i] = ALMOST;
            answerLetters[answerIdx] = '';
        } else {
            score[i] = INCORRECT;
        }

    }
    return score;
};