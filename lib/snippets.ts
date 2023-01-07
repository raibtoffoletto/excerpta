import { SnippetModel, SortDirection } from '@database';
import { getModel } from '@datasource';

interface ListSnippets {
  limit?: number;
  page?: number;
  sort?: string;
}

export async function list(
  args: ListSnippets | undefined
): Promise<IPaginated<SnippetDTO>> {
  let { limit, page, sort } = args ?? {};

  limit = limit ?? 8;
  page = page ?? 0;
  sort = sort ?? 'createdAt';

  const offset = limit * page;

  const repository = await getModel<SnippetModel>('Snippet');

  const { count } = await repository.aggregate({ aggregate: { count: true } });

  const snippets = await repository.find({
    selectionSet: '{ title, slug, description, tags { tag } }',
    options: {
      limit,
      offset,
      sort: [
        {
          [sort]: sort === 'title' ? SortDirection.Asc : SortDirection.Desc,
        },
      ],
    },
  });

  return {
    limit,
    offset,
    count,
    records: snippets as SnippetDTO[],
  };
}
