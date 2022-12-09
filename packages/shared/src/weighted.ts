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
  return pickItemsWithLimit<MovieId>(
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

type IndexPicker<T> = (arr: T[]) => number
const pickItemsWithLimit = <T = any>(
  arr: Array<T> = [],
  picker: IndexPicker<T>,
  limit: number = Infinity
): Array<T> => {
  const output = []
  let remaining = Math.max(0, Math.min(limit, arr.length)) // Ensure we don't get range errors
  let i = 0

  while (remaining--) {
    i = picker(arr) // Picked item in the input array
    output.push(arr.splice(i, 1)[0]) // Moves element from input array to the output
  }

  return output
}