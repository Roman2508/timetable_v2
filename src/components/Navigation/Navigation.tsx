import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { Box, List, Typography } from '@mui/material'

// project import
import NavItem from './NavItem'
import menuItems from '../../menu-items'

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const Navigation: React.FC = () => {
  const { drawerOpen } = useSelector((state: any) => state.menu)

  return (
    <>
      {menuItems.items.map((item) => (
        <List
          subheader={
            item.title &&
            drawerOpen && (
              <Box sx={{ pl: 3, mb: 1.5 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.title}
                </Typography>
              </Box>
            )
          }
          sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
          {item.children.map((menuItem) => (
            <NavItem key={menuItem.id} item={menuItem} level={1} />
          ))}

          {/* {navCollapse} */}
        </List>
      ))}
    </>
  )
}

export { Navigation }
