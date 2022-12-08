import { getRandomMovieKeys } from '@mu-v/shared';
import type { MovieKey, MovieMap, UserData } from '@mu-v/shared/src/types.js';

interface RecommendationConfig {
  count: number;
  movies: MovieMap
  user?: UserData;
}
export const getRecommendations = async ({ count = 1, movies = [], user }: RecommendationConfig) => {
  if (!user)
    return console.log('User Not Found')

  const userMovieKeys: MovieKey[] = (user.movies || []).map(id => `${id}` as MovieKey)
  const randomMovieKeys = getRandomMovieKeys(movies, count, userMovieKeys)

  if (!randomMovieKeys || !randomMovieKeys.length)
    return console.log('Nothing left to recommend!')

  // Blue just because
  console.log('\x1b[34mRecommended movies for user #%d:\x1b[0m\n', user.user_id)
  randomMovieKeys.forEach(key => { console.log(movies[key]) })
}