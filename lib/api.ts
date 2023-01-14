import { ERRORS } from '@constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from './devices';

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<Record<string, any>> | Record<string, any>;

export function unauthorized(res: NextApiResponse) {
  return res.status(401).end();
}

export function methodNotAllowed(res: NextApiResponse) {
  return res.status(401).end();
}

export function apiHandler(handler: Handler, isPublic = false): Handler {
  return async (req, res) => {
    try {
      if (!isPublic) {
        const { excerpta_device: code } = req.cookies;

        const userAgent = req.headers?.['user-agent'];

        if (
          !code ||
          !userAgent ||
          req.headers?.host !==
            (req.headers?.origin ?? req.headers?.referer)
              ?.replace?.(/^http(s)*:\/\//, '')
              ?.split?.('/')?.[0]
        ) {
          throw new Error(ERRORS.UNAUTHORIZED);
        }

        await validate(code, userAgent);
      }

      const result = await handler(req, res);

      return res.status(200).json(result);
    } catch (error: any) {
      // eslint-disable-next-line
      console.log('-----\n[error]:\n', error);

      if (error?.message === ERRORS.UNAUTHORIZED) {
        res.setHeader(
          'Set-Cookie',
          'excerpta_device=null;Max-Age=-1;Path=/;HttpOnly;SameSite=Strict'
        );

        return unauthorized(res);
      }

      if (error?.message === ERRORS.METHOD_NOT_ALLOWED) {
        return methodNotAllowed(res);
      }

      res.statusMessage = `${error?.message}`;

      return res.status(400).end();
    }
  };
}
