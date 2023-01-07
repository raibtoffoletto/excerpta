import { EShortcuts, ROUTES } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useSearch } from '@hooks/useSearch';
import { useTheme } from '@hooks/useTheme';
import { DarkMode, Devices, LightMode, Logout } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

function Shortcut({ accel }: { accel: string }) {
  return (
    <Typography
      variant="body2"
      component="div"
      color="text.secondary"
      sx={{ marginLeft: '16px', padding: '8px 0 2px 0' }}
    >
      {accel}
    </Typography>
  );
}

export default function MenuDialog({
  onClose,
  ...props
}: Omit<MenuProps, 'onClose'> & { onClose: TVoid }) {
  const { push } = useRouter();
  const { toggleTheme, isDark } = useTheme();
  const { signOut } = useAuth();
  const isSearchOpen = useSearch();

  const handleDevices = useCallback(() => push(ROUTES.DEVICES), [push]);

  const handleClick = useCallback(
    (callback: TVoid) => () => {
      callback();

      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        toggleTheme();
      }
      onClose();
    }

    document.addEventListener(EShortcuts.THEME, handleKeydown);

    return () => document.removeEventListener(EShortcuts.THEME, handleKeydown);
  }, [toggleTheme, onClose, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        signOut();
      }
    }

    document.addEventListener(EShortcuts.SIGNOUT, handleKeydown);

    return () =>
      document.removeEventListener(EShortcuts.SIGNOUT, handleKeydown);
  }, [signOut, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        handleDevices();
      }
      onClose();
    }

    document.addEventListener(EShortcuts.DEVICES, handleKeydown);

    return () =>
      document.removeEventListener(EShortcuts.DEVICES, handleKeydown);
  }, [handleDevices, onClose, isSearchOpen]);

  return (
    <Menu
      id="app-menu"
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      {...props}
    >
      <MenuItem onClick={handleClick(toggleTheme)}>
        <ListItemIcon>{!!isDark ? <LightMode /> : <DarkMode />}</ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            variant: 'h6',
          }}
          primary="Toggle Theme"
        />
        <Shortcut accel={EShortcuts.THEME} />
      </MenuItem>

      <MenuItem onClick={handleClick(handleDevices)}>
        <ListItemIcon>
          <Devices />
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            variant: 'h6',
          }}
          primary="Devices"
        />
        <Shortcut accel={EShortcuts.DEVICES} />
      </MenuItem>

      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            variant: 'h6',
          }}
          primary="Sign Out"
        />
        <Shortcut accel={EShortcuts.SIGNOUT} />
      </MenuItem>
    </Menu>
  );
}
