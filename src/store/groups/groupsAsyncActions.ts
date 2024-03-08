import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoadingStatus } from './groupsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { groupsAPI } from '../../api/api'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { CreateEntityPayloadType, UpdateEntityNamePayloadType, UpdateGroupPayloadType } from '../../api/apiTypes'
import { GroupCategoriesType } from './groupsTypes'

export const getGroupCategories = createAsyncThunk(
  'groups-categories/getGroupCategories',
  async (_, thunkAPI): Promise<GroupCategoriesType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await groupsAPI.getGroupsCategories()
      thunkAPI.dispatch(setAppAlert({ message: 'Групи завантажено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

export const createGroupCategory = createAsyncThunk(
  'groups-categories/createGroupCategory',
  async (name: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupsAPI.createGroupCategory(name)
      thunkAPI.dispatch(setAppAlert({ message: 'Категорію створено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

export const updateGroupCategory = createAsyncThunk(
  'group-categories/updateGroupCategory',
  async (payload: UpdateEntityNamePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupsAPI.updateGroupCategory(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Категорію оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

export const deleteGroupCategory = createAsyncThunk(
  'group-categories/deleteGroupCategory',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupsAPI.deleteGroupCategory(id)
      thunkAPI.dispatch(setAppAlert({ message: 'Категорію видалено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
      throw error
    }
  }
)

/* groups */
export const getGroup = createAsyncThunk('group/getGroup', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupsAPI.getGroup(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Групу завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const createGroup = createAsyncThunk('group/createGroup', async (payload: CreateEntityPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupsAPI.createGroup(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Групу створено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const updateGroup = createAsyncThunk('group/updateGroup', async (payload: UpdateGroupPayloadType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupsAPI.updateGroup(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Групу оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})

export const deleteGroup = createAsyncThunk('group/deleteGroup', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupsAPI.deleteGroup(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Групу видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message, status: 'error' }))
    throw error
  }
})
