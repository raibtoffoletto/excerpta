import Topbar from '@components/Topbar/Bar';
import { Container, styled } from '@mui/material';

const AppContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '90vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export default function Layout({ children }: IChildren) {
  return (
    <AppContainer maxWidth={false} disableGutters>
      <Topbar />
      <Container
        maxWidth="xl"
        sx={{
          px: 2,
          py: { xs: 6, sm: 8, md: 10, lg: 12, xl: 14 },
          position: 'relative',
          flexGrow: 1,
        }}
      >
        {children}
      </Container>
    </AppContainer>
  );
}
