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
import { toast } from "sonner"

export const getGroupCategories = createAsyncThunk(
  "groups-categories/getGroupCategories",
  async (isHide: boolean = false, thunkAPI): Promise<GroupCategoriesType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.getGroupsCategories(isHide)

    toast.promise(promise, {
      // loading: "Завантаження...",
      // success: "Групи завантажено",
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

export const createGroupCategory = createAsyncThunk(
  "groups-categories/createGroupCategory",
  async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.createGroupCategory(name)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Категорію створено",
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

export const updateGroupCategory = createAsyncThunk(
  "group-categories/updateGroupCategory",
  async (payload: UpdateEntityNamePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.updateGroupCategory(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Категорію оновлено",
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

export const deleteGroupCategory = createAsyncThunk(
  "group-categories/deleteGroupCategory",
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.deleteGroupCategory(id)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Категорію видалено",
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

/* groups */
export const getGroup = createAsyncThunk("group/getGroup", async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = groupsAPI.getGroup(id)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Групу завантажено",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const createGroup = createAsyncThunk("group/createGroup", async (payload: UpdateGroupPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = groupsAPI.createGroup(payload)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Групу створено",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const updateGroup = createAsyncThunk("group/updateGroup", async (payload: UpdateGroupPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = groupsAPI.updateGroup(payload)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Групу оновлено",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const deleteGroup = createAsyncThunk("group/deleteGroup", async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = groupsAPI.deleteGroup(id)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Групу видалено",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const handleGroupVisible = createAsyncThunk("group/handleGroupVisible", async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = groupsAPI.handleGroupVisible(id)

  toast.promise(promise, {
    loading: "Завантаження...",
    success: "Групу оновлено",
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

/* Specialization */

export const attachSpecialization = createAsyncThunk(
  "group/attachSpecialization",
  async (payload: AttachSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupLoadLessonsAPI.attachSpecialization(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Спец. підгрупу оновлено",
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

export const createSpecialization = createAsyncThunk(
  "group/createSpecialization",
  async (payload: CreateSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.createSpecialization(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Спец. підгрупу створено",
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

export const updateSpecialization = createAsyncThunk(
  "group/updateSpecialization",
  async (payload: UpdateSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.updateSpecialization(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Спец. підгрупу оновлено",
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

export const deleteSpecialization = createAsyncThunk(
  "group/deleteSpecialization",
  async (payload: DeleteSpecializationPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupsAPI.deleteSpecialization(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Спец. підгрупу видалено",
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

/* Subgroups */
export const createSubgroups = createAsyncThunk(
  "group/createSubgroups",
  async (payload: CreateSubgroupsPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = groupLoadLessonsAPI.createSubgroups(payload)

    toast.promise(promise, {
      loading: "Завантаження...",
      success: "Кількість підгруп змінено",
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
