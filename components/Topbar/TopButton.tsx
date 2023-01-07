import {
  Button as MuiButton,
  Hidden,
  IconButton as MuiIconButton,
  styled,
  Theme,
  Tooltip,
} from '@mui/material';

export function styledButton({ theme }: { theme: Theme }) {
  return {
    marginLeft: theme.spacing(1),

    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
      marginLeft: theme.spacing(1.5),
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: '1.25rem',
      marginLeft: theme.spacing(2),
    },

    [theme.breakpoints.up('xl')]: {
      fontSize: '1.5rem',
    },

    '&:not(.menuButton)': {
      padding: `6px ${theme.spacing(1)}`,

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1),
      },

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(1, 3),
      },
    },

    '& svg': {
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },

      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },

      [theme.breakpoints.up('xl')]: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
    },
  };
}

const IconButton = styled(MuiIconButton)(styledButton);

const Button = styled(MuiButton)(styledButton);

export default function TopBarButton({
  label,
  icon,
  onClick,
  tooltip,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: TVoid;
  tooltip: string;
}) {
  return (
    <>
      <Hidden smUp>
        <Tooltip title={tooltip}>
          <IconButton size="large" color="secondary" onClick={onClick}>
            {icon}
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden smDown>
        <Tooltip title={tooltip}>
          <Button startIcon={icon} color="secondary" onClick={onClick}>
            {label}
          </Button>
        </Tooltip>
      </Hidden>
    </>
  );
}
