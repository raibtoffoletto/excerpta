import ActionFab from '@components/common/ActionFab';
import SnippetItem from '@components/Snippets/SnippetItem';
import { API } from '@constants';
import { Box, CircularProgress, Container, List } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const PAGINATION = 5;

interface Request {
  page?: number;
  status: boolean;
}

export default function SnippetList() {
  const requestRef = useRef<Request>({ status: false });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [snippets, setSnippets] = useState<SnippetDTO[]>([]);
  const [loaderRef, setLoaderRef] = useState<any>(null);

  const isLastPage = useMemo(() => {
    if (!snippets?.length) {
      return true;
    }

    const totalPages = Math.ceil(total / PAGINATION);

    const lastPage = Number.isNaN(totalPages) ? 1 : totalPages;

    return page + 1 === lastPage;
  }, [page, snippets?.length, total]);

  const loadSnippets = useCallback(async () => {
    if (!requestRef.current.status && requestRef.current?.page !== page) {
      try {
        requestRef.current.status = true;

        const req = await fetch(
          `${API.SEARCH}?limit=${PAGINATION}&page=${page}`
        );

        if (req.ok) {
          const { count, records }: IPaginated<SnippetDTO> = await req.json();

          setTotal((tot) => {
            if (!!count && tot !== count) {
              return count;
            }

            return tot;
          });

          setSnippets((list) => {
            if (!!records?.length) {
              return list.concat(records);
            }

            return list;
          });
        }
      } catch (error: any) {
        console.log(`[error]:`, error); // eslint-disable-line
      } finally {
        requestRef.current.status = false;
        requestRef.current.page = page;
      }
    }
  }, [page]);

  useEffect(() => {
    loadSnippets();
  }, [loadSnippets]);

  useEffect(() => {
    const handleObserver = (elements: IntersectionObserverEntry[]) => {
      if (
        !!elements?.[0]?.isIntersecting &&
        !!snippets?.length &&
        !isLastPage
      ) {
        setPage((pg) => pg + 1);
      }
    };

    let _ref: any;
    const observer = new IntersectionObserver(handleObserver);

    if (!!loaderRef) {
      _ref = loaderRef;

      observer.observe(loaderRef);
    }

    return () => {
      if (!!_ref) {
        observer.unobserve(_ref);
      }
    };
  }, [loaderRef, snippets?.length, isLastPage]);

  return (
    <>
      <Container maxWidth="lg" disableGutters>
        <List dense disablePadding>
          {snippets?.map((snippet) => (
            <SnippetItem key={snippet?.slug} {...snippet} />
          ))}
        </List>

        {!isLastPage && (
          <Box
            ref={setLoaderRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '4rem',
            }}
          >
            <CircularProgress size="2rem" />
          </Box>
        )}
      </Container>

      <ActionFab />
    </>
  );
}
