import { createAsyncThunk } from "@reduxjs/toolkit"

import { settingsAPI } from "../../api/api"
import { SettingsType } from "./settingsTypes"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./settingsSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"

export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (id: number, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.getSettings(id)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування завантажено", status: "success" }))
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

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (payload: SettingsType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.updateSettings(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування оновлено", status: "success" }))
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
