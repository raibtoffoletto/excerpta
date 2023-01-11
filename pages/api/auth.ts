import { ERRORS } from '@constants';
import { DeviceModel } from '@database';
import { getModel } from '@datasource';
import { apiHandler } from '@lib/api';
import codeGen from '@lib/codeGen';
import { remove, validate } from '@lib/devices';
import type { NextApiRequest, NextApiResponse } from 'next';

const APP_PASSWORD =
  process.env.NODE_ENV === 'production'
    ? String(process.env.APP_PASSWORD)
    : String(process.env.APP_PASSWORD ?? 'password');

async function getAuth(req: NextApiRequest) {
  const { excerpta_device: code } = req.cookies;

  const userAgent = req.headers?.['user-agent'];

  if (!code || !userAgent) {
    throw new Error(ERRORS.UNAUTHORIZED);
  }

  await validate(code, userAgent);

  const repository = await getModel<DeviceModel>('Device');

  await repository.update({
    update: { lastUse: new Date().toISOString() },
    where: { code },
  });

  return { device: code };
}

async function postAuth(req: NextApiRequest, res: NextApiResponse) {
  if (!APP_PASSWORD) {
    throw new Error('Password not set in environment!');
  }

  const { password } = req.body;

  const userAgent = req.headers?.['user-agent'];

  if (!userAgent || !password.trim() || password !== APP_PASSWORD) {
    throw new Error(ERRORS.UNAUTHORIZED);
  }

  const code = codeGen();

  const repository = await getModel<DeviceModel>('Device');

  await repository.create({
    input: [
      {
        code,
        userAgent,
        isBlocked: false,
        lastUse: new Date().toISOString(),
      },
    ],
  });

  res.setHeader(
    'Set-Cookie',
    `excerpta_device=${code};Path=/;HttpOnly;SameSite=Lax`
  );

  return { device: code };
}

async function deleteAuth(req: NextApiRequest) {
  const { excerpta_device: code } = req.cookies;

  await remove(`${code}`);

  throw new Error(ERRORS.UNAUTHORIZED);
}

export default apiHandler((req, res) => {
  if (req.method === 'GET') {
    return getAuth(req);
  }

  if (req.method === 'POST') {
    return postAuth(req, res);
  }

  if (req.method === 'DELETE') {
    return deleteAuth(req);
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
}, true);
