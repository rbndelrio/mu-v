import fs from 'fs/promises';

// FIXME: ESM imports aren't working here
// import { Command } from 'commander';
const { Command } = require('commander');

import { getRandomMovieKeys } from '@mu-v/shared';
import type { MovieKey, UserData } from '@mu-v/shared/src/types.js';

const program = new Command();

program
  .name('µv')
  .description('tiny cli for movie recommendations')
  .showHelpAfterError()
  .command('recommend', { isDefault: true })
    .description('recommend some movies')
    .requiredOption('-f, --file <value>', 'file name')
    .requiredOption('-u, --user  <value>', 'user id')
    .option('-c, --count  <value>', 'number of recommendations to provide')
    .action(recommend)
  .parse(process.argv);

async function recommend (opts: Record<string, any>) {
  const fileString = await readFile(opts.file) || '{}'
  const count = opts.count || 4
  const userId = ~~opts.user
  const {
    movies,
    users,
  } = JSON.parse(fileString)

  const userData: UserData = (users || []).find(({ user_id }: UserData) => user_id === userId)
  if (!userData)
    return console.log('User Not Found')

  const userMovieKeys: MovieKey[] = (userData.movies || []).map(id => `${id}` as MovieKey)
  const randomMovieKeys = getRandomMovieKeys(movies, count, userMovieKeys)

  if (!randomMovieKeys || !randomMovieKeys.length)
    return console.log('Nothing left to recommend!')

  console.log('\x1b[34mRecommended Movies for user %d \x1b[0m', userId)
  randomMovieKeys.forEach(key => { console.log(movies[key]) })
}

async function readFile(filePath: string) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString()
  } catch (error) {
    console.error(error);
    return ''
  }
}
