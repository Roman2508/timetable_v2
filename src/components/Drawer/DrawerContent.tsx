import SimpleBar from '../third-party/SimpleBar'
import { Navigation } from '../Navigation/Navigation'

// material-ui
import { useTheme } from '@mui/material/styles'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme()

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Navigation />
    </SimpleBar>
  )
}

export default DrawerContent
