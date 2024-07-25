import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  AddStudentToLessonType,
  GetGroupOverlayPayloadType,
  CopyDaySchedulePayloadType,
  DeleteStudentFromLessonType,
  CopyWeekSchedulePayloadType,
  CreateReplacementPayloadType,
  GetTeachersOverlayPayloadType,
  GetAuditoryOverlayPayloadType,
  GetScheduleLessonsPayloadType,
  UpdateScheduleLessonsPayloadType,
  CreateScheduleLessonsPayloadType,
  FindLessonsForSchedulePayloadType,
  AddStudentsToAllGroupLessonsType,
  DeleteStudentsFromAllGroupLessonsType,
  FindGroupLoadLessonsByGroupIdAndSemesterPayloadType,
  AttachTeacherPayloadType,
} from '../../api/apiTypes'
import { LoadingStatusTypes } from '../appTypes'
import { TeachersType } from '../teachers/teachersTypes'
import { setLoadingStatus } from './scheduleLessonsSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { ScheduleLessonType } from './scheduleLessonsTypes'
import { groupLoadLessonsAPI, scheduleLessonsAPI } from '../../api/api'
import { GroupLoadType } from '../groups/groupsTypes'

export const getScheduleLessons = createAsyncThunk(
  'schedule-lessons/getScheduleLessons',
  async (payload: GetScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getLessons(payload)
      // thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const getGroupLoadByCurrentCourse = createAsyncThunk(
  'schedule-lessons/getGroupLoadByCurrentCourse',
  async (id: number, thunkAPI): Promise<GroupLoadType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await groupLoadLessonsAPI.getGroupLoadByCurrentCourse(id)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const getGroupOverlay = createAsyncThunk(
  'schedule-lessons/getGroupOverlay',
  async (payload: GetGroupOverlayPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getGroupOverlay(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const getTeacherLessons = createAsyncThunk(
  'schedule-lessons/getTeacherLessons',
  async (payload: GetScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getLessons(payload)
      // thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const getTeacherOverlay = createAsyncThunk(
  'schedule-lessons/getTeacherOverlay',
  async (payload: GetTeachersOverlayPayloadType, thunkAPI): Promise<TeachersType[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getTeacherOverlay(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const getAuditoryOverlay = createAsyncThunk(
  'schedule-lessons/getAuditoryOverlay',
  async (payload: GetAuditoryOverlayPayloadType, thunkAPI): Promise<{ id: number; name: string }[]> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.getAuditoryOverlay(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const createScheduleLesson = createAsyncThunk(
  'schedule-lessons/createScheduleLesson',
  async (payload: CreateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Додано елемент розкладу', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* copy schedule */
export const copyWeekSchedule = createAsyncThunk(
  'schedule-lessons/copyWeekSchedule',
  async (payload: CopyWeekSchedulePayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.copyWeekSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад скопійовано', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const copyDaySchedule = createAsyncThunk(
  'schedule-lessons/copyDaySchedule',
  async (payload: CopyDaySchedulePayloadType, thunkAPI): Promise<ScheduleLessonType[]> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.copyDaySchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад скопійовано', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* replacement */
export const createReplacement = createAsyncThunk(
  'schedule-lessons/createReplacement',
  async (payload: CreateReplacementPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.createReplacement(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Зроблено заміну', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteReplacement = createAsyncThunk(
  'schedule-lessons/deleteReplacement',
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.deleteReplacement(id)
      thunkAPI.dispatch(setAppAlert({ message: 'Видалено заміну', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const updateScheduleLesson = createAsyncThunk(
  'schedule-lessons/updateScheduleLesson',
  async (payload: UpdateScheduleLessonsPayloadType, thunkAPI): Promise<ScheduleLessonType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Оновлено елемент розкладу', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

export const deleteScheduleLesson = createAsyncThunk(
  'schedule-lessons/deleteScheduleLesson',
  async (id: number, thunkAPI): Promise<number> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await scheduleLessonsAPI.delete(id)
      thunkAPI.dispatch(setAppAlert({ message: 'Видалено елемент розкладу', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))

      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* findLessonsForSchedule */
export const findLessonsForSchedule = createAsyncThunk(
  'group/findLessonsForSchedule',
  async (payload: FindLessonsForSchedulePayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupLoadLessonsAPI.findLessonsForSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Розклад завантажено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* getLessonStudents */
export const getLessonStudents = createAsyncThunk('group/getLessonStudents', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupLoadLessonsAPI.getLessonStudents(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

/* get all semester lessons for students divide */
export const findGroupLoadLessonsByGroupIdAndSemester = createAsyncThunk(
  'group/findGroupLoadLessonsByGroupIdAndSemester',
  async (payload: FindGroupLoadLessonsByGroupIdAndSemesterPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupLoadLessonsAPI.findGroupLoadLessonsByGroupIdAndSemester(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Завантажено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* teachers attachment */

/* attachTeacher */
export const attachTeacher = createAsyncThunk(
  'group/attachTeacher',
  async (payload: AttachTeacherPayloadType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await groupLoadLessonsAPI.attachTeacher(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Викладача прикріплено до дисципліни', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({
          message: (error as any)?.response?.data?.message || error.message,
          status: 'error',
        })
      )
      throw error
    }
  }
)

/* unpinTeacher */
export const unpinTeacher = createAsyncThunk('group/unpinTeacher', async (lessonId: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await groupLoadLessonsAPI.unpinTeacher(lessonId)
    thunkAPI.dispatch(setAppAlert({ message: 'Викладача відкріплено від дисципліни', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

/* add/delete students to/from lesson */
export const addStudentToLesson = createAsyncThunk(
  'group/addStudentToLesson',
  async (payload: AddStudentToLessonType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await groupLoadLessonsAPI.addStudentsToLesson(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента зараховано на дисципліну', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const deleteStudentFromLesson = createAsyncThunk(
  'group/deleteStudentFromLesson',
  async (payload: DeleteStudentFromLessonType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await groupLoadLessonsAPI.deleteStudentsFromLesson(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента відраховано з дисципліни', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const addStudentsToAllGroupLessons = createAsyncThunk(
  'group/addStudentsToAllGroupLessons',
  async (payload: AddStudentsToAllGroupLessonsType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await groupLoadLessonsAPI.addStudentsToAllGroupLessons(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента зараховано на дисципліни', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)

export const deleteStudentsFromAllGroupLessons = createAsyncThunk(
  'group/deleteStudentsFromAllGroupLessons',
  async (payload: DeleteStudentsFromAllGroupLessonsType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
    try {
      const { data } = await groupLoadLessonsAPI.deleteStudentsFromAllGroupLessons(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Студента відраховано з дисциплін', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      const message = (error as any)?.response?.data?.message || error.message
      thunkAPI.dispatch(setAppAlert({ message, status: 'error' }))
      throw error
    }
  }
)
