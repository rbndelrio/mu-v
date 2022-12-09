import { describe, expect, test } from 'vitest';

import { getMovieSuggestionIds } from "../src/index";
import { getRandomItems } from '../src/random';

import json from '../../../data/movies.json';

// One-liner PRNG
// https://gist.github.com/blixt/f17b47c62508be59987b?permalink_comment_id=2682175#gistcomment-2682175
const LCG=(s:number)=>()=>(s=(Math.imul(48271,s)>>>0)%2147483647)/2147483647;

describe('shared', async () => {
  test('getMovieSuggestionIds', async () => {
    // vi.spyOn(Math, 'random').mockReturnValue(5)
    let prng = LCG(100)

    // Mock random-feeling numbers
    Math.random = () => prng()

    expect(
      await getMovieSuggestionIds(json.movies, 4, [36])
    ).toEqual([1, 37, 10, 31])
  })

  test('getRandomItems', () => {
    let prng = LCG(100)
    Math.random = () => prng()

    expect(
      getRandomItems(
        ['foo', 'bar', false, NaN, 'baz', 1, 2, 3, 4],
        5
      )
    ).toEqual(['foo', 1, 'bar', 'baz', false])
  })
})