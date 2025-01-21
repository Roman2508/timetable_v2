import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { AuthInitialState, UserType } from './authTypes'
import { LoadingStatusTypes } from '../appTypes'
import { AuthResponseType } from '../../api/apiTypes'
import { TeachersType } from '../teachers/teachersTypes'
import { authLogin, authMe, getUsers, googleLogin, updateTeacherBio, updateTeacherPrintedWorks } from './authAsyncActions'

const authInitialState: AuthInitialState = {
  user: null,
  users: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },

    clearUser(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state, action: PayloadAction<AuthResponseType>) => {
      state.user = action.payload.user
    })
    builder.addCase(googleLogin.fulfilled, (state, action: PayloadAction<AuthResponseType>) => {
      state.user = action.payload.user
    })
    builder.addCase(authMe.fulfilled, (state, action: PayloadAction<AuthResponseType>) => {
      state.user = action.payload.user
    })

    /* updateTeacherBio */
    builder.addCase(updateTeacherBio.fulfilled, (state, action: PayloadAction<TeachersType>) => {
      if (!state.user) return
      state.user.teacher = action.payload
    })

    /* updateTeacherPrintedWorks */
    builder.addCase(updateTeacherPrintedWorks.fulfilled, (state, action: PayloadAction<TeachersType>) => {
      if (!state.user) return
      state.user.teacher = action.payload
    })

    /* getUsers */
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<[UserType[], number]>) => {
      if (!state.user) return
      state.users = action.payload[0]
    })
  },
})

export const { setLoadingStatus, clearUser } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
