import { EShortcuts, ROUTES } from '@constants';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function ActionFab({ slug }: { slug?: string }) {
  const router = useRouter();
  const [container] = useState(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  useEffect(() => {
    function handleKeydown() {
      if (!!slug) {
        router.push(`${ROUTES.EDITOR}/${slug}`);
      }
    }

    document.addEventListener(EShortcuts.EDIT, handleKeydown);

    return () => document.removeEventListener(EShortcuts.EDIT, handleKeydown);
  }, [router, slug]);

  return ReactDOM.createPortal(
    <Tooltip title={!!slug ? 'Ctl+Alt+E' : `Ctrl+Alt+N`}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          width: { xs: 48, sm: 64, md: 80 },
          height: { xs: 48, sm: 64, md: 80 },
          position: 'fixed',
          bottom: { xs: 16, sm: 20, md: 24 },
          right: { xs: 16, sm: 20, md: 24 },
        }}
        onClick={() => router.push(`${ROUTES.EDITOR}/${!!slug ? slug : 'new'}`)}
      >
        {!!slug ? (
          <EditIcon sx={{ fontSize: { xs: 18, sm: 28, md: 38 } }} />
        ) : (
          <AddIcon sx={{ fontSize: { xs: 24, sm: 40, md: 56 } }} />
        )}
      </Fab>
    </Tooltip>,
    container
  );
}
