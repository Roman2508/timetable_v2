import { createSlice } from "@reduxjs/toolkit"
import { AuthInitialState } from "./authTypes"
import { LoadingStatusTypes } from "../appTypes"
import { RootState } from "../store"

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

    clearStreamLessons(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getStreams.fulfilled, (state, action: PayloadAction<StreamsType[]>) => {
    //     state.streams = action.payload
    //   })
  },
})

export const { setLoadingStatus, clearStreamLessons } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
