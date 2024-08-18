import { createAsyncThunk } from "@reduxjs/toolkit"

import { studentsAPI } from "../../api/api"
import { StudentType } from "./studentsTypes"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./studentsSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { CreateStudentsPayloadType, UpdateStudentsPayloadType } from "../../api/apiTypes"
import { toast } from "sonner"

export const getStudentsByGroupId = createAsyncThunk(
  "students/getStudentsByGroupId",
  async (id: number, thunkAPI): Promise<StudentType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = studentsAPI.getByGroupId(id)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Потік оновлено",
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

export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (payload: CreateStudentsPayloadType, thunkAPI): Promise<StudentType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = studentsAPI.create(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Студента створено",
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

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (payload: UpdateStudentsPayloadType, thunkAPI): Promise<StudentType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = studentsAPI.update(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Студента оновлено",
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = studentsAPI.delete(id)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Студента видалено",
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
