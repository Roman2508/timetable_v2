import { createAsyncThunk } from "@reduxjs/toolkit"

import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./teacherProfileSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { teacherProfileAPI } from "../../api/teacherProfileAPI"
import { CreateInstructionalMaterialsPayloadType, UpdateInstructionalMaterialsPayloadType } from "../../api/apiTypes"
import { groupLoadLessonsAPI } from "../../api/groupLoadLessonsAPI"

/* instructional-materials */
export const getInstructionalMaterials = createAsyncThunk(
  "teacher-profile/getInstructionalMaterials",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

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

/*  */
