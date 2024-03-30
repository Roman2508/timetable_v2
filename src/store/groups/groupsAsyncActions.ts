import { createAsyncThunk } from "@reduxjs/toolkit"

import {
  UpdateGroupPayloadType,
  AttachTeacherPayloadType,
  CreateSubgroupsPayloadType,
  UpdateEntityNamePayloadType,
  AttachSpecializationPayloadType,
  CreateSpecializationPayloadType,
  DeleteSpecializationPayloadType,
  UpdateSpecializationPayloadType,
} from "../../api/apiTypes"
import { setLoadingStatus } from "./groupsSlice"
import { LoadingStatusTypes } from "../appTypes"
import { GroupCategoriesType } from "./groupsTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { groupLoadLessonsAPI, groupsAPI } from "../../api/api"

export const getGroupCategories = createAsyncThunk(
  "groups-categories/getGroupCategories",
  async (_, thunkAPI): Promise<GroupCategoriesType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await groupsAPI.getGroupsCategories()
      thunkAPI.dispatch(setAppAlert({ message: "Групи завантажено", status: "success" }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      // setAppAlert({ message: (error as any)?.response?.data?.message || error.message, status: 'error' })

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

export const createGroupCategory = createAsyncThunk(
  "groups-categories/createGroupCategory",
  async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.createGroupCategory(name)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію створено", status: "success" }))
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

export const updateGroupCategory = createAsyncThunk(
  "group-categories/updateGroupCategory",
  async (payload: UpdateEntityNamePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.updateGroupCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію оновлено", status: "success" }))
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

export const deleteGroupCategory = createAsyncThunk(
  "group-categories/deleteGroupCategory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.deleteGroupCategory(id)
      thunkAPI.dispatch(setAppAlert({ message: "Категорію видалено", status: "success" }))
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

/* groups */
export const getGroup = createAsyncThunk("group/getGroup", async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

  try {
    const { data } = await groupsAPI.getGroup(id)
    thunkAPI.dispatch(setAppAlert({ message: "Групу завантажено", status: "success" }))
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
})

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (payload: UpdateGroupPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.createGroup(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Групу створено", status: "success" }))
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

export const updateGroup = createAsyncThunk(
  "group/updateGroup",
  async (payload: UpdateGroupPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.updateGroup(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Групу оновлено", status: "success" }))
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

export const deleteGroup = createAsyncThunk("group/deleteGroup", async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

  try {
    const { data } = await groupsAPI.deleteGroup(id)
    thunkAPI.dispatch(setAppAlert({ message: "Групу видалено", status: "success" }))
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
})

/* Specialization */

export const attachSpecialization = createAsyncThunk(
  "group/attachSpecialization",
  async (payload: AttachSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.attachSpecialization(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Спец. підгрупу оновлено", status: "success" }))
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

export const createSpecialization = createAsyncThunk(
  "group/createSpecialization",
  async (payload: CreateSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.createSpecialization(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Спец. підгрупу створено", status: "success" }))
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

export const updateSpecialization = createAsyncThunk(
  "group/updateSpecialization",
  async (payload: UpdateSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.updateSpecialization(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Спец. підгрупу оновлено", status: "success" }))
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

export const deleteSpecialization = createAsyncThunk(
  "group/deleteSpecialization",
  async (payload: DeleteSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupsAPI.deleteSpecialization(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Спец. підгрупу видалено", status: "success" }))
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

/* Subgroups */
export const createSubgroups = createAsyncThunk(
  "group/createSubgroups",
  async (payload: CreateSubgroupsPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.createSubgroups(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Кількість підгруп змінено", status: "success" }))
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

/* attachTeacher */
export const attachTeacher = createAsyncThunk(
  "group/attachTeacher",
  async (payload: AttachTeacherPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.attachTeacher(payload)
      thunkAPI.dispatch(
        setAppAlert({ message: "Викладача прикріплено до дисципліни", status: "success" })
      )
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

/* unpinTeacher */
export const unpinTeacher = createAsyncThunk(
  "group/unpinTeacher",
  async (lessonId: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))

    try {
      const { data } = await groupLoadLessonsAPI.unpinTeacher(lessonId)
      thunkAPI.dispatch(
        setAppAlert({ message: "Викладача відкріплено від дисципліни", status: "success" })
      )
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
