import { ModelMap } from '@database';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { OGM } from '@neo4j/graphql-ogm';
import { readFile } from 'fs/promises';
import neo4j, { AuthToken, Driver } from 'neo4j-driver';
import { join } from 'path';

let ogm: OGM<ModelMap> | undefined = undefined;

const DB_PASSWORD =
  process.env.NODE_ENV === 'production'
    ? String(process.env.DB_PASSWORD)
    : String(process.env.DB_PASSWORD ?? 'password');

const DB_USER =
  process.env.NODE_ENV === 'production'
    ? String(process.env.DB_USER)
    : String(process.env.DB_USER ?? 'neo4j');

const DB_URI = String(process.env.DB_URI ?? 'bolt://localhost:7687');

const connection: { url: string; authToken: AuthToken } = {
  url: DB_URI,
  authToken: neo4j.auth.basic(DB_USER, DB_PASSWORD),
};

const driver: Driver = neo4j.driver(
  connection.url,
  connection.authToken,
  /**
   * BUG: "Int cannot represent non-integer value"
   * https://github.com/neo4j/graphql/issues/167
   **/
  { disableLosslessIntegers: true }
);

export async function getOGM() {
  if (!!ogm) {
    return ogm;
  }

  const typeDefs = await readFile(
    join(process.cwd(), 'lib', 'database', 'schema.graphql'),
    'utf-8'
  );

  try {
    /**
     * GraphQL is not used in this project, however this step is necessary
     * in order to ensure the schema indices are present in the database.
     **/
    const schema = new Neo4jGraphQL({ typeDefs });

    await schema.getSchema();

    await schema.assertIndexesAndConstraints({
      driver,
      options: { create: true },
    });
  } catch (error) {
    console.log('-----\n[db init error]:\n', error, connection); // eslint-disable-line
  }

  ogm = new OGM<ModelMap>({ typeDefs, driver });

  await ogm.init();

  return ogm;
}

export async function getModel<T>(model: string) {
  const _ogm = await getOGM();

  return _ogm.model(model) as T;
}
