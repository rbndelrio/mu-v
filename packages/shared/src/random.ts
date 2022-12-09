import { MovieId, MovieMap } from './types'
import { pickItems } from './weighted'

/**
 * Get Random Movie Keys
 *
 * @returns A list of movie ids
 * @deprecated Use getRandomItems() or suggestWeightedMovies()
 */
const getRandomMovieIds = (
  movies: MovieMap,
  limit: number = 1,
  exclude?: MovieId[]
): MovieId[] => {
  const keys = Object.keys(movies).map(key => ~~key as MovieId)
  return getRandomItems(keys, limit, exclude)
}

/**
 * Get Random Items
 *
 * @returns random items from an array without duplicates
 */
export const getRandomItems = <T = any>(
  items: T[],
  limit: number = 1,
  exclude?: (T | any)[]
) => {
  if (!items.length || !limit) return []

  if (exclude && exclude.length) {
    // TODO: Can be optimized by reducing removing items from exclusion array on match or by converting this to a for loop
    items = items.filter(id => !exclude.includes(id))
  }

  return pickItems(
    items,
    (arr) => Math.floor(Math.random() * arr.length),
    limit
  )
}

/**
 * Randomized Array
 *
 * @returns a random set of values from a given array
 * @deprecated Use pickItems()
 */
const randomShuffle = <T = any>(arr: Array<T> = [], limit: number = Infinity): Array<T> => {
  const output = []
  let remaining = Math.max(0, Math.min(limit, arr.length)) // Ensure we don't get range errors
  let i = 0

  while (remaining--) {
    i = Math.floor(Math.random() * arr.length) // Random item in the input array
    output.push(arr.splice(i, 1)[0]) // Moves element from input array to the output
  }

  return output
}
