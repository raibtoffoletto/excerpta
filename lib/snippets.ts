import {
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

interface ListSnippets {
  limit?: number;
  page?: number;
  sort?: string;
}

interface SearchRecords {
  where?: SnippetWhere;
  fulltext?: SnippetFulltext;
  options?: SnippetOptions;
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
