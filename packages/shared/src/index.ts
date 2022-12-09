import { preprocessData } from './preprocess'
import { getRandomItems } from './random'
import { MovieId, MovieMap } from './types'
import { suggestWeightedMovies } from './weighted'

/**
 * Get Movie Suggestions
 *
 * @returns A list of movie ids
 */
export const getMovieSuggestionIds = async (
  movies: MovieMap,
  limit: number = 1,
  watchHistory: MovieId[],
  metaData?: ReturnType<typeof preprocessData>
) => {
  const keys = Object.keys(movies).map(key => ~~key as MovieId)

  if (metaData) {
    return suggestWeightedMovies(
      keys,
      limit,
      watchHistory,
      metaData
    )
  }

  // Fallback method if no preprocessed data is provided
  return getRandomItems(keys, limit, watchHistory)
}

export { preprocessData } from './preprocess'
