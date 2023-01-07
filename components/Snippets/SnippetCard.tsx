import { ROUTES } from '@constants';
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  Chip,
  styled,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const Wrapper = styled(MuiCard)(({ theme }) => ({
  minWidth: '300px',
  flexBasis: '100%',
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    flexBasis: 'calc(50% - 16px)',
  },
  [theme.breakpoints.up('md')]: {
    flexBasis: 'calc(33% - 16px)',
  },
  [theme.breakpoints.up('lg')]: {
    flexBasis: 'calc(24% - 16px)',
  },
}));

export default function SnippetCard({
  title,
  slug,
  tags,
  description,
}: SnippetDTO) {
  const router = useRouter();

  return (
    <Wrapper elevation={4}>
      <CardActionArea
        onClick={() => {
          router.push(`${ROUTES.SNIPPETS}/${slug}`);
        }}
        sx={{ height: '100%' }}
      >
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Typography variant="h4" component="div" paragraph>
            {title}
          </Typography>
          <Typography textAlign="justify" sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {tags.map((x) => (
              <Chip
                key={x.tag}
                label={x.tag}
                variant="outlined"
                size="small"
                sx={{
                  my: 1,
                  mx: 0.5,
                  color: 'action.active',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Wrapper>
  );
}
