import { describe, it, expect } from 'vitest';
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

    it('matches letters only once',()=>{
        expect(Wordle.scoreGuess('cczy','abcd')).toEqual(['A','I','I','I']);
    });

    it('matches correct letters first',()=>{
        expect(Wordle.scoreGuess('zdyd','abcd')).toEqual(['I','I','I','C']);
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
