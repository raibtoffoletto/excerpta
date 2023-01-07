/* eslint-disable no-console */
import { generate } from '@neo4j/graphql-ogm';
import { join } from 'path';
import { getOGM } from './datasource';

/**
 * Automatic Typescript types generation.
 */
async function main() {
  try {
    console.log(`\n  Generating Types from Schema... ⏰\n`);

    const ogm = await getOGM();

    const outFile = join(process.cwd(), 'types', 'entities.ts');

    await generate({ ogm, outFile });

    console.log(`\n  📦 Types Generated Successfully 🎉\n`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

main();
