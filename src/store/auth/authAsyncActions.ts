import { toast } from 'sonner'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { authAPI } from '../../api/authAPI'
import { clearUser, setLoadingStatus } from './authSlice'
import { LoadingStatusTypes } from '../appTypes'
import { LoginPayloadType, RegisterPayloadType, AuthResponseType, GoogleLoginPayloadType } from '../../api/apiTypes'

export const authRegister = createAsyncThunk(
  'auth/authRegister',
  async (payload: RegisterPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.register(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: '',
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

export const authLogin = createAsyncThunk(
  'auth/authLogin',
  async (payload: LoginPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.login(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Авторизований',
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

export const authMe = createAsyncThunk('auth/authMe', async (token: string, thunkAPI): Promise<AuthResponseType> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  const promise = authAPI.getMe(token)

  toast.promise(promise, {
    loading: 'Завантаження...',
    success: 'Авторизований',
    // error: (error) => {
    //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    //   return (error as any)?.response?.data?.message || error.message
    // },
  })

  const { data } = await promise
  console.log(data)
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (payload: GoogleLoginPayloadType, thunkAPI): Promise<AuthResponseType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = authAPI.googleLogin(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Авторизований',
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
