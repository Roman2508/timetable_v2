// material-ui
import { Theme, styled } from '@mui/material/styles'
import { Box, Stack, Chip, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
// import Logo from '../Logo/Logo'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

// ==============================|| DRAWER HEAD ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(open ? 3 : 0),
  })
)

interface IDrawerHeaderProps {
  open: boolean
}

const DrawerHeader: React.FC<IDrawerHeaderProps> = ({ open }) => {
  const theme = useTheme()

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <Logo /> */}

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'inherit' }}>
          <img src={Logo} width={50} />
          <Typography>ЖБФФК</Typography>
        </Link>

        <Chip label={'beta'} size="small" sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }} />
      </Stack>
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
