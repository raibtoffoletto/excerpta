import Layout from '@components/common/Layout';
import { EShortcuts } from '@constants';
import { ProvideAuth } from '@hooks/useAuth';
import { ProvideSearch } from '@hooks/useSearch';
import { ProvideTheme } from '@hooks/useTheme';
import { ProvideToast } from '@hooks/useToast';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import '../public/style.css';

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
            <ProvideSearch>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProvideSearch>
          </ProvideAuth>
        </ProvideToast>
      </ProvideTheme>
    </>
  );
}
