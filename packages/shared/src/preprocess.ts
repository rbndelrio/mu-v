import { Movie, MovieMap, UserData } from './types'

interface UserStats {
  id: number
  watched: number
  // yearWeight: number
  // popWeight: number
}

interface MovieStats {
  year: number
  popularity: number
}

/**
 * Movie Preprocessor
 *
 * Builds statistics from provided user and movie data
 */
export const preprocessData = (users: UserData[], movies: MovieMap) => {
  const userMeta: Record<number, UserStats> = {}
  const movieMeta: Record<number, Movie & MovieStats> = {}
  const movieIds = []

  // Prep movie data
  for (const key in movies) {
    if (Object.prototype.hasOwnProperty.call(movies, key)) {
      const name = movies[key as keyof MovieMap]
      const id = ~~key

      movieIds.push(id)
      movieMeta[id] = {
        id,
        title: name.slice(0, -7),
        year: ~~name.slice(-5, -1),
        popularity: 0,
      }

      // TODO: Use the graph data structure to weigh movie year-based correlations
    }
  }

  // Prep user data and collect stats at the same time
  users.forEach(({ user_id, movies }) => {
    movies?.forEach(movie => {
      if (movieMeta[movie]) movieMeta[movie].popularity += 1
    })

    userMeta[user_id] = {
      id: user_id,
      watched: movies?.length || 0,
    }

    // TODO: Use graph data structure to weigh user watch history correlations
  })

  return {
    userMeta,
    movieMeta,

    moviesByYear: movieIds.sort(
      (a, b) =>
        // By year
        (movieMeta[a].year - movieMeta[b].year) ||
        // then by title I guess?
        movieMeta[a].title.localeCompare(movieMeta[b].title)
    ),

    moviesByPopularity: movieIds.sort(
      (a, b) =>
        // By year
        (movieMeta[a].popularity - movieMeta[b].popularity) ||
        // then by title I guess?
        movieMeta[a].title.localeCompare(movieMeta[b].title)
    ),
  }
}