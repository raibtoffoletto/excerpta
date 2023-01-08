import { ROUTES } from '@constants';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { memo } from 'react';

function SnippetItem({ slug, title, description, tags }: SnippetDTO) {
  const { push } = useRouter();

  return (
    <ListItemButton
      disableGutters
      onClick={() => {
        push(`${ROUTES.SNIPPETS}/${slug}`);
      }}
      sx={{
        mb: 1,
        px: { xs: 1, sm: 2, md: 3 },
        alignItems: 'flex-start',
        backgroundColor: ({ palette }) => palette.background.paper,
      }}
    >
      <ListItemText
        primary={title}
        secondary={description}
        primaryTypographyProps={{
          fontSize: '1.2rem',
        }}
        secondaryTypographyProps={{
          fontSize: '0.9rem',
        }}
      />

      <ListItemIcon
        sx={{
          display: {
            xs: 'none',
            sm: 'inline-flex',
            flexDirection: 'column',
          },
          ml: 2,
          width: '64px',
          mt: 1,
          textAlign: 'right',
        }}
      >
        {tags?.map?.((x) => (
          <Typography
            key={x.tag}
            variant="caption"
            sx={{ display: 'block', color: 'grey.500' }}
            noWrap
          >
            {x.tag}
          </Typography>
        ))}
      </ListItemIcon>
    </ListItemButton>
  );
}

export default memo(SnippetItem);
