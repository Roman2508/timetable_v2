import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
  getStreams,
  createStream,
  deleteStream,
  updateStream,
  getStreamLessons,
  addGroupToStream,
  deleteGroupFromStream,
} from "./streamsAsyncActions"
import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { StreamsInitialState, StreamsType } from "./streamsTypes"
import { DeleteGroupFromStreamResponseType } from "../../api/apiTypes"
import { GroupLoadType } from "../groups/groupsTypes"

const plansInitialState: StreamsInitialState = {
  streams: null,
  streamLessons: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const plansSlice = createSlice({
  name: "streams",
  initialState: plansInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* --- categories --- */
    /* getStreams */
    builder.addCase(getStreams.fulfilled, (state, action: PayloadAction<StreamsType[]>) => {
      state.streams = action.payload
    })

    /* createStream */
    builder.addCase(createStream.fulfilled, (state, action: PayloadAction<StreamsType>) => {
      state.streams?.push(action.payload)
    })

    /* updateStream */
    builder.addCase(updateStream.fulfilled, (state, action: PayloadAction<StreamsType>) => {
      if (!state.streams) return
      const newStreams = state.streams.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.streams = newStreams
    })

    /* deleteStream */
    builder.addCase(deleteStream.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.streams) return
      const newStreams = state.streams.filter((el) => el.id !== action.payload)
      state.streams = newStreams
    })

    /* addGroupToStream */
    builder.addCase(addGroupToStream.fulfilled, (state, action: PayloadAction<StreamsType>) => {
      if (!state.streams) return
      const newStreams = state.streams.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.streams = newStreams
    })

    /* deleteGroupFromStream */
    builder.addCase(
      deleteGroupFromStream.fulfilled,
      (state, action: PayloadAction<DeleteGroupFromStreamResponseType>) => {
        if (!state.streams) return

        const newStreams = state.streams.map((el) => {
          if (el.id === action.payload.streamId) {
            const streamGroups = el.groups.filter((g) => {
              return g.id !== action.payload.groupId
            })

            return { ...el, groups: streamGroups }
          }
          return el
        })

        state.streams = newStreams
      }
    )

    /* getStreamLessons */
    builder.addCase(getStreamLessons.fulfilled, (state, action: PayloadAction<GroupLoadType[]>) => {
      const streamLessons = state.streamLessons ? state.streamLessons : []
      state.streamLessons = [...streamLessons, ...action.payload]
    })
  },
})

export const { setLoadingStatus } = plansSlice.actions

export default plansSlice.reducer

export const streamsSelector = (state: RootState) => state.streams
