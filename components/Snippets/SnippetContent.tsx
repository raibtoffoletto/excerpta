import { useTheme } from '@hooks/useTheme';
import { alpha, styled, TypographyProps } from '@mui/material';
import { lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeProps, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';
import { Prism as RSHl } from 'react-syntax-highlighter';
import { darcula, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const ChevronRight = lazy(() => import('@mui/icons-material/ChevronRight'));
const Box = lazy(() => import('@mui/material/Box'));
const List = lazy(() => import('@mui/material/List'));
const ListItem = lazy(() => import('@mui/material/ListItem'));
const ListItemAvatar = lazy(() => import('@mui/material/ListItemAvatar'));
const ListItemText = lazy(() => import('@mui/material/ListItemText'));
const Paper = lazy(() => import('@mui/material/Paper'));
const Table = lazy(() => import('@mui/material/Table'));
const TableBody = lazy(() => import('@mui/material/TableBody'));
const TableCell = lazy(() => import('@mui/material/TableCell'));
const TableHead = lazy(() => import('@mui/material/TableHead'));
const TableRow = lazy(() => import('@mui/material/TableRow'));
const Typography = lazy(() => import('@mui/material/Typography'));

const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.text.primary, 0.1),
  color: theme.palette.text.primary,
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '1rem !important',
  fontFamily: 'monospace',
}));

type TTypographyVariant = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const TypographyVariant = (variant: TTypographyVariant) => {
  // eslint-disable-next-line
  return ({ node, children, ...props }: ReactMarkdownProps) => {
    function getProps(): TypographyProps {
      switch (variant) {
        case 'h2':
          return {
            variant,
            ...props,
            sx: {
              my: 4,
              fontSize: '2.1rem !important',
              fontWeight: 100,
            },
          };
        case 'h3':
          return {
            variant,
            ...props,
            sx: {
              my: 4,
              fontSize: '1.8rem !important',
              fontWeight: 100,
            },
          };
        case 'h4':
          return {
            variant,
            ...props,
            sx: {
              my: 4,
              fontSize: '1.5rem !important',
              fontWeight: 300,
            },
          };
        case 'h5':
          return {
            variant,
            ...props,
            sx: {
              my: 4,
              fontSize: '1.3rem !important',
              fontWeight: 300,
            },
          };
        case 'h6':
          return {
            variant,
            ...props,
            sx: {
              my: 3,
              fontSize: '1.2rem !important',
              fontWeight: 500,
            },
          };
        case 'p':
          return {
            variant: 'body1',
            ...props,
            sx: {
              fontSize: '1.1rem !important',
              textIndent: 64,
            },
          };
        case 'h1':
        default:
          return {};
      }
    }

    return (
      <Typography {...getProps()} paragraph textAlign="justify">
        {children}
      </Typography>
    );
  };
};

type TListVariant = 'ul' | 'li';

const ListVariant = (variant: TListVariant) => {
  // eslint-disable-next-line
  return ({
    node, // eslint-disable-line
    children,
    ordered,
    ...props
  }: ReactMarkdownProps & { ordered: boolean }) => {
    if (variant === 'ul') {
      return <List {...props}>{children}</List>;
    }

    return (
      <ListItem {...props} sx={{ py: 0 }}>
        {!!ordered ? (
          <ListItemText
            // eslint-disable-next-line
            primary={`${props?.index ?? 0 + 1})`}
            sx={{ flex: 'unset', mr: 1 }}
          />
        ) : (
          <ListItemAvatar
            sx={{
              display: 'flex',
              alignItems: 'flex',
              minWidth: 0,
            }}
          >
            <ChevronRight />
          </ListItemAvatar>
        )}
        <ListItemText primary={children} />
      </ListItem>
    );
  };
};

function Blockquote({ children }: IChildren) {
  return (
    <Paper
      sx={{
        p: 2,
        mx: 2,
        mt: 4,
        mb: 6,
        width: 'calc(100% - 32px)',
        '& p': { margin: 0, textIndent: '0 !important' },
      }}
      elevation={4}
    >
      {children}
    </Paper>
  );
}

function Invisible({ children }: IChildren) {
  return <>{children}</>;
}

//IChildren<{inline: boolean, className: string}>
function CodeBlock({ inline, className, children }: CodeProps) {
  const { isDark } = useTheme();

  if (!!inline) {
    return <InlineCode>{children}</InlineCode>;
  }

  return (
    <Box
      sx={{
        my: 4,
        '& p': { margin: 0, textIndent: '0 !important' },
        '& *': { textShadow: 'none !important' },
      }}
    >
      <RSHl
        language={`${className}`?.split?.('-')?.[1] ?? 'javascript'}
        showLineNumbers
        wrapLongLines
        style={isDark ? darcula : prism}
      >
        {`${children}`}
      </RSHl>
    </Box>
  );
}

type TTableVariant = 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td';

const TableVariant = (variant: TTableVariant) => {
  // eslint-disable-next-line
  return ({ node, children, ...props }: ReactMarkdownProps) => {
    switch (variant) {
      case 'table':
        return <Table {...props}>{children}</Table>;
      case 'thead':
        return <TableHead {...props}>{children}</TableHead>;
      case 'tbody':
        return <TableBody {...props}>{children}</TableBody>;
      case 'tr':
        return <TableRow {...props}>{children}</TableRow>;
      case 'th':
        return <TableCell {...props}>{children}</TableCell>;
      case 'td':
        return <TableCell {...props}>{children}</TableCell>;
      default:
        return null;
    }
  };
};

export default function SnippetContent({ children }: IChildren) {
  return (
    <Suspense fallback={null}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          p: TypographyVariant('p'),
          h1: TypographyVariant('h1'),
          h2: TypographyVariant('h2'),
          h3: TypographyVariant('h3'),
          h4: TypographyVariant('h4'),
          h5: TypographyVariant('h5'),
          h6: TypographyVariant('h6'),
          ul: ListVariant('ul'),
          ol: ListVariant('ul'),
          li: ListVariant('li'),
          table: TableVariant('table'),
          thead: TableVariant('thead'),
          tbody: TableVariant('tbody'),
          tr: TableVariant('tr'),
          th: TableVariant('th'),
          td: TableVariant('td'),
          pre: Invisible,
          code: CodeBlock,
          blockquote: Blockquote,
        }}
      >
        {`${children}`}
      </ReactMarkdown>
    </Suspense>
  );
}
