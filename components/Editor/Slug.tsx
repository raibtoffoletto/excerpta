import useDebouncedEffect from '@hooks/useDebouncedEffect';
import { useTheme } from '@hooks/useTheme';
import { TextField } from '@mui/material';
import { memo, useState } from 'react';

function getSlug(title = '') {
  return `${title}`
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_=+[\]{}'",<.>/?\\|]/g, '')
    .replace(/\s/g, '-');
}

function Slug({
  title,
  value,
  disabled,
  onChange,
}: {
  title: string;
  value: string;
  disabled: boolean;
  onChange: (val: string) => void;
}) {
  const { isDark } = useTheme();
  const [slug, setSlug] = useState<string>(value);

  useDebouncedEffect(() => {
    onChange(slug || getSlug(title));
  }, [slug, onChange]);

  return (
    <TextField
      required
      fullWidth
      id="slug"
      label="Slug"
      variant="outlined"
      disabled={disabled}
      value={slug || getSlug(title)}
      color={isDark ? 'secondary' : 'primary'}
      onChange={(e) => setSlug(getSlug(e.target.value))}
      sx={{ flexBasis: { xs: '100%', sm: '33%' } }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default memo(Slug);
