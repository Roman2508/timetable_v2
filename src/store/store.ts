import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import menuSlice from "./menu/menuSlice"
import plansSlice from "./plans/plansSlice"
import groupsSlice from "./groups/groupsSlice"
import streamsSlice from "./streams/streamsSlice"
import teachersSlice from "./teachers/teachersSlice"
import settingsSlice from "./settings/settingsSlice"
import appStatusSlice from "./appStatus/appStatusSlice"
import auditoriesSlise from "./auditories/auditoriesSlise"
import scheduleLessonsSlice from "./scheduleLessons/scheduleLessonsSlice"

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    plans: plansSlice,
    groups: groupsSlice,
    streams: streamsSlice,
    teachers: teachersSlice,
    settings: settingsSlice,
    appStatus: appStatusSlice,
    auditories: auditoriesSlise,
    scheduleLessons: scheduleLessonsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
