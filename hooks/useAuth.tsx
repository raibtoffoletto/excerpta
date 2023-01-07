import SignIn from '@components/common/SignIn';
import { API } from '@constants';
import { CircularProgress } from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAuthContext {
  isReady: boolean;
  device?: string;
  signIn: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  isReady: false,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function ProvideAuth({ children }: IChildren) {
  const [device, setDevice] = useState<string | undefined>(undefined);
  const [isReady, setDone] = useState(false);

  const signIn = useCallback(async (password: string) => {
    const req = await fetch(API.AUTH, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ password }),
    });

    if (req.status >= 400) {
      throw new Error(req.statusText);
    }

    const { device } = await req.json();

    setDevice(device);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch(API.AUTH, { method: 'DELETE' });
    } finally {
      setDevice(undefined);
    }
  }, []);

  useEffect(() => {
    let fetching = false;
    const controller = new AbortController();

    (async () => {
      try {
        fetching = true;
        const req = await fetch(API.AUTH, {
          signal: controller.signal,
        });
        fetching = false;

        if (req.status >= 400) {
          throw new Error();
        }

        const { device: _device } = await req.json();

        if (!_device) {
          throw new Error();
        }

        setDevice(_device);
      } catch {
        setDevice(undefined);
      } finally {
        if (!fetching) {
          setDone(true);
        }
      }
    })();

    return () => {
      if (fetching) {
        controller.abort();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        device,
        signIn,
        signOut,
      }}
    >
      {!!isReady ? (
        !!device ? (
          <>
            <button
              onClick={() => {
                signOut();
              }}
            >
              get out
            </button>
            {children}
          </>
        ) : (
          <SignIn />
        )
      ) : (
        <CircularProgress
          size="6rem"
          sx={{
            position: 'absolute',
            top: 'calc(50% - 3rem)',
            left: 'calc(50% - 3rem)',
          }}
        />
      )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
