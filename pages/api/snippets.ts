import { ERRORS } from '@constants';
import { apiHandler } from '@lib/api';
import { create, remove, update } from '@lib/snippets';
import type { NextApiRequest } from 'next';

async function upsert(req: NextApiRequest, _update = false) {
  const {
    title,
    slug,
    description,
    tags,
    snippet,
  }: Partial<ISnippet> & { snippet?: string } = req.body;

  if (
    !title?.trim?.() ||
    !slug?.trim?.() ||
    !description?.trim?.() ||
    !snippet?.trim?.()
  ) {
    throw new Error('All fields are required');
  }

  const payload = {
    title,
    slug,
    description,
    tags: tags ?? [],
    snippet,
  };

  if (_update) {
    await update(payload);
  } else {
    await create(payload);
  }

  return { done: true };
}

async function deleteSnippet(req: NextApiRequest) {
  const { slug } = req.body;

  if (!slug.trim()) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  await remove(slug);

  return { done: true };
}

export default apiHandler(async (req) => {
  if (req.method === 'PUT') {
    return await upsert(req);
  }

  if (req.method === 'PATCH') {
    return await upsert(req, true);
  }

  if (req.method === 'DELETE') {
    return await deleteSnippet(req);
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
});
