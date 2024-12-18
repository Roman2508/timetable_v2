import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material"
// import { useTheme } from '@mui/material/styles'

import navigation from "../../menu-items"
import { useAppDispatch } from "../../store/store"
import Header from "../../components/Header/Header"
import { openDrawer } from "../../store/menu/menuSlice"
import AppAlert from "../../components/AppAlert/AppAlert"
import { authSelector } from "../../store/auth/authSlice"
import MainDrawer from "../../components/Drawer/MainDrawer"
import Breadcrumbs from "../../components/@extended/Breadcrumbs"
import { settingsSelector } from "../../store/settings/settingsSlice"
import { getSettings } from "../../store/settings/settingsAsyncActions"

const MainLayout = () => {
  const navigate = useNavigate()

  const theme = useTheme()

  const { user } = useSelector(authSelector)
  const { settings } = useSelector(settingsSelector)

  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"))

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

  if (!user) navigate("/auth")

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />

      {matchDownMD && <MainDrawer open={open} handleDrawerToggle={handleDrawerToggle} />}
      <Box
        component="main"
        sx={{
          width: "100%",
          maxWidth: "1800px",
          margin: "0 auto",
          flexGrow: 1,
          overflowY: "hidden",
          p: "30px 12px 24px",
          // p: `${drawerOpen ? "84px" : "24px"} 12px 24px `,
          transition: "all .3s linear",
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
