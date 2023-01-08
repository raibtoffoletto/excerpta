import ActionFab from '@components/common/ActionFab';
import SnippetContent from '@components/Snippets/SnippetContent';
import { findOne } from '@lib/snippets';
import { Box, Chip, Divider, Typography } from '@mui/material';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function SnippetView({
  codeSnippet,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { asPath, push } = useRouter();

  if (!codeSnippet) {
    return null;
  }

  const { slug, title, description, snippet, tags } = codeSnippet;

  return (
    <>
      <Typography variant="h3" component="h1" textAlign="center">
        {title}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
        {tags.map((x) => (
          <Chip
            key={x.tag}
            label={x.tag}
            variant="outlined"
            sx={{ mx: 1 }}
            onClick={() => {
              push(`${asPath}?tag=${x.tag}`);
            }}
          />
        ))}
      </Box>

      <Typography
        variant="h6"
        component="h2"
        textAlign="center"
        sx={{
          color: 'action.active',
          px: 2,
          maxWidth: { xs: '100%', sm: '62%' },
          margin: '0 auto',
        }}
      >
        {description}
      </Typography>

      <Divider sx={{ width: '38%', margin: '16px auto' }} />

      <SnippetContent>{snippet}</SnippetContent>

      <ActionFab slug={slug} />
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    const slug = `${params?.slug ?? ''}`;

    const codeSnippet = await findOne(slug);

    if (!codeSnippet) {
      throw new Error(`Snippet ${slug} not found`);
    }

    return {
      props: {
        codeSnippet,
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
