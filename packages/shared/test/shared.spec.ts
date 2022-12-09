import { describe, expect, test } from 'vitest';

import { getMovieSuggestionIds } from "../src/index";
import { getRandomItems } from '../src/random';
import { pickFirst, pickItems, pickRandom, pickWeightedRandom } from '../src/weighted';

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

  test('picker', () => {
    let prng = LCG(999999)
    Math.random = () => prng()
    Math.random() // burn first item (always a low number)

    expect(pickItems(), 'default output should be empty array')
      .toEqual([])

    expect(pickItems([1, 2, 3]), 'single param input results in no change')
      .toEqual([1, 2, 3])

    expect(pickItems([1, 2, 3], pickFirst), 'pickFirst always picks first item')
      .toEqual([1, 2, 3])

    expect(pickItems([1, 2, 3], pickFirst, 1), 'limit param constrains output')
      .toEqual([1])

    expect(
      pickItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pickRandom, 4),
      'pickRandom picks randomly'
    ).toEqual([4, 7, 2, 1])

    Math.random() // burn another number

    expect(
      pickItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pickWeightedRandom, 4),
      'pickWeightedRandom prefers the front quarter of items'
    ).toEqual([1, 2, 3, 6])
  })
})