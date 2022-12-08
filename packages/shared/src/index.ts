import { MovieKey, MovieMap } from './types'

export const movies: MovieMap = {}

export const noop = () => { }

export const getRandomMovieIds = (
  movies: MovieMap,
  range: number = 1,
  exclude?: MovieKey[]
): MovieKey[] => {
  // const matches: MovieKey[] = []

  let keys = Object.keys(movies) as MovieKey[]

  if (!keys.length || !range) return []

  if (exclude && exclude.length) {
    // TODO: Can be optimized by reducing removing items from exclusion array on match or by converting this to a for loop
    keys = keys.filter(id => !exclude.includes(id))
  }

  // const randomId = keys[Math.floor(Math.random() * keys.length)]

  return randomShuffle(keys, range)
}

/**
 * Randomized Array
 *
 * Returns a random set of values from a given array
 */
const randomShuffle = <T = any>(arr: Array<T> = [], size: number = Infinity): Array<T> => {
  var o = [],
      r = Math.max(0, Math.min(size, arr.length)),
      j = 0;

  while (r--) {
    j = Math.floor(Math.random() * (arr.length+1));
    o.push(arr.splice(j, 1)[0])
  }

  return o;
}
