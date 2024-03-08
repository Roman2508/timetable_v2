import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import auditoriesSlise from './auditories/auditoriesSlise'
import teachersSlice from './teachers/teachersSlice'
import plansSlice from './plans/plansSlice'
import appStatusSlice from './appStatus/appStatusSlice'
import groupsSlice from './groups/groupsSlice'
import menuSlice from './menu/menuSlice'

export const store = configureStore({
  reducer: {
    auditories: auditoriesSlise,
    teachers: teachersSlice,
    plans: plansSlice,
    groups: groupsSlice,
    appStatus: appStatusSlice,
    menu: menuSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
