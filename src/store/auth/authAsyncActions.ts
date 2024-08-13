import { createAsyncThunk } from "@reduxjs/toolkit"

import { UserType } from "./authTypes"
import { authAPI } from "../../api/authAPI"
import { setLoadingStatus } from "./authSlice"
import { LoadingStatusTypes } from "../appTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { GetMePayloadType, GoogleLoginPayloadType, LoginPayloadType, RegisterPayloadType } from "../../api/apiTypes"

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (payload: RegisterPayloadType, thunkAPI): Promise<UserType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    try {
      const { data } = await authAPI.register(payload)
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

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (payload: LoginPayloadType, thunkAPI): Promise<UserType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    try {
      const { data } = await authAPI.login(payload)
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

export const authMe = createAsyncThunk(
  "auth/authMe",
  async (payload: GetMePayloadType, thunkAPI): Promise<UserType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    try {
      const { data } = await authAPI.getMe(payload)
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

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (payload: GoogleLoginPayloadType, thunkAPI): Promise<UserType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    try {
      const { data } = await authAPI.googleLogin(payload)
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
