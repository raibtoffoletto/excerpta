interface IToast {
  message: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
}

type IChildren<T = {}> = T & { children: React.ReactNode };
