import { MovieId, MovieMap } from './types'

export const movies: MovieMap = {}

export const noop = () => { }

/**
 * Get Random Movie Keys
 *
 * @returns A list of movie ids
 */
export const getRandomMovieIds = (
  movies: MovieMap,
  range: number = 1,
  exclude?: MovieId[]
): MovieId[] => {
  const keys = Object.keys(movies).map(key => ~~key as MovieId)
  return getRandomItems(keys, range, exclude)
}

/**
 * Get Movie Suggestions
 *
 * @returns A list of movie ids
 */
export const getMovieSuggestionIds = (
  movies: MovieMap,
  range: number = 1,
  watchHistory?: MovieId[]
) => {
  const keys = Object.keys(movies).map(key => ~~key as MovieId)
  return getRandomItems(keys, range, watchHistory)
}

/**
 * Get Random Items
 *
 * @returns random items from an array without duplicates
 */
export const getRandomItems = <T = any>(
  items: T[],
  range: number = 1,
  exclude?: (T | any)[]
) => {
  if (!items.length || !range) return []

  if (exclude && exclude.length) {
    // TODO: Can be optimized by reducing removing items from exclusion array on match or by converting this to a for loop
    items = items.filter(id => !exclude.includes(id))
  }

  // const randomId = items[Math.floor(Math.random() * items.length)]

  return randomShuffle(items, range)
}

/**
 * Randomized Array
 *
 * Returns a random set of values from a given array
 */
const randomShuffle = <T = any>(arr: Array<T> = [], size: number = Infinity): Array<T> => {
  const output = []
  let remaining = Math.max(0, Math.min(size, arr.length)) // Ensure we don't get range errors
  let i = 0

  while (remaining--) {
    i = Math.floor(Math.random() * arr.length) // Random item in the input array
    output.push(arr.splice(i, 1)[0]) // Moves element from input array to the output
  }

  return output
}
