import Wrapper from '@components/common/Wrapper';
import Device from '@components/Device';
import { API } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';

interface GetDevices {
  setFetch?: (status: boolean) => void;
  signal?: AbortSignal;
}

export default function Devices() {
  const { device } = useAuth();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState<IDevice[]>([]);

  const getDevices = useCallback(async (args: GetDevices = {}) => {
    try {
      const { setFetch, signal } = args;

      setLoading(true);

      setFetch?.(true);
      const req = await fetch(API.DEVICES, { signal });
      setFetch?.(false);

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

  useEffect(() => {
    let fetching = false;
    const setFetch = (status: boolean) => {
      fetching = status;
    };
    const abort = new AbortController();

    (async () => {
      await getDevices({ setFetch, signal: abort.signal });
    })();

    return () => {
      if (fetching) {
        abort.abort();
      }
    };
  }, [getDevices]);

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
