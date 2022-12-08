import { getMovieSuggestionIds } from '@mu-v/shared';
import type { MovieMap, UserData } from '@mu-v/shared/src/types.js';

interface RecommendationConfig {
  count: number;
  movies: MovieMap
  user?: UserData;
}
export const getRecommendations = async ({ count = 1, movies = [], user }: RecommendationConfig) => {
  if (!user)
    return console.log('User Not Found')

  const watchHistory = user.movies || []
  const movieIds = await getMovieSuggestionIds(movies, count, watchHistory)

  if (!movieIds || !movieIds.length)
    return console.log('Nothing left to recommend!')

  console.log(
    // Blue just because
    '\x1b[34mRecommended movies for user #%d:\x1b[0m\n',
    user.user_id
  )

  movieIds.forEach(id => { console.log(movies[`${id}`]) })
}
