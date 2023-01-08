import useDebouncedEffect from '@hooks/useDebouncedEffect';
import { useTheme } from '@hooks/useTheme';
import { TextField } from '@mui/material';
import { memo, useState } from 'react';

function Description({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { isDark } = useTheme();
  const [description, setDescription] = useState<string>(value);

  useDebouncedEffect(() => {
    onChange(description);
  }, [description, onChange]);

  return (
    <TextField
      required
      fullWidth
      multiline
      id="description"
      label="Description"
      variant="outlined"
      rows={2}
      value={description}
      color={isDark ? 'secondary' : 'primary'}
      onChange={(e) => setDescription(e.target.value)}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default memo(Description);
