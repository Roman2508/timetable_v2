import { createAsyncThunk } from '@reduxjs/toolkit'

import { studentsAPI } from '../../api/api'
import { StudentType } from './studentsTypes'
import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './studentsSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { CreateStudentsPayloadType, UpdateStudentsPayloadType } from '../../api/apiTypes'

export const getStudentsByGroupId = createAsyncThunk(
  'students/getStudentsByGroupId',
  async (id: number, thunkAPI): Promise<StudentType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    try {
      const { data } = await studentsAPI.getByGroupId(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (payload: CreateStudentsPayloadType, thunkAPI): Promise<StudentType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await studentsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента створено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (payload: UpdateStudentsPayloadType, thunkAPI): Promise<StudentType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await studentsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await studentsAPI.delete(id)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента видалено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)
