/* eslint-disable no-console */
import { generate } from '@neo4j/graphql-ogm';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { getOGM } from './datasource';

/**
 * Automatic Typescript types generation.
 */
async function main() {
  try {
    console.log(`\n  Generating Types from Schema... ⏰\n`);

    const ogm = await getOGM();

    const outFile = join(process.cwd(), 'types', 'database.ts');

    await generate({ ogm, outFile });

    console.log(`\n  🐛 Disabling ES-LINT\n`);

    const types = await readFile(outFile, 'utf-8');

    const fix = `/* eslint-disable */\n` + types;

    await writeFile(outFile, fix);

    console.log(`\n  📦 Types Generated Successfully 🎉\n`);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

main();
