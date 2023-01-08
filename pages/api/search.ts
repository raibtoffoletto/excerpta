import { ERRORS } from '@constants';
import { apiHandler } from '@lib/api';
import { find, FindSnippets } from '@lib/snippets';

export default apiHandler(async (req) => {
  if (req.method === 'POST') {
    const { query, tag }: FindSnippets = req.body;

    if (!query && !tag) {
      throw new Error('A search parameter is required');
    }

    return await find({ query, tag });
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
});
