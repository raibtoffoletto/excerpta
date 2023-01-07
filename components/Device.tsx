import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { getOSIcon, OS, OSList } from 'react-os-icons';

interface DeviceProps extends IDevice {
  onRemove: (code: string) => Promise<void>;
  isCurrent: boolean;
  disabled: boolean;
}

export default function Device({
  browser,
  disabled,
  code,
  isCurrent,
  lastUse,
  onRemove,
  os,
}: DeviceProps) {
  return (
    <Card
      elevation={4}
      sx={{
        minWidth: { xs: 0, sm: '360px' },
        padding: ({ spacing }) => spacing(1.5),
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 0,
          paddingBottom: '0 !important',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <Box sx={{ px: 1, pt: 0.5, display: { xs: 0, sm: 'flex' } }}>
            {getOSIcon({
              os: OSList.includes(os) ? (os as OS) : 'Unix',
              size: 48,
            })}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              mr: 2,
            }}
          >
            <Typography variant="h6">{browser}</Typography>

            <Typography paragraph>
              {new Date(lastUse).toLocaleString('en-gb', {
                hour12: false,
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </Typography>

            {!!isCurrent ? (
              <Typography sx={{ color: 'grey.500', textAlign: 'center' }}>
                <em>Current</em>
              </Typography>
            ) : (
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ color: 'error.dark' }}
                onClick={() => onRemove(code)}
                disabled={disabled}
              >
                remove device
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
