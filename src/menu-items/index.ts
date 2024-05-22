// project import
import pages from './pages'
import dashboard from './dashboard'
import utilities from './utilities'
import support from './support'
import grade from './grade'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, pages, grade, utilities, support],
}

export type MenuItemType = (typeof menuItems.items)[0]

export default menuItems
