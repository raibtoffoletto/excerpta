import { Typography } from '@mui/material';

export default function Message({ children }: IChildren) {
  return (
    <Typography
      textAlign="center"
      color="secondary"
      variant="h6"
      component="div"
      sx={{
        position: 'fixed',
        top: 'calc(50% - 16px)',
        maxWidth: 'calc(100% - 32px)',
        width: 480,
      }}
    >
      {children}
    </Typography>
  );
}
