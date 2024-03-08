// types
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

// initial state
const initialState = {
  openItem: ["dashboard"],
  defaultId: "dashboard",
  openComponent: "buttons",
  drawerOpen: false,
  componentDrawerOpen: true,
}

// ==============================|| SLICE - MENU ||============================== //

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen
    },
  },
})

export const groupsSelector = (state: RootState) => state.menu

export default menuSlice.reducer

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menuSlice.actions
