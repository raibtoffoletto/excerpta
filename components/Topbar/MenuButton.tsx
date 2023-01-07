import { EShortcuts } from '@constants';
import { useSearch } from '@hooks/useSearch';
import { MoreVert } from '@mui/icons-material';
import { IconButton as MuiIconButton, styled, Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MenuDialog from './MenuDialog';
import { styledButton } from './TopButton';

const IconButton = styled(MuiIconButton)(styledButton);

export default function MenuButton({ ...props }) {
  const menuRef = useRef<any>(null);
  const isSearchOpen = useSearch();
  const [anchor, setAnchor] = useState<any>(null);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        setAnchor((anchor: any) => (!anchor ? menuRef?.current : null));
      }
    }

    document.addEventListener(EShortcuts.MENU, handleKeydown);

    return () => document.removeEventListener(EShortcuts.MENU, handleKeydown);
  }, [isSearchOpen]);

  return (
    <>
      <Tooltip title={EShortcuts.MENU}>
        <IconButton
          ref={menuRef}
          onClick={() => setAnchor(menuRef?.current)}
          color="secondary"
          size="large"
          className={'menuButton'}
          {...props}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>

      <MenuDialog
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </>
  );
}
