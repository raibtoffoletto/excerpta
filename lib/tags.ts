import { SortDirection, TagModel } from '@database';
import { getModel } from '@datasource';

export async function list(): Promise<TagDTO[]> {
  const repository = await getModel<TagModel>('Tag');

  const tags = await repository.find({
    selectionSet: '{ tag, snippetsConnection { totalCount } }',
    where: {
      snippetsAggregate: {
        count_GT: 0,
      },
    },
    options: {
      sort: [
        {
          tag: SortDirection.Asc,
        },
      ],
    },
  });

  const total = tags
    .map((t) => t.snippetsConnection.totalCount)
    .reduce((a, b) => a + b, 0);

  return tags.map((t) => ({
    tag: t.tag,
    percent: parseFloat(
      ((t.snippetsConnection.totalCount / total) * 5 + 1).toFixed(2)
    ),
  }));
}

export async function listAll(): Promise<string[]> {
  const repository = await getModel<TagModel>('Tag');

  const tags = await repository.find({
    selectionSet: '{ tag }',
    options: {
      sort: [
        {
          tag: SortDirection.Asc,
        },
      ],
    },
  });

  return tags.map((t) => t.tag);
}
