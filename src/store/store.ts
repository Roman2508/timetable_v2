import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import menuSlice from "./menu/menuSlice"
import plansSlice from "./plans/plansSlice"
import groupsSlice from "./groups/groupsSlice"
import teachersSlice from "./teachers/teachersSlice"
import appStatusSlice from "./appStatus/appStatusSlice"
import auditoriesSlise from "./auditories/auditoriesSlise"
import streamsSlice from "./streams/streamsSlice"

export const store = configureStore({
  reducer: {
    auditories: auditoriesSlise,
    teachers: teachersSlice,
    plans: plansSlice,
    groups: groupsSlice,
    streams: streamsSlice,
    appStatus: appStatusSlice,
    menu: menuSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
