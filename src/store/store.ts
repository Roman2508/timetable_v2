import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import menuSlice from './menu/menuSlice'
import plansSlice from './plans/plansSlice'
import groupsSlice from './groups/groupsSlice'
import streamsSlice from './streams/streamsSlice'
import teachersSlice from './teachers/teachersSlice'
import settingsSlice from './settings/settingsSlice'
import studentsSlice from './students/studentsSlice'
import appStatusSlice from './appStatus/appStatusSlice'
import gradeBookSlice from './gradeBook/gradeBookSlice'
import auditoriesSlise from './auditories/auditoriesSlise'
import scheduleLessonsSlice from './scheduleLessons/scheduleLessonsSlice'

const menuPersistConfig = {
  key: 'menu',
  storage: storage,
  whitelist: ['drawerOpen'],
}

const groupsPersistConfig = {
  key: 'scheduleLessons',
  storage: storage,
  whitelist: [
    'lastOpenedWeek',
    'lastOpenedSemester',
    'lastSelectedItemId',
    'lastSelectedScheduleType',
    'lastSelectedStructuralUnitId',
  ],
}

const rootReducer = combineReducers({
  plans: plansSlice,
  groups: groupsSlice,
  streams: streamsSlice,
  students: studentsSlice,
  teachers: teachersSlice,
  settings: settingsSlice,
  appStatus: appStatusSlice,
  gradeBook: gradeBookSlice,
  auditories: auditoriesSlise,
  menu: persistReducer(menuPersistConfig, menuSlice),
  scheduleLessons: persistReducer(groupsPersistConfig, scheduleLessonsSlice),
})
// export const persistor = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

/* export const store = configureStore({
  reducer: {
    menu: persistReducer(rootPersistConfig, menuSlice),
    plans: plansSlice,
    groups: groupsSlice,
    streams: streamsSlice,
    students: studentsSlice,
    teachers: teachersSlice,
    settings: settingsSlice,
    appStatus: appStatusSlice,
    auditories: auditoriesSlise,
    scheduleLessons: scheduleLessonsSlice,
  },
}) */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
