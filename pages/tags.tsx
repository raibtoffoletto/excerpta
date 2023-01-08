import { useTheme } from '@hooks/useTheme';
import { list } from '@lib/tags';
import { Box, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType } from 'next/types';

export default function Tags({
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, asPath } = useRouter();
  const { isDark } = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '100%', sm: '62%' },
          maxWidth: 900,
          flexWrap: 'wrap',
          margin: '0 auto',
        }}
      >
        {tags?.map?.((t) => (
          <Chip
            key={`${t.tag}`}
            label={`${t.tag}`}
            variant="outlined"
            color={isDark ? 'secondary' : 'primary'}
            sx={{
              fontSize: `${t.percent}rem`,
              borderRadius: `calc(18px * ${t.percent})`,
              padding: `calc(6px * ${t.percent})`,
              margin: `calc(6px * ${t.percent})`,
              height: `calc(28px * ${t.percent})`,
            }}
            onClick={() => {
              push(`${asPath}?tag=${t.tag}`);
            }}
          />
        ))}
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  try {
    return {
      props: {
        tags: await list(),
      },
    };
  } catch (error) {
    // eslint-disable-next-line
    console.log('-----\n[error]:\n', error);

    return {
      notFound: true,
    };
  }
}
