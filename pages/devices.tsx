import Wrapper from '@components/common/Wrapper';
import Device from '@components/Device';
import { API } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { list } from '@lib/devices';
import type { InferGetServerSidePropsType } from 'next';
import { useCallback, useState } from 'react';

export default function Devices({
  devices: deviceList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { device } = useAuth();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState<IDevice[]>(deviceList ?? []);

  const getDevices = useCallback(async () => {
    try {
      setLoading(true);

      const req = await fetch(API.DEVICES);

      if (req.status >= 400) {
        throw new Error(req.statusText);
      }

      setDevices(await req.json());
    } catch (error: any) {
      setDevices([]);

      console.log(`[ERROR]: ${error?.message}`); // eslint-disable-line
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDevice = useCallback(
    async (code: string) => {
      try {
        setLoading(true);

        const req = await fetch(API.DEVICES, {
          method: 'DELETE',
          headers: new Headers({
            'content-type': 'application/json',
          }),
          body: JSON.stringify({ code }),
        });

        if (req.status >= 400) {
          throw new Error(req.statusText);
        }
      } catch (error: any) {
        console.log(`[ERROR]: ${error?.message}`); // eslint-disable-line
      } finally {
        await getDevices();
      }
    },
    [getDevices]
  );

  return (
    <Wrapper sx={{ opacity: loading ? 0.5 : 1, justifyContent: 'center' }}>
      {devices.map((_device) => (
        <Device
          key={_device.code}
          isCurrent={_device.code === device}
          onRemove={deleteDevice}
          disabled={loading}
          {..._device}
        />
      ))}
    </Wrapper>
  );
}

export async function getServerSideProps() {
  try {
    const devices = await list();

    return {
      props: {
        devices,
      },
    };
  } catch (error) {
    // eslint-disable-next-line
    console.log('-----\n[error]:\n', error);

    return {
      notFound: true,
    };
  }
}
