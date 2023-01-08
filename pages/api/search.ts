import { ERRORS } from '@constants';
import { apiHandler } from '@lib/api';
import { find, FindSnippets, list, ListSnippets } from '@lib/snippets';

export default apiHandler(async (req) => {
  if (req.method === 'GET') {
    const { limit, page }: ListSnippets = req.query;

    const _limit = Number(limit ?? 10);

    const _page = Number(page ?? 0);

    return await list({
      sort: 'title',
      limit: _limit,
      page: _page,
    });
  }

  if (req.method === 'POST') {
    const { query, tag }: FindSnippets = req.body;

    if (!query && !tag) {
      throw new Error('A search parameter is required');
    }

    return await find({ query, tag });
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
});
