import { DeleteForever, Done } from '@mui/icons-material';
import { Button as MuiButton } from '@mui/material';

export default function Button({
  remove,
  onClick,
}: {
  remove?: boolean;
  onClick: () => void;
}) {
  return (
    <MuiButton
      color={remove ? 'error' : 'success'}
      variant="contained"
      startIcon={remove ? <DeleteForever /> : <Done />}
      onClick={onClick}
      sx={{
        px: 4,
        fontStretch: 'expanded',
        fontSize: '1.2rem',
      }}
    >
      {remove ? 'delete' : 'save'}
    </MuiButton>
  );
}
