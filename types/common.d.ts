interface IToast {
  message: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
}

type IChildren<T = object> = T & { children: React.ReactNode };

type TVoid = () => void;

interface IDevice {
  code: string;
  lastUse: string;
  os: string;
  browser: string;
}
