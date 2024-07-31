import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  CreateTeacherReportType,
  UpdateTeacherReportType,
  UpdateIndividualTeacherWorkType,
  CreateIndividualTeacherWorkType,
  UpdateInstructionalMaterialsPayloadType,
  CreateInstructionalMaterialsPayloadType,
} from "../../api/apiTypes"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./teacherProfileSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { teacherProfileAPI } from "../../api/teacherProfileAPI"
import { groupLoadLessonsAPI } from "../../api/groupLoadLessonsAPI"

/* instructional-materials */
export const getInstructionalMaterials = createAsyncThunk(
  "teacher-profile/getInstructionalMaterials",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.getInstructionalMaterials(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const createInstructionalMaterials = createAsyncThunk(
  "teacher-profile/createInstructionalMaterials",
  async (payload: CreateInstructionalMaterialsPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.createInstructionalMaterial(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const updateInstructionalMaterials = createAsyncThunk(
  "teacher-profile/updateInstructionalMaterials",
  async (payload: UpdateInstructionalMaterialsPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.updateInstructionalMaterial(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const deleteInstructionalMaterials = createAsyncThunk(
  "teacher-profile/deleteInstructionalMaterials",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.deleteInstructionalMaterial(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const findAllTeacherLessonsById = createAsyncThunk(
  "teacher-profile/findAllTeacherLessonsById",
  async (teacherId: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await groupLoadLessonsAPI.findAllTeacherLessonsById(teacherId)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

/* teacher load */
export const getTeacherLoadById = createAsyncThunk(
  "teacher-profile/getTeacherLoadById",
  async (teacherId: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.findAllTeacherLessonsById(teacherId)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

/* individual-teacher-work */
export const getIndividualTeacherWork = createAsyncThunk(
  "teacher-profile/getIndividualTeacherWork",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.getIndividualTeacherWork()
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const createIndividualTeacherWork = createAsyncThunk(
  "teacher-profile/createIndividualTeacherWork",
  async (payload: CreateIndividualTeacherWorkType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.createIndividualTeacherWork(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const updateIndividualTeacherWork = createAsyncThunk(
  "teacher-profile/updateIndividualTeacherWork",
  async (payload: UpdateIndividualTeacherWorkType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.updateIndividualTeacherWork(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const deleteIndividualTeacherWork = createAsyncThunk(
  "teacher-profile/deleteIndividualTeacherWork",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.deleteIndividualTeacherWork(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

/* teacher-report */
export const getTeacherReport = createAsyncThunk(
  "teacher-profile/getTeacherReport",
  async (teacherId: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.getTeacherReport(teacherId)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const createTeacherReport = createAsyncThunk(
  "teacher-profile/createTeacherReport",
  async (payload: CreateTeacherReportType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.createTeacherReport(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const updateTeacherReport = createAsyncThunk(
  "teacher-profile/updateTeacherReport",
  async (payload: UpdateTeacherReportType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.updateTeacherReport(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)

export const deleteTeacherReport = createAsyncThunk(
  "teacher-profile/deleteTeacherReport",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await teacherProfileAPI.deleteTeacherReport(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
)
