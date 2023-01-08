import Button from '@components/Editor/Button';
import Confirm from '@components/Editor/Confirm';
import Description from '@components/Editor/Description';
import InputGroup from '@components/Editor/InputGroup';
import Slug from '@components/Editor/Slug';
import Tags from '@components/Editor/Tags';
import Title from '@components/Editor/Title';
import { API, ROUTES } from '@constants';
import { useToast } from '@hooks/useToast';
import { findOne } from '@lib/snippets';
import { listAll as listAllTags } from '@lib/tags';
import { Backdrop, CircularProgress } from '@mui/material';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { forwardRef, useCallback, useReducer, useRef, useState } from 'react';

const MDEditor = dynamic(() => import('@components/Editor/MDEditor'), {
  ssr: false,
});

const ToastEditor = forwardRef(
  ({ initialValue }: { initialValue: string }, _ref) => (
    <MDEditor forwardedRef={_ref} initialValue={initialValue} />
  )
);

ToastEditor.displayName = 'ToastEditor';

type ISnippetAction =
  | { key: 'title' | 'slug' | 'description'; value: string }
  | { key: 'tags'; value: string[] };

export default function Editor({
  snippet,
  tagList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const toast = useToast();
  const router = useRouter();
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [{ title, slug, description, tags }, dispatch] = useReducer(
    (state: ISnippet, action: ISnippetAction) => {
      const { key, value } = action;
      if (!key || !value) {
        return state;
      }

      return { ...state, [key]: value };
    },
    {
      title: snippet?.title || '',
      slug: snippet?.slug || '',
      description: snippet?.description || '',
      tags: snippet?.tags?.map?.((t) => t.tag) || [],
    }
  );

  const handleAction = useCallback(
    (remove = false) =>
      async () => {
        try {
          setLoading(true);

          const req = await fetch(API.SNIPPETS, {
            method: remove ? 'DELETE' : !!snippet ? 'PATCH' : 'PUT',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(
              remove
                ? { slug }
                : {
                    title,
                    slug,
                    description,
                    tags,
                    snippet:
                      editorRef.current?.getInstance?.()?.getMarkdown?.() ?? '',
                  }
            ),
          });

          if (req.status >= 400) {
            throw new Error(req.statusText);
          }

          toast({ message: remove ? "Puf! It's gone..." : 'Snippet saved!' });

          setTimeout(
            () =>
              router.push(remove ? ROUTES.HOME : `${ROUTES.SNIPPETS}/${slug}`),
            25
          );
        } catch (error: any) {
          toast({ message: `${error?.message}`, severity: 'error' });
        } finally {
          setLoading(false);
        }
      },
    [snippet, slug, title, description, tags, toast, router]
  );

  return (
    <>
      <Backdrop open={loading} sx={{ zIndex: 2147483647 }}>
        <CircularProgress />
      </Backdrop>

      <InputGroup constant>
        <InputGroup invert>
          <Title
            value={title}
            onChange={(value) => {
              dispatch({ key: 'title', value });
            }}
          />

          {!!snippet && (
            <Button
              remove
              onClick={() => {
                setRemove(true);
              }}
            />
          )}

          <Button onClick={handleAction()} />
        </InputGroup>

        <InputGroup>
          <Slug
            value={slug}
            title={title}
            disabled={!!snippet}
            onChange={(value) => {
              dispatch({ key: 'slug', value });
            }}
          />

          <Tags
            value={tags}
            options={tagList}
            onChange={(value) => {
              dispatch({ key: 'tags', value });
            }}
          />
        </InputGroup>

        <Description
          value={description}
          onChange={(value) => {
            dispatch({ key: 'description', value });
          }}
        />

        <ToastEditor ref={editorRef} initialValue={snippet?.snippet || ' '} />
      </InputGroup>

      {remove && (
        <Confirm
          onAccept={handleAction(true)}
          onClose={() => {
            setRemove(false);
          }}
        />
      )}
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    const slug = params?.slug?.[0];

    const tagList = await listAllTags();

    if (!slug || /new/i.test(slug)) {
      return { props: { tagList } };
    }

    const snippet = await findOne(slug);

    if (!snippet) {
      throw new Error(`Snipet ${slug} not found`);
    }

    return {
      props: {
        snippet,
        tagList,
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
