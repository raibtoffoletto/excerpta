import Logo from '@components/common/Icon';
import { EShortcuts, ROUTES } from '@constants';
import { useSearch } from '@hooks/useSearch';
import {
  FormatListBulleted as ListIcon,
  Search as SearchIcon,
  Tag as TagIcon,
} from '@mui/icons-material';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  styled,
  Toolbar as MuiToolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import MenuButton from './MenuButton';
import TopButton from './TopButton';

const AppBar = styled(MuiAppBar)(() => ({
  maxWidth: '100vw',
  flexShrink: 0,
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: `${theme.spacing(7)} !important`,
  padding: `0 ${theme.spacing(1.5)}`,

  [theme.breakpoints.up('md')]: {
    minHeight: `${theme.spacing(9)} !important`,
    padding: `0 ${theme.spacing(3)}`,
  },

  [theme.breakpoints.up('lg')]: {
    minHeight: `${theme.spacing(11)} !important`,
  },

  [theme.breakpoints.up('xl')]: {
    minHeight: `${theme.spacing(13)} !important`,
  },
}));

const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Icon = styled(Logo)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },

  [theme.breakpoints.up('lg')]: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },

  [theme.breakpoints.up('xl')]: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  display: 'none',
  userSelect: 'none',

  [theme.breakpoints.up(450)]: {
    display: 'block',
    marginLeft: theme.spacing(1),
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '1.66rem',
    marginLeft: theme.spacing(1.5),
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '2.08rem',
    marginLeft: theme.spacing(2),
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '2.5rem',
    marginLeft: theme.spacing(2.5),
  },
}));

function TopBar() {
  const { asPath, push } = useRouter();
  const isSearchOpen = useSearch();

  const handleHome = useCallback(() => push(ROUTES.HOME), [push]);

  const handleSearch = useCallback(
    () =>
      push(
        `${asPath}?search=${encodeURI(
          window?.getSelection?.()?.toString?.() ?? ''
        )}`
      ),
    [asPath, push]
  );

  const handleList = useCallback(() => push(ROUTES.SNIPPETS), [push]);

  const handleTags = useCallback(() => push(ROUTES.TAGS), [push]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        handleHome();
      }
    }

    document.addEventListener(EShortcuts.HOME, handleKeydown);

    return () => document.removeEventListener(EShortcuts.HOME, handleKeydown);
  }, [handleHome, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        handleSearch();
      }
    }

    document.addEventListener(EShortcuts.SEARCH, handleKeydown);

    return () => document.removeEventListener(EShortcuts.SEARCH, handleKeydown);
  }, [handleSearch, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        handleList();
      }
    }

    document.addEventListener(EShortcuts.LIST, handleKeydown);

    return () => document.removeEventListener(EShortcuts.LIST, handleKeydown);
  }, [handleList, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        handleTags();
      }
    }

    document.addEventListener(EShortcuts.TAGS, handleKeydown);

    return () => document.removeEventListener(EShortcuts.TAGS, handleKeydown);
  }, [handleTags, isSearchOpen]);

  useEffect(() => {
    function handleKeydown() {
      if (!isSearchOpen) {
        push(ROUTES.NEW);
      }
    }

    document.addEventListener(EShortcuts.NEW, handleKeydown);

    return () => document.removeEventListener(EShortcuts.NEW, handleKeydown);
  }, [isSearchOpen, push]);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container>
          <Tooltip title={EShortcuts.HOME}>
            <IconButton onClick={handleHome}>
              <Icon />
            </IconButton>
          </Tooltip>

          <Title variant="h6">Excerpta</Title>
        </Container>

        <Container>
          <TopButton
            label="Search"
            onClick={handleSearch}
            icon={<SearchIcon />}
            tooltip={EShortcuts.SEARCH}
          />

          <TopButton
            icon={<ListIcon />}
            label="Full List"
            onClick={handleList}
            tooltip={EShortcuts.LIST}
          />

          <TopButton
            icon={<TagIcon />}
            label="Tags"
            onClick={handleTags}
            tooltip={EShortcuts.TAGS}
          />
          <MenuButton />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
