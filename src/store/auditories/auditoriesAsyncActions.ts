import { createAsyncThunk } from "@reduxjs/toolkit"
import { auditoriesAPI } from "../../api/api"
import {
  CreateAuditoryPayloadType,
  UpdateAuditoryCategoryPayloadType,
  UpdateAuditoryPayloadType,
} from "../../api/apiTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { setLoadingStatus } from "./auditoriesSlise"
import { LoadingStatusTypes } from "../appTypes"

/* categories */
export const getAuditoryCategories = createAsyncThunk(
  "auditory-categories/getAuditoryCategories",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await auditoriesAPI.getAuditoryCategories()
      thunkAPI.dispatch(setAppAlert({ message: "Аудиторії завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const createAuditoryCategory = createAsyncThunk(
  "auditory-categories/createAuditoryCategory",
  async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.createAuditoryCategory(name)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію створено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updateAuditoryCategory = createAsyncThunk(
  "auditory-categories/updateAuditoryCategory",
  async (payload: UpdateAuditoryCategoryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.updateAuditoryCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію оновлено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deleteAuditoryCategory = createAsyncThunk(
  "auditory-categories/deleteAuditoryCategory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.deleteAuditoryCategory(id)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію видалено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

/* auditories */

export const createAuditory = createAsyncThunk(
  "auditory-categories/createAuditory",
  async (payload: CreateAuditoryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.createAuditory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Аудиторію створено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const updateAuditory = createAsyncThunk(
  "auditory-categories/updateAuditory",
  async (payload: UpdateAuditoryPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.updateAuditory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Аудиторію оновлено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)

export const deleteAuditory = createAsyncThunk(
  "auditory-categories/deleteAuditory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await auditoriesAPI.deleteAuditory(id)
      thunkAPI.dispatch(setAppAlert({ message: "Аудиторію видалено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message, status: "error" })
      )
      throw error
    }
  }
)
