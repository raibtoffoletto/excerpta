import { Box } from '@mui/material';

export default function InputGroup({
  invert,
  constant,
  children,
}: IChildren<{ invert?: boolean; constant?: boolean }>) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: invert ? 'column-reverse' : 'column',
          sm: !constant ? 'row' : undefined,
        },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}
