import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  UpdateColorsPayloadType,
  UpdateCallSchedulePayloadType,
  UpdateSemesterTermsPayloadType,
} from "../../api/apiTypes"
import { settingsAPI } from "../../api/api"
import { SettingsType } from "./settingsTypes"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./settingsSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { toast } from "sonner"

export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (id: number, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = settingsAPI.getSettings(id)

    toast.promise(promise, {
      // loading: "Завантаження...",
      // success: "Налаштування видалено",
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (payload: SettingsType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = settingsAPI.updateSettings(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Налаштування оновлено",
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const updateSemesterTerms = createAsyncThunk(
  "settings/updateSemesterTerms",
  async (payload: UpdateSemesterTermsPayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = settingsAPI.updateSemesterTerms(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Налаштування оновлено",
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const updateCallSchedule = createAsyncThunk(
  "settings/updateCallSchedule",
  async (payload: UpdateCallSchedulePayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = settingsAPI.updateCallSchedule(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Налаштування оновлено",
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const updateColors = createAsyncThunk(
  "settings/updateColors",
  async (payload: UpdateColorsPayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = settingsAPI.updateColors(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Налаштування оновлено",
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)
