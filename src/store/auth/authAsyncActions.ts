import { toast } from 'sonner'
import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  LoginPayloadType,
  AuthResponseType,
  RegisterPayloadType,
  UpdateEditorDataType,
  GoogleLoginPayloadType,
  UpdateUserPayloadType,
  CreateUserPayloadType,
} from '../../api/apiTypes'
import { authAPI } from '../../api/authAPI'
import { setLoadingStatus } from './authSlice'
import { LoadingStatusTypes } from '../appTypes'

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

/* teacher */
export const updateTeacherBio = createAsyncThunk(
  'teachers/updateTeacherBio',
  async (payload: UpdateEditorDataType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = authAPI.updateTeacherBio(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Оновлено',
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

export const updateTeacherPrintedWorks = createAsyncThunk(
  'teachers/updateTeacherPrintedWorks',
  async (payload: UpdateEditorDataType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = authAPI.updateTeacherPrintedWorks(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Оновлено',
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

/* USERS */

export const getUsers = createAsyncThunk('users/getUsers', async (payload: any, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = authAPI.getUsers()

  toast.promise(promise, {
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const createUser = createAsyncThunk('users/createUser', async (payload: CreateUserPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = authAPI.createUser(payload)

  toast.promise(promise, {
    loading: 'Завантаження...',
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const updateUser = createAsyncThunk('users/updateUser', async (payload: UpdateUserPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = authAPI.updateUser(payload)

  toast.promise(promise, {
    loading: 'Завантаження...',
    success: 'Оновлено',
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = authAPI.deleteUser(id)

  toast.promise(promise, {
    loading: 'Завантаження...',
    success: 'Видалено',
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})
