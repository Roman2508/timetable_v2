import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './teacherProfileSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'

export const get = createAsyncThunk('teacher-profile/get', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    //   const { data } = await teachersAPI.getTeachersCategories(isHide)
    //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    //   return data
  } catch (error: any) {
    const message = (error as any)?.response?.data?.message || error.message
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
    throw error
  }
})
