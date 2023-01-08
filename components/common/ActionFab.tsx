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
          width: { xs: 40, sm: 52, md: 64 },
          height: { xs: 40, sm: 52, md: 64 },
          position: 'fixed',
          bottom: { xs: 20, sm: 24, md: 28 },
          right: { xs: 20, sm: 24, md: 28 },
          minHeight: 0,
        }}
        onClick={() => router.push(`${ROUTES.EDITOR}/${!!slug ? slug : 'new'}`)}
      >
        {!!slug ? (
          <EditIcon sx={{ fontSize: { xs: 16, sm: 24, md: 32 } }} />
        ) : (
          <AddIcon sx={{ fontSize: { xs: 24, sm: 32, md: 40 } }} />
        )}
      </Fab>
    </Tooltip>,
    container
  );
}
