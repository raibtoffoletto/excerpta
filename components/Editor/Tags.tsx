import useDebouncedEffect from '@hooks/useDebouncedEffect';
import { useTheme } from '@hooks/useTheme';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { memo, useState } from 'react';

function Tags({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (val: string[]) => void;
}) {
  const { isDark } = useTheme();
  const [tags, setTags] = useState<string[]>(value);

  useDebouncedEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth
      id="tags"
      options={options}
      color={isDark ? 'secondary' : 'primary'}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            variant="outlined"
            label={option}
            key={option}
          />
        ))
      }
      value={tags}
      onChange={(e, v) => setTags(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

export default memo(Tags);
