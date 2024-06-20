import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Toolbar } from '@mui/material'
// import { useTheme } from '@mui/material/styles'

import Header from './Header'
import navigation from '../../menu-items'
import { useAppDispatch } from '../../store/store'
import { openDrawer } from '../../store/menu/menuSlice'
import AppAlert from '../../components/AppAlert/AppAlert'
import MainDrawer from '../../components/Drawer/MainDrawer'
import Breadcrumbs from '../../components/@extended/Breadcrumbs'
import { settingsSelector } from '../../store/settings/settingsSlice'
import { getSettings } from '../../store/settings/settingsAsyncActions'

const MainLayout = () => {
  const { settings } = useSelector(settingsSelector)

  // const theme = useTheme()
  // const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'))
  const dispatch = useAppDispatch()

  const { drawerOpen } = useSelector((state: any) => state.menu)

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen)
  const handleDrawerToggle = () => {
    setOpen(!open)
    dispatch(openDrawer({ drawerOpen: !open }))
  }

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen])

  // get settings
  useEffect(() => {
    if (settings) return
    dispatch(getSettings(1))
  }, [])

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth: '1800px',
          margin: '0 auto',
          flexGrow: 1,
          // p: { xs: 2, sm: 3 },
          p: '24px 12px',
        }}
      >
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        <AppAlert />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
