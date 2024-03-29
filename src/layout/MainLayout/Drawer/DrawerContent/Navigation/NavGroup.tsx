import { useSelector } from 'react-redux'

// material-ui
import { Box, List, Typography } from '@mui/material'

// project import
import NavItem from './NavItem'
import { MenuItemType } from '../../../../../menu-items'

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

interface INavGroupProps {
  item: MenuItemType
}

const NavGroup: React.FC<INavGroupProps> = ({ item }) => {
  const menu = useSelector((state: any) => state.menu)
  const { drawerOpen } = menu

  return (
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
  )
}

export default NavGroup
