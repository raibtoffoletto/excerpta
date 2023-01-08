import { ERRORS } from '@constants';
import {
  Snippet,
  SnippetFulltext,
  SnippetModel,
  SnippetOptions,
  SnippetWhere,
  SortDirection,
  TagModel,
} from '@database';
import { getModel } from '@datasource';

export interface FindSnippets {
  query?: string;
  tag?: string;
}

export interface ListSnippets {
  limit?: number;
  page?: number;
  sort?: string;
}

interface SearchRecords {
  where?: SnippetWhere;
  fulltext?: SnippetFulltext;
  options?: SnippetOptions;
}

function mapConnectOrCreateTags(tag: string) {
  return {
    where: {
      node: {
        tag,
      },
    },
    onCreate: {
      node: {
        tag,
      },
    },
  };
}

async function searchRecords({
  where,
  fulltext,
  options,
}: SearchRecords): Promise<[number, SnippetDTO[]]> {
  const repository = await getModel<SnippetModel>('Snippet');

  const { count } = await repository.aggregate({
    where,
    fulltext,
    aggregate: { count: true },
  });

  const records = await repository.find({
    where,
    options,
    fulltext,
    selectionSet: '{ title, slug, description, tags { tag } }',
  });

  return [count, records as SnippetDTO[]];
}

async function searchTags(query: string): Promise<SnippetDTO[]> {
  const repository = await getModel<TagModel>('Tag');

  const records = await repository.find({
    fulltext: { TagSearch: { phrase: query } },
    selectionSet: '{ tag, snippets { title, slug, description } }',
  });

  const results: SnippetDTO[] = [];

  for (const tag of records) {
    tag.snippets.forEach((s) => {
      results.push({
        title: s.title,
        slug: s.slug,
        description: s.description ?? '',
      });
    });
  }

  return results;
}

export async function list(
  args: ListSnippets | undefined
): Promise<IPaginated<SnippetDTO>> {
  let { limit, page, sort } = args ?? {};

  limit = limit ?? 8;
  page = page ?? 0;
  sort = sort ?? 'createdAt';

  const offset = limit * page;

  const options: SnippetOptions = {
    limit,
    offset,
    sort: [
      {
        [sort]: sort === 'title' ? SortDirection.Asc : SortDirection.Desc,
      },
    ],
  };

  const [count, records] = await searchRecords({ options });

  return {
    limit,
    offset,
    count,
    records,
  };
}

export async function find({
  query,
  tag,
}: FindSnippets): Promise<IPaginated<SnippetDTO>> {
  const limit = 16;

  if (!!tag) {
    const [count, records] = await searchRecords({
      options: { limit },
      where: { tagsConnection_SOME: { node: { tag } } },
    });

    return {
      limit,
      offset: 0,
      count,
      records,
    };
  }

  const allQueryRecords = (
    await searchRecords({
      fulltext: { SnippetSearch: { phrase: `*${query}*` } },
    })
  )[1];

  const allTagRecords = await searchTags(`*${query}*`);

  const uniques = new Set();
  const results: SnippetDTO[] = [];

  for (const snippet of allQueryRecords.concat(allTagRecords)) {
    if (uniques.has(snippet.slug)) {
      continue;
    }

    uniques.add(snippet.slug);
    results.push({
      title: snippet.title,
      slug: snippet.slug,
      description: snippet.description,
    });
  }

  return {
    limit,
    offset: 0,
    count: results.length,
    records: results,
  };
}

export async function findOne(slug: string): Promise<Snippet | undefined> {
  const repository = await getModel<SnippetModel>('Snippet');

  const search = await repository.find({
    where: { slug },
    selectionSet: '{ title, slug, description, snippet, tags { tag } }',
  });

  return search?.[0];
}

export async function create({
  title,
  slug,
  description,
  tags,
  snippet,
}: ISnippet & { snippet: string }) {
  const repository = await getModel<SnippetModel>('Snippet');

  await repository.create({
    input: [
      {
        title,
        slug,
        description,
        snippet,
        tags: {
          connectOrCreate: tags.map(mapConnectOrCreateTags),
        },
      },
    ],
  });
}

export async function update({
  title,
  slug,
  description,
  tags,
  snippet,
}: ISnippet & { snippet: string }) {
  const original = await findOne(slug);

  if (!original) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  const disconnect = original.tags
    .filter((t) => !tags.includes(t.tag))
    .map((t) => ({
      where: {
        node: {
          tag: t.tag,
        },
      },
    }));

  const connectOrCreate = tags.map(mapConnectOrCreateTags);

  const repository = await getModel<SnippetModel>('Snippet');

  await repository.update({
    where: { slug },
    update: {
      title,
      description,
      snippet,
      tags: [
        {
          disconnect,
          connectOrCreate,
        },
      ],
    },
  });
}

export async function remove(slug: string) {
  const repository = await getModel<SnippetModel>('Snippet');

  await repository.delete({ where: { slug } });
}
