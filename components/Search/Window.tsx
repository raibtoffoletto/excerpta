import { API } from '@constants';
import { Box, Chip, CircularProgress, Modal, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './Header';
import Message from './Message';
import Results from './Results';

export default function Search() {
  const { asPath, push } = useRouter();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(
    decodeURI(asPath.split('?search=')?.[1] ?? '')
  );
  const [tag, setTag] = useState(decodeURI(asPath.split('?tag=')?.[1] ?? ''));
  const [count, setCount] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<SnippetDTO[]>([]);

  const amountLeft = useMemo(
    () => (count ?? 0) - results?.length,
    [count, results?.length]
  );

  const handleClose = useCallback(() => {
    setOpen(false);

    setTimeout(() => {
      push(decodeURI(asPath.split('?')?.[0] ?? '/'));
    }, 333);
  }, [asPath, push]);

  const doSearch = useCallback(async () => {
    if (!query && !tag) {
      setCount(undefined);
      setResults([]);

      return;
    }

    try {
      setLoading(true);

      const req = await fetch(API.SEARCH, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify({
          tag,
          query,
        }),
      });

      if (req.status >= 400) {
        throw new Error(req.statusText);
      }

      const res = await req.json();

      const { count: _count, records }: IPaginated<SnippetDTO> = res;

      await new Promise((res) => setTimeout(res, 666));

      setCount(_count ?? 0);
      setResults(records);
    } catch (error: any) {
      console.log(`[ERROR]: ${error?.message}`); // eslint-disable-line

      setCount(undefined);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [tag, query]);

  useEffect(() => {
    doSearch();
  }, [doSearch]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 2,
          gap: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: { xs: 1, sm: 0 },
          maxWidth: { xs: 'unset', sm: 512 },
          height: { xs: 'unset', sm: 420 },
          borderRadius: { xs: 0, sm: 1 },
          overflowX: 'auto',
        }}
      >
        <Header
          initialValue={!!query ? query : tag}
          onChange={(value) => {
            setTag('');
            setQuery(value);
          }}
          disabled={!!tag}
          onClose={handleClose}
        />

        <Box
          sx={{
            mt: 1,
            flexGrow: 1,
            overflowX: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {!!tag && (
            <Chip
              label={tag}
              variant="outlined"
              sx={{
                width: 'fit-content',
                fontSize: `1.2rem`,
                borderRadius: `18px`,
                padding: `6px`,
                margin: `6px`,
                height: `32px`,
                alignSelf: 'center',
              }}
              onDelete={() => {
                setQuery(tag);
                setTag('');
              }}
            />
          )}

          {!!loading && (
            <CircularProgress
              size="2rem"
              thickness={6}
              sx={{
                position: 'fixed',
                top: 'calc(50% - 1rem)',
                left: 'calc(50% - 1rem)',
              }}
            />
          )}

          {!loading && count === undefined ? (
            <Message>Type something to perform a seach</Message>
          ) : !loading && count === 0 ? (
            <Message>No records found</Message>
          ) : (
            !loading && <Results results={results} amountLeft={amountLeft} />
          )}
        </Box>
      </Paper>
    </Modal>
  );
}
