import { EShortcuts } from '@constants';
import useDebouncedEffect from '@hooks/useDebouncedEffect';
import { Close, Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Header({
  initialValue,
  disabled,
  onClose,
  onChange: setUpstream,
}: {
  initialValue: string;
  disabled: boolean;
  onClose: () => void;
  onChange: (val: string) => void;
}) {
  const [query, setQuery] = useState(initialValue);
  const searchRef = useRef<any>(null);

  const handleKeydown = useCallback(() => {
    if (!!searchRef?.current) {
      searchRef.current?.focus?.();
    }
  }, []);

  useEffect(() => {
    document.addEventListener(EShortcuts.SEARCH_FOCUS, handleKeydown);

    return () => {
      document.removeEventListener(EShortcuts.SEARCH_FOCUS, handleKeydown);
    };
  }, [handleKeydown]);

  useDebouncedEffect(() => {
    if (!disabled) {
      setUpstream(query.trim());
    }
  }, [setUpstream, query]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search"
        value={query}
        disabled={disabled}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        InputProps={{
          inputRef: searchRef,
          startAdornment: (
            <IconButton
              size="small"
              disabled={disabled}
              onClick={() => {
                if (!!query) {
                  setQuery('');
                } else {
                  handleKeydown();
                }
              }}
              sx={{
                p: 0.5,
                transform: 'translateX(-6px)',
                color: 'grey.500',
              }}
            >
              {!!query ? <Close /> : <SearchIcon />}
            </IconButton>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                component="span"
                sx={{
                  color: 'grey.500',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {EShortcuts.SEARCH_FOCUS.replaceAll('+', ' + ')}
              </Typography>
            </InputAdornment>
          ),
        }}
      />

      <Tooltip title={'ESC'}>
        <IconButton onClick={onClose} sx={{ mx: -1 }}>
          <Close />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
