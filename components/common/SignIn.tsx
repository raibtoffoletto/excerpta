import { AppTheme } from '@constants';
import { useAuth } from '@hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Collapse,
  Container,
  createTheme,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Icon from './Icon';

const SignInContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  backgroundColor: AppTheme.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SignInForm = styled('form')(({ theme }) => ({
  margin: 0,
  width: theme.spacing(40),
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const SignInTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: AppTheme.secondary,
}));

const AppIcon = styled(Icon)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  marginRight: theme.spacing(1),
}));

export default function SignInPage() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signInTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleSignin = useCallback(async () => {
    try {
      setLoading(true);

      await signIn(password);
    } catch ({ message }) {
      setErrorMessage(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }, [signIn, password]);

  useEffect(() => {
    let clear: NodeJS.Timeout | undefined = undefined;

    if (!!errorMessage) {
      setError(true);

      clear = setTimeout(() => {
        setError(false);

        setTimeout(() => {
          setErrorMessage('');
        }, 300);
      }, 5000);
    }

    return () => clearTimeout(clear);
  }, [errorMessage]);

  return (
    <ThemeProvider theme={signInTheme}>
      <SignInContainer maxWidth={false} disableGutters>
        <SignInForm
          onSubmit={(ev) => {
            ev.preventDefault();

            if (!!password) {
              handleSignin();
            }
          }}
        >
          <SignInTitle variant="h4" paragraph>
            <AppIcon />
            Excerpta
          </SignInTitle>

          <TextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="dense"
            label="Password"
            fullWidth
            required
            autoFocus
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() => setShowPassword((_) => !_)}
                  sx={{ height: '56px', borderRadius: 0 }}
                >
                  {showPassword ? 'hide' : 'show'}
                </Button>
              ),
              sx: {
                p: 0,
              },
            }}
          />

          <LoadingButton
            disabled={!!!password}
            loading={loading}
            loadingPosition="center"
            size="large"
            type="submit"
          >
            Sign In
          </LoadingButton>

          <Box width="100%" minHeight="32px">
            <Collapse in={!!error} timeout={500}>
              <Typography
                variant="body1"
                component="div"
                color="error.main"
                align="center"
                sx={{ fontWeight: 500 }}
              >
                {errorMessage}
              </Typography>
            </Collapse>
          </Box>
        </SignInForm>
      </SignInContainer>
    </ThemeProvider>
  );
}
