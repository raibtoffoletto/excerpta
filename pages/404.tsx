import { ROUTES } from '@constants';
import { useToast } from '@hooks/useToast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Page404() {
  const doToast = useToast();
  const { push } = useRouter();

  useEffect(() => {
    doToast({
      severity: 'warning',
      message: '404: Page not found',
      duration: 2500,
    });

    const timeout = setTimeout(() => {
      push(ROUTES.HOME);
    }, 333);

    return () => {
      clearTimeout(timeout);
    };
  }, [doToast, push]);

  return null;
}
