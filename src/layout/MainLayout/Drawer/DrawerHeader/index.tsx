// material-ui
import { useTheme } from '@mui/material/styles'
import { Stack, Chip } from '@mui/material'

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled'
import Logo from '../../../../components/Logo'

// ==============================|| DRAWER HEADER ||============================== //

interface IDrawerHeaderProps {
  open: boolean
}

const DrawerHeader: React.FC<IDrawerHeaderProps> = ({ open }) => {
  const theme = useTheme()

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo />
        <Chip label={'beta'} size="small" sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }} />
      </Stack>
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
