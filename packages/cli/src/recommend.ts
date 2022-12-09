import { getMovieSuggestionIds, preprocessData } from '@mu-v/shared';
import type { MovieMap, UserData } from '@mu-v/shared/src/types.js';

interface RecommendationConfig {
  // Static Data
  movies: MovieMap
  users: UserData[];

  // User Input
  count: number;
  user?: UserData;
}
export const getRecommendations = async ({
  movies = [],
  users = [],
  user,
  count = 1
}: RecommendationConfig) => {
  if (!user)
    return console.log('User Not Found')

  const watchHistory = user.movies || []
  const metaData = preprocessData(users, movies)
  const movieIds = await getMovieSuggestionIds(movies, count, watchHistory, metaData)

  if (!movieIds || !movieIds.length)
    return console.log('Nothing left to recommend!')

  console.log(
    // Blue just because
    '\x1b[34mRecommended movies for user #%d:\x1b[0m\n',
    user.user_id
  )

  movieIds.forEach(id => { console.log(movies[`${id}`]) })
}
