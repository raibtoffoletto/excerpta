import { AppTheme, STORE } from '@constants';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IThemeContext {
  toggleTheme: () => void;
  colorAccent: string;
  colorAccentContrast: string;
  colorAccentAlias: 'primary' | 'secondary';
  isDark: boolean;
}

const ThemeContext = createContext<IThemeContext>({
  toggleTheme: () => undefined,
  colorAccent: '',
  colorAccentContrast: '',
  colorAccentAlias: 'primary',
  isDark: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ProvideTheme({ children }: IChildren) {
  const [darkTheme, setDarkTheme] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem(STORE.DARK_MODE) === 'true'
      : false
  );

  const isDark = useMemo(() => !!darkTheme, [darkTheme]);

  const toggleTheme = useCallback(
    () =>
      setDarkTheme((_theme) => {
        const next = !_theme;

        localStorage.setItem(STORE.DARK_MODE, !!next ? 'true' : 'false');

        return next;
      }),
    []
  );

  const colorAccent = useMemo(
    () => (!!isDark ? AppTheme.secondary : AppTheme.primary),
    [isDark]
  );

  const colorAccentContrast = useMemo(
    () => (!!isDark ? AppTheme.primary : AppTheme.secondary),
    [isDark]
  );

  const colorAccentAlias = useMemo(
    () => (!!isDark ? 'secondary' : 'primary'),
    [isDark]
  );

  const backgroundOverride = isDark
    ? {}
    : {
        background: {
          default: '#FAFAF6',
          paper: '#FAFAFC',
        },
      };

  const appTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',

      primary: {
        main: AppTheme.primary,
      },

      secondary: {
        main: AppTheme.secondary,
      },

      ...backgroundOverride,
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        colorAccent,
        colorAccentAlias,
        colorAccentContrast,
      }}
    >
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
