import Topbar from '@components/Topbar/Bar';
import { Container, styled } from '@mui/material';

const AppContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create('all'),
}));

export default function Layout({ children }: IChildren) {
  return (
    <AppContainer maxWidth={false} disableGutters>
      <Topbar />
      <Container
        maxWidth="xl"
        sx={{
          px: 2,
          py: { xs: 8, sm: 10, md: 12, lg: 14, xl: 16 },
          position: 'relative',
          flexGrow: 1,
        }}
      >
        {children}
      </Container>
    </AppContainer>
  );
}
