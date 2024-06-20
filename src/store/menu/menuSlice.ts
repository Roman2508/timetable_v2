import { RootState } from '../store'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openItem: ['dashboard'],
  // defaultId: 'dashboard',
  // openComponent: 'buttons',
  drawerOpen: false,
  // componentDrawerOpen: true,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem
    },

    // activeComponent(state, action) {
    //   state.openComponent = action.payload.openComponent
    // },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen
    },

    // openComponentDrawer(state, action) {
    //   state.componentDrawerOpen = action.payload.componentDrawerOpen
    // },
  },
})

export const menuSelector = (state: RootState) => state.menu

export default menuSlice.reducer

export const { activeItem, /* activeComponent, */ openDrawer } = menuSlice.actions
// export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menuSlice.actions
