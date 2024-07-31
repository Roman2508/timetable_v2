import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  GetGradesPayloadType,
  UpdateGradePayloadType,
  CreateGradesPayloadType,
  DeleteGradesPayloadType,
  GetGradeBookPayloadType,
  AddGradeBookSummaryPayloadType,
  DeleteGradeBookSummaryPayloadType,
} from "../../api/apiTypes"
import { gradeBookAPI, teacherProfileAPI } from "../../api/api"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./gradeBookSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"

export const getGradeBook = createAsyncThunk(
  "group/getGradeBook",
  async (payload: GetGradeBookPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
    try {
      const { data } = await gradeBookAPI.get(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const addSummary = createAsyncThunk(
  "group/addSummary",
  async (payload: AddGradeBookSummaryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
    try {
      const { data } = await gradeBookAPI.addSummary(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Додано підсумок до журналу", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const getLessonThemes = createAsyncThunk("group/getLessonThemes", async (lessonId: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  try {
    const { data } = await teacherProfileAPI.getInstructionalMaterials(lessonId)
    thunkAPI.dispatch(setAppAlert({ message: "Завантажено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    const message = (error as any)?.response?.data?.message || error.message
    thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
    throw error
  }
})

export const deleteSummary = createAsyncThunk(
  "group/deleteSummary",
  async (payload: DeleteGradeBookSummaryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
    try {
      const { data } = await gradeBookAPI.deleteSummary(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Видалено підсумок з журналу", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

/* grades */

export const getGrades = createAsyncThunk("group/getGrades", async (payload: GetGradesPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  try {
    const { data } = await gradeBookAPI.getGrades(payload)
    thunkAPI.dispatch(setAppAlert({ message: "Завантажено рейтинг студента", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    const message = (error as any)?.response?.data?.message || error.message
    thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
    throw error
  }
})

export const updateGrade = createAsyncThunk("group/updateGrade", async (payload: UpdateGradePayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  try {
    const { data } = await gradeBookAPI.updateGrade(payload)
    // thunkAPI.dispatch(setAppAlert({ message: 'Оновлено оцінку в журналі', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    const message = (error as any)?.response?.data?.message || error.message
    thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
    throw error
  }
})
