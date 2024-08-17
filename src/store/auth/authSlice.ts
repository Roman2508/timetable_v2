import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { AuthInitialState } from "./authTypes"
import { LoadingStatusTypes } from "../appTypes"
import { AuthResponseType } from "../../api/apiTypes"
import { authLogin, authMe, googleLogin } from "./authAsyncActions"

const authInitialState: AuthInitialState = {
  user: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const authSlice = createSlice({
  name: "auth",
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
  },
})

export const { setLoadingStatus, clearUser } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
