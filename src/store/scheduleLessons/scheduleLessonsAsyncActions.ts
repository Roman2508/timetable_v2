import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  GetAuditoryOverlayPayloadType,
  GetScheduleLessonsPayloadType,
  UpdateScheduleLessonsPayloadType,
  CreateScheduleLessonsPayloadType,
  FindLessonsForSchedulePayloadType,
  GetGroupOverlayPayloadType,
  CopyWeekSchedulePayloadType,
  CopyDaySchedulePayloadType,
} from '../../api/apiTypes'
import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './scheduleLessonsSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { ScheduleLessonType } from './scheduleLessonsTypes'
import { groupLoadLessonsAPI, scheduleLessonsAPI } from '../../api/api'

export const getScheduleLessons = createAsyncThunk(
  'schedule-lessons/getScheduleLessons',
  async (payload: GetScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getLessons(payload)
      // thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
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

export const getGroupOverlay = createAsyncThunk(
  'schedule-lessons/getGroupOverlay',
  async (payload: GetGroupOverlayPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getGroupOverlay(payload)
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

export const getTeacherLessons = createAsyncThunk(
  'schedule-lessons/getTeacherLessons',
  async (payload: GetScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getLessons(payload)
      // thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
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

export const getAuditoryOverlay = createAsyncThunk(
  'schedule-lessons/getAuditoryOverlay',
  async (payload: GetAuditoryOverlayPayloadType, thunkAPI): Promise<{ id: number; name: string }[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getAuditoryOverlay(payload)
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

export const createScheduleLesson = createAsyncThunk(
  'schedule-lessons/createScheduleLesson',
  async (payload: CreateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Додано елемент розкладу', status: 'success' }))
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

export const copyWeekSchedule = createAsyncThunk(
  'schedule-lessons/copyWeekSchedule',
  async (payload: CopyWeekSchedulePayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.copyWeekSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад скопійовано', status: 'success' }))
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

export const copyDaySchedule = createAsyncThunk(
  'schedule-lessons/copyDaySchedule',
  async (payload: CopyDaySchedulePayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.copyDaySchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад скопійовано', status: 'success' }))
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

export const updateScheduleLesson = createAsyncThunk(
  'schedule-lessons/updateScheduleLesson',
  async (payload: UpdateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Оновлено елемент розкладу', status: 'success' }))
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

export const deleteScheduleLesson = createAsyncThunk(
  'schedule-lessons/deleteScheduleLesson',
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.delete(id)
      thunkAPI.dispatch(setAppAlert({ message: 'Видалено елемент розкладу', status: 'success' }))
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

/* findLessonsForSchedule */
export const findLessonsForSchedule = createAsyncThunk(
  'group/findLessonsForSchedule',
  async (payload: FindLessonsForSchedulePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupLoadLessonsAPI.findLessonsForSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
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
