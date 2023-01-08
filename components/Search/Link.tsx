import { ROUTES } from '@constants';
import { ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';

export default function Link({
  slug,
  primary,
  secondary,
}: {
  slug: string;
  primary: string;
  secondary: string;
}) {
  const { push } = useRouter();

  return (
    <ListItemButton
      onClick={() => push(`${ROUTES.SNIPPETS}/${slug}`)}
      sx={{ flexGrow: 0 }}
    >
      <ListItemText primary={primary} secondary={secondary} />
    </ListItemButton>
  );
}
