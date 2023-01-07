import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, useCallback, useContext, useState } from 'react';

type DoToast = (args: IToast) => void;

const ToastContext = createContext<DoToast>(() => undefined);

export function useToast() {
  return useContext(ToastContext);
}

export function ProvideToast({ children }: IChildren) {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [toastDuration, setToastDuration] = useState(5000);

  const doToast: DoToast = useCallback(({ message, severity, duration }) => {
    setToastMessage(message);
    setToastSeverity(severity ?? 'success');
    setToastDuration(duration ?? 5000);
    setToast(true);
  }, []);

  return (
    <ToastContext.Provider value={doToast}>
      <Snackbar
        open={toast}
        autoHideDuration={toastDuration}
        onClose={() => setToast(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setToast(false)}
          severity={toastSeverity as AlertColor}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      {children}
    </ToastContext.Provider>
  );
}

export default ToastContext;
