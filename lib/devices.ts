import { ERRORS } from '@constants';
import { DeviceModel, SortDirection } from '@database';
import { getModel } from '@datasource';
import UA from 'ua-parser-js';

export async function validate(code: string, userAgent: string) {
  const repository = await getModel<DeviceModel>('Device');

  const device = (await repository.find({ where: { code, userAgent } }))?.[0];

  if (!device || !device?.code || !!device?.isBlocked) {
    throw new Error(ERRORS.UNAUTHORIZED);
  }
}

export async function list(): Promise<IDevice[]> {
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

export async function remove(code: string) {
  const repository = await getModel<DeviceModel>('Device');

  await repository.delete({ where: { code } });
}
