import { describe, it, expect, beforeEach } from 'vitest';
import * as Wordle from './wordle';

describe('scoreGuess', () => {
    it('identifies correct letters', () => {
        expect(Wordle.scoreGuess('a', 'a')).toEqual(['C']);
    });

    it('identifies correct letters', () => {
        expect(Wordle.scoreGuess('b', 'a')).toEqual(['I']);
    });

    it('identifies almost letters', () => {
        expect(Wordle.scoreGuess('bx', 'ab')).toEqual(['A', 'I']);
    });

    it('matches letters only once', () => {
        expect(Wordle.scoreGuess('cczy', 'abcd')).toEqual(['A', 'I', 'I', 'I']);
    });

    it('matches correct letters first', () => {
        expect(Wordle.scoreGuess('zdyd', 'abcd')).toEqual(['I', 'I', 'I', 'C']);
    });


    it.each([
        // guess , answer, result
        ['zyxx', 'abcd', 'IIII'],
        ['cczy', 'abcd', 'AIII'],
        ['aazy', 'abcd', 'CIII'],
        ['zdyd', 'abcd', 'IIIC'],
        // dupe in answer, dupe in guess
        ['zzyx', 'abcb', 'IIII'],
        ['bzby', 'abcb', 'AIAI'],
        ['zbby', 'abcb', 'ICAI'],
        ['zybb', 'abcb', 'IIAC'],
        ['zbyb', 'abcb', 'ICIC'],
        // dupe in answer, no dupe in guess
        ['zbxy', 'abcb', 'ICII'],
        ['bzyx', 'abcb', 'AIII'],

    ])('guess: %s, answer: %s, result: %s', (guess, answer, result) => {
        expect(Wordle.scoreGuess(guess, answer)).toEqual(result.split(''));
    });
});


describe("validateGuess", () => {
    let game: Wordle.Game;

    beforeEach(() => {
        const dictionary = [
            "aaaa", "aabb", "bbaa", "bbbb", "bbba", "aaab"
        ];

        const answer = "aaab";
        game = Wordle.createGame(dictionary, answer, false);
    })

    it("accepts words that ARE in the dictionary", () => {
        expect(Wordle.validateGuess("aaaa", game)).toEqual(true);
    });

    it("rejects words that ARE NOT in the dictionary", () => {
        expect(Wordle.validateGuess("cccc", game)).toEqual(false);
    });

    it("rejects wordds that have already been guessed", () => {
        game = Wordle.makeGuess("aaaa", game);
        expect(Wordle.validateGuess("aaaa", game)).toEqual(false);
    });
    it("accepts words that do  not use known CORRECT letters in EASY mode", () => {
        game = Wordle.makeGuess("aabb", game);
        expect(Wordle.validateGuess("bbaa", game)).toEqual(true);
    })

    it("rejects words that do not use known CORRECT letters in HARD mode", () => {
        game = Wordle.makeGuess("aabb", game);
        game.hardMode = true;
        expect(Wordle.validateGuess("bbaa", game)).toEqual(false);
    });

    it("rejects words that do not use known ALMOST letters in HARD mode", () => {
        game = Wordle.makeGuess("bbba", game);
        game.hardMode = true;
        expect(Wordle.validateGuess("aaaa", game)).toEqual(false);
    });
})