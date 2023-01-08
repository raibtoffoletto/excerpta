import { ROUTES } from '@constants';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function SnippetCard({
  title,
  slug,
  tags,
  description,
}: SnippetDTO) {
  const router = useRouter();

  return (
    <Card elevation={4}>
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
            {tags?.map?.((x) => (
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
    </Card>
  );
}
