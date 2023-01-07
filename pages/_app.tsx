import { EShortcuts } from '@constants';
import { ProvideAuth } from '@hooks/useAuth';
import { ProvideTheme } from '@hooks/useTheme';
import { ProvideToast } from '@hooks/useToast';
import Head from 'next/head';
import { useEffect } from 'react';
import '../public/style.css';
// import { App, Loader } from '../components';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function handleShortcuts(ev: KeyboardEvent) {
      if (!!ev.ctrlKey && !!ev.altKey && !!!ev.shiftKey && !!!ev.metaKey) {
        const accelList: string[] = Object.values(EShortcuts);

        const shortcut = `Ctl+Alt+${`${ev.key}`.toUpperCase()}`;

        if (!!accelList.includes(shortcut)) {
          document.dispatchEvent(new CustomEvent(shortcut));
        }
      }
    }

    document.addEventListener('keydown', handleShortcuts);

    return () => document.removeEventListener('keydown', handleShortcuts);
  }, []);

  return (
    <>
      <Head>
        <title>Excerpta</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#222233" />
        <meta name="description" content="In memoria nulla fiducia" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <ProvideTheme>
        <ProvideToast>
          <ProvideAuth>
            {/* <App>
                <Loader> */}
            <Component {...pageProps} />
            {/* </Loader>
              </App> */}
          </ProvideAuth>
        </ProvideToast>
      </ProvideTheme>
    </>
  );
}
