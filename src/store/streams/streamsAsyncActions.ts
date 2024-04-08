import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  AddGroupToStreamPayloadType,
  UpdateEntityNamePayloadType,
  DeleteGroupFromStreamPayloadType,
  AddLessonsToStreamPayloadType,
  DeleteLessonFromStreamPayloadType,
} from '../../api/apiTypes'
import { streamsAPI } from '../../api/api'
import { StreamsType } from './streamsTypes'
import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './streamsSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'

export const getStreams = createAsyncThunk('streams/getStreams', async (_, thunkAPI): Promise<StreamsType[]> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await streamsAPI.getStreams()
    // thunkAPI.dispatch(setAppAlert({ message: "Потоки завантажено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )

    throw error
  }
})

export const createStream = createAsyncThunk('streams/createStream', async (payload: { name: string }, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await streamsAPI.createStream(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Потік створено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const updateStream = createAsyncThunk(
  'streams/updateStream',
  async (payload: UpdateEntityNamePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await streamsAPI.updateStreamName(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Потік оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteStream = createAsyncThunk('streams/deleteStream', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await streamsAPI.deleteStream(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Потік видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

/* Stream Groups */
export const addGroupToStream = createAsyncThunk(
  'streams/addGroupToStream',
  async (payload: AddGroupToStreamPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await streamsAPI.addGroupToStream(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Групу додано до потоку', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteGroupFromStream = createAsyncThunk(
  'streams/deleteGroupFromStream',
  async (payload: DeleteGroupFromStreamPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await streamsAPI.deleteGroupFromStream(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Групу видалено з потоку', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* Stream Lessons */

export const getStreamLessons = createAsyncThunk('streams/getStreamLessons', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await streamsAPI.getStreamLessonsByGroupId(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Дисципліни завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const addLessonToStream = createAsyncThunk(
  'streams/addLessonToStream',
  async (payload: AddLessonsToStreamPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await streamsAPI.addLessonToStream(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Потік оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteLessonFromStream = createAsyncThunk(
  'streams/deleteLessonFromStream',
  async (payload: DeleteLessonFromStreamPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await streamsAPI.deleteLessonFromStream(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Потік оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)
