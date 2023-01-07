import { ERRORS } from '@constants';
import { DeviceModel, SortDirection } from '@database';
import { getModel } from '@datasource';
import { apiHandler } from '@lib/api';
import type { NextApiRequest } from 'next';
import UA from 'ua-parser-js';

async function getDevices() {
  const repository = await getModel<DeviceModel>('Device');

  const devices = await repository.find({
    where: {
      isBlocked: false,
    },
    options: {
      sort: [
        {
          lastUse: SortDirection.Desc,
        },
      ],
    },
  });

  return devices.map((device) => {
    const ua = new UA(device.userAgent);

    const browser = ua.getBrowser()?.name ?? '';

    const os = ua.getOS()?.name ?? '';

    return {
      os,
      browser,
      code: device.code,
      lastUse: device.lastUse,
    };
  });
}

async function deleteDevice(req: NextApiRequest) {
  const { code } = req.body;

  if (!code.trim()) {
    throw new Error(ERRORS.NOT_FOUND);
  }

  const repository = await getModel<DeviceModel>('Device');

  await repository.delete({ where: { code } });

  return { done: true };
}

export default apiHandler((req) => {
  if (req.method === 'GET') {
    return getDevices();
  }

  if (req.method === 'DELETE') {
    return deleteDevice(req);
  }

  throw new Error(ERRORS.METHOD_NOT_ALLOWED);
});
