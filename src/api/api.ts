import axios from 'axios'

import {
  CreatePlanPayloadType,
  UpdateGroupPayloadType,
  CreateSubjectPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherPayloadType,
  CreateAuditoryPayloadType,
  UpdateAuditoryPayloadType,
  UpdateEntityNamePayloadType,
  UpdateSubjectNamePayloadType,
  UpdateSubjectHoursPayloadType,
  CreateTeacherCategoryPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateAuditoryCategoryPayloadType,
} from './apiTypes'
import { TeachersCategoryType } from '../store/teachers/teachersTypes'
import { GroupCategoriesType, GroupsType } from '../store/groups/groupsTypes'
import { PlanType, PlansCategoriesType, PlansType } from '../store/plans/plansTypes'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../store/auditories/auditoriesTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
  // headers: {
  //   ['Content-Type']: 'application/json',
  //   responseType: 'json',
  // },
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = String(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA5NzM2NjgwLCJleHAiOjE3MTIzMjg2ODB9.2kHG4Wrj1jQlsyuWRiaQP1NgE6SdhCbYSnSw1A41zwA'
    )
    // config.headers.Authorization = String(window.localStorage.getItem('token'))

    return config
  }
})

export const auditoriesAPI = {
  /* categories */
  getAuditoryCategories() {
    return instanse.get<AuditoryCategoriesTypes[]>('/auditory-categories')
  },
  createAuditoryCategory(name: string) {
    return instanse.post<AuditoryCategoriesTypes>('/auditory-categories', {
      name,
    })
  },
  updateAuditoryCategory(payload: UpdateAuditoryCategoryPayloadType) {
    return instanse.patch<AuditoryCategoriesTypes>(`/auditory-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  async deleteAuditoryCategory(id: number) {
    return instanse.delete<number>(`/auditory-categories/${id}`)
  },

  /* auditories */

  createAuditory(payload: CreateAuditoryPayloadType) {
    return instanse.post<AuditoriesTypes>('/auditories', payload)
  },
  updateAuditory(payload: UpdateAuditoryPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<AuditoriesTypes>(`/auditories/${id}`, rest)
  },
  deleteAuditory(id: number) {
    return instanse.delete<number>(`/auditories/${id}`)
  },
}

export const teachersAPI = {
  /* categories */
  getTeachersCategories() {
    return instanse.get<TeachersCategoryType[]>('/teacher-categories')
  },
  createTeacherCategory(payload: CreateTeacherCategoryPayloadType) {
    return instanse.post('/teacher-categories/', { name: payload.name })
  },
  updateTeacherCategory(payload: UpdateTeacherCategoryPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch<TeachersCategoryType>(`/teacher-categories/${id}`, rest)
  },
  deleteTeacherCategory(id: number) {
    return instanse.delete<number>(`/teacher-categories/${id}`)
  },

  /* teachers */
  createTeacher(payload: CreateTeacherPayloadType) {
    return instanse.post('/teachers', payload)
  },
  updateTeacher(payload: UpdateTeacherPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch(`/teachers/${id}`, rest)
  },
  deleteTeacher(id: number) {
    return instanse.delete(`/teachers/${id}`)
  },
}

export const plansAPI = {
  /* categories */
  getPlansCategories() {
    return instanse.get<PlansCategoriesType[]>('/plan-categories')
  },
  createPlanCategory(payload: { name: string }) {
    return instanse.post<PlansCategoriesType>('/plan-categories', payload)
  },
  updatePlanCategory(payload: { name: string; id: number }) {
    return instanse.patch<PlansCategoriesType>(`/plan-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlanCategory(id: number) {
    return instanse.delete<number>(`/plan-categories/${id}`)
  },

  /* plans */
  createPlan(payload: CreatePlanPayloadType) {
    return instanse.post<PlansType>('/plans', payload)
  },
  updatePlan(payload: { name: string; id: number }) {
    return instanse.patch<PlansType>(`/plans/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlan(id: number) {
    return instanse.delete<number>(`/plans/${id}`)
  },
}

export const planSubjectsAPI = {
  getSubjects(id: number) {
    return instanse.get<PlanType>(`/plans/${id}`)
  },
  createSubject(payload: CreateSubjectPayloadType) {
    return instanse.post<any>('/plan-subjects', payload)
  },
  updateSubjectName(payload: UpdateSubjectNamePayloadType) {
    return instanse.patch<{ id: number; name: string; cmk: number }[]>('/plan-subjects/name', payload)
  },
  updateSubjectHours(payload: UpdateSubjectHoursPayloadType) {
    const { id, ...data } = payload
    return instanse.patch<any>(`/plan-subjects/hours/${id}`, data)
  },
  deleteSubject(id: number) {
    return instanse.delete<number>(`/plan-subjects/${id}`)
  },
}

export const groupsAPI = {
  /* categories */
  getGroupsCategories() {
    return instanse.get<GroupCategoriesType[]>('/group-categories')
  },
  createGroupCategory(payload: string) {
    return instanse.post<GroupCategoriesType>('/group-categories', { name: payload })
  },
  updateGroupCategory(payload: UpdateEntityNamePayloadType) {
    return instanse.patch<GroupCategoriesType>(`/group-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deleteGroupCategory(id: number) {
    return instanse.delete<number>(`/group-categories/${id}`)
  },

  /* Groups */
  getGroup(id: string) {
    return instanse.get<GroupsType>(`/groups/${id}`)
  },
  createGroup(payload: UpdateGroupPayloadType) {
    return instanse.post<GroupsType>('/groups', payload)
  },
  updateGroup(payload: UpdateGroupPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<GroupsType>(`/groups/${id}`, rest)
  },
  deleteGroup(id: number) {
    return instanse.delete<number>(`/groups/${id}`)
  },
}
