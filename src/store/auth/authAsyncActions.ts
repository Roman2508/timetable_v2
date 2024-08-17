import { toast } from "sonner"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { LoginPayloadType, RegisterPayloadType, AuthResponseType, GoogleLoginPayloadType } from "../../api/apiTypes"
import { UserType } from "./authTypes"
import { authAPI } from "../../api/authAPI"
import { setLoadingStatus } from "./authSlice"
import { LoadingStatusTypes } from "../appTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (payload: RegisterPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.register(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "",
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
/* export const authRegister = createAsyncThunk(
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
) */

/*  */

export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (payload: LoginPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.login(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Авторизований",
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
/* export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (payload: LoginPayloadType, thunkAPI): Promise<AuthLoginResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
    try {
      const { data } = await authAPI.login(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      thunkAPI.dispatch(setAppAlert({ message: "Авторизований", status: "success" }))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
      throw error
    }
  }
) */

/*  */

export const authMe = createAsyncThunk("auth/authMe", async (token: string, thunkAPI): Promise<AuthResponseType> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  const promise = authAPI.getMe(token)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Авторизований",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})
/* export const authMe = createAsyncThunk("auth/authMe", async (token: string, thunkAPI): Promise<UserType> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  try {
    const { data } = await authAPI.getMe(token)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    const message = (error as any)?.response?.data?.message || error.message
    thunkAPI.dispatch(setAppAlert({ message, status: "error" }))
    throw error
  }
}) */

/*  */

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (payload: GoogleLoginPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.googleLogin(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Авторизований",
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
/* export const googleLogin = createAsyncThunk(
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
) */

/*  */
