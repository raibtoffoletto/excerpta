import { ERRORS } from '@constants';
import { apiHandler } from '@lib/api';
import { list, remove } from '@lib/devices';
import type { NextApiRequest } from 'next';

async function deleteDevice(req: NextApiRequest) {
  const { code } = req.body;

  if (!code.trim()) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  await remove(code);

  return { done: true };
}

export default apiHandler(async (req) => {
  if (req.method === 'GET') {
    return await list();
  }

  if (req.method === 'DELETE') {
    return deleteDevice(req);
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
});
