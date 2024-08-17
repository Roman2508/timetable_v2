import structure from "./structure"
import studyLoad from "./study-load"
import accounts from "./accounts"
import timetable from "./timetable"
import generalInfo from "./general-info"
import settings from "./settings"

const menuItems = {
  items: [structure, studyLoad, accounts, timetable, generalInfo, settings],
}

export type MenuItemType = (typeof menuItems.items)[0]

export default menuItems
