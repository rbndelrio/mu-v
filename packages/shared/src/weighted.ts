import type { preprocessData } from './preprocess'
import { MovieId } from './types'

export const suggestWeightedMovies = (
  items: MovieId[] = [],
  limit = Infinity,
  exclude: MovieId[] = [],
  metaData?: ReturnType<typeof preprocessData>
) => {
  items = subtractItems<MovieId>(items, exclude)

  if (metaData) {
    const { moviesByPopularity: mbp } = metaData
    items = items.sort(
      (a, b) =>
        (mbp.indexOf(a) - mbp.indexOf(b))
        // TODO: opportunity to add other weights here
    )
  }

  // Results will use RNG but will skew heavily towards the first quarter of the results
  return pickItems<MovieId>(
    items,
    (arr) => Math.floor((Math.random() ** 4) * arr.length),
    limit
  )
}

/**
 * Subtract items
 *
 * @returns items that don't match in a specified array
*/
const subtractItems = <T = any>(
  items: T[],
  exclude?: (T | any)[]
) => {
  if (!items.length) return []

  if (exclude && exclude.length) {
    items = items.filter(id => !exclude.includes(id))
  }

  return items
}

type IndexPicker<T = any> = (arr: T[]) => number

/** Pick First Item */
export const pickFirst: IndexPicker = () => 0

/** Fully Random Item */
export const pickRandom: IndexPicker = (arr) => Math.floor(Math.random() * arr.length)

/** Weighted Random Item */
export const pickWeightedRandom: IndexPicker = (arr) => Math.floor((Math.random() ** 4) * arr.length)

/**
 * Pick Items With Limit
 * @param arr Array to pick from
 * @param picker Function to select an index from `arr`
 * @param limit Max number of items to return
 * @returns Array of picked items
 */
export const pickItems = <T = any>(
  arr: Array<T> = [],
  picker: IndexPicker<T> = pickFirst,
  limit: number = Infinity
): Array<T> => {
  const output = []
  let remaining = Math.max(0, Math.min(limit, arr.length)) // Ensure we don't get range errors
  let i = 0

  while (remaining--) {
    i = picker(arr) || 0 // Picked item in the input array
    output.push(arr.splice(i, 1)[0]) // Moves element from input array to the output
  }

  return output
}