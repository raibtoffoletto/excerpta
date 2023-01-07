import { Box, styled } from '@mui/material';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'unset',
  gap: theme.spacing(3),
  justifyContent: 'center',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export default Wrapper;
