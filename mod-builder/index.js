import webpack from 'webpack';
import { readdir } from 'fs/promises';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const webpackConfig = await import('./webpack.config.js');
  const mods = await readdir(path.resolve(__dirname, '../mods'));

  console.log(`Building ${mods.length} mods...`);

  await Promise.all(
    mods.map(async (mod) => {
      return new Promise((resolve, reject) => {
        webpack(webpackConfig.default(`../mods/${mod}`), (err, stats) => {
          if (err || stats.hasErrors()) {
            console.error(err);
            const errors = stats.toJson().errors;
            errors.forEach((error) => console.error(error));
            return reject(err);
          }
          //console.log(stats)
          resolve();
        });
      });
    })
  );
}

main().catch(console.error);
