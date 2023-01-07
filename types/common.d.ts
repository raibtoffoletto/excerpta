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

interface IPaginated<T> {
  limit: number;
  offset: number;
  count: number;
  records: T[];
}

interface SnippetDTO {
  title: string;
  slug: string;
  description: string;
  tags: { tag: string }[];
}
