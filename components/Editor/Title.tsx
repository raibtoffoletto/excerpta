import useDebouncedEffect from '@hooks/useDebouncedEffect';
import { useTheme } from '@hooks/useTheme';
import { TextField } from '@mui/material';
import { memo, useState } from 'react';

function Title({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { isDark } = useTheme();
  const [title, setTitle] = useState<string>(value);

  useDebouncedEffect(() => {
    onChange(title);
  }, [title, onChange]);

  return (
    <TextField
      required
      fullWidth
      id="title"
      label="Title"
      variant="outlined"
      color={isDark ? 'secondary' : 'primary'}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default memo(Title);
