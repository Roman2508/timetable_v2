import { createAsyncThunk } from "@reduxjs/toolkit"
import { ScheduleLessonType } from "./scheduleLessonsTypes"
import { setLoadingStatus } from "./scheduleLessonsSlice"
import { LoadingStatusTypes } from "../appTypes"
import { groupLoadLessonsAPI, scheduleLessonsAPI } from "../../api/api"
import { setAppAlert } from "../appStatus/appStatusSlice"
import {
  CreateScheduleLessonsPayloadType,
  FindLessonsForSchedulePayloadType,
  GetScheduleLessonsPayloadType,
  UpdateScheduleLessonsPayloadType,
} from "../../api/apiTypes"

export const getScheduleLessons = createAsyncThunk(
  "schedule-lessons/getScheduleLessons",
  async (payload: GetScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getLessons(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Розклад завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: "error",
        })
      )
      throw error
    }
  }
)

export const createScheduleLesson = createAsyncThunk(
  "schedule-lessons/createScheduleLesson",
  async (payload: CreateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Додано елемент розкладу", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: "error",
        })
      )
      throw error
    }
  }
)

export const updateScheduleLesson = createAsyncThunk(
  "schedule-lessons/updateScheduleLesson",
  async (payload: UpdateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Оновлено елемент розкладу", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: "error",
        })
      )
      throw error
    }
  }
)

export const deleteScheduleLesson = createAsyncThunk(
  "schedule-lessons/deleteScheduleLesson",
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.delete(id)
      thunkAPI.dispatch(setAppAlert({ message: "Видалено елемент розкладу", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: "error",
        })
      )
      throw error
    }
  }
)

/* findLessonsForSchedule */
export const findLessonsForSchedule = createAsyncThunk(
  "group/findLessonsForSchedule",
  async (payload: FindLessonsForSchedulePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.findLessonsForSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Розклад завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: "error",
        })
      )
      throw error
    }
  }
)