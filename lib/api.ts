import { ERRORS } from '@constants';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      const { excerpta_device } = req.cookies;

      if (!isPublic && !excerpta_device) {
        throw new Error(ERRORS.UNAUTHORIZED);
      }

      const result = await handler(req, res);

      return res.status(200).json(result);
    } catch (error: any) {
      if (error?.message === ERRORS.UNAUTHORIZED) {
        res.setHeader(
          'Set-Cookie',
          'excerpta_device=null;Max-Age=-1;Path=/;HttpOnly;SameSite=Lax'
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
