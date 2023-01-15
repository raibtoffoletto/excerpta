import ActionFab from '@components/common/ActionFab';
import Wrapper from '@components/common/Wrapper';
import SnippetCard from '@components/Snippets/SnippetCard';
import { list } from '@lib/snippets';
import type { InferGetServerSidePropsType } from 'next/types';

export default function Home({
  records,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Wrapper
        sx={{
          display: 'grid',
          width: '100%',
          maxWidth: '100%',
          gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
        }}
      >
        {records?.map((snippet) => (
          <SnippetCard key={snippet?.slug} {...snippet} />
        ))}
      </Wrapper>

      <ActionFab />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { records } = await list({ limit: 12 });

    return {
      props: {
        records,
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
