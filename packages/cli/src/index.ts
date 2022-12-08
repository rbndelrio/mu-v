import fs from 'fs/promises';
import { getRecommendations } from './recommend.js';

// FIXME: ESM imports aren't working here
// import { Command } from 'commander';
const { Command } = require('commander');

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

  const user = (users || []).find((u: any) => u?.user_id === userId)

  getRecommendations({ movies, count, user })
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
