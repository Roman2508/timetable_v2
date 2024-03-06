// material-ui
import { useTheme } from '@mui/material/styles'
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material'

// project import
import AppBarStyled from './AppBarStyled'
import HeaderContent from './HeaderContent'

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React from 'react'

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

interface IHeaderProps {
  open: boolean
  handleDrawerToggle: () => void
}

const Header: React.FC<IHeaderProps> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  const iconBackColor = 'grey.100'
  const iconBackColorOpen = 'grey.200'

  // common header
  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  )

  // app-bar params
  const appBar = {
    position: 'fixed' as 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky' | undefined,
    color: 'inherit' as 'error' | 'info' | 'success' | 'warning' | 'transparent',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1
    },
  }

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  )
}

export default Header
