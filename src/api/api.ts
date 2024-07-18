import axios from 'axios'

import {
  GetGradesPayloadType,
  CreatePlanPayloadType,
  GetGradesResponceType,
  UpdateGroupPayloadType,
  UpdateGradePayloadType,
  AddSummaryResponceType,
  GetGradeBookPayloadType,
  AddStudentToLessonType,
  CreateSubjectPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherPayloadType,
  AttachTeacherPayloadType,
  UpdateGradesResponceType,
  CreateStudentsPayloadType,
  UpdateStudentsPayloadType,
  CreateAuditoryPayloadType,
  UpdateAuditoryPayloadType,
  GetGroupOverlayPayloadType,
  CreateSubgroupsPayloadType,
  CopyDaySchedulePayloadType,
  DeleteStudentFromLessonType,
  CopyWeekSchedulePayloadType,
  AddGroupToStreamPayloadType,
  UpdateEntityNamePayloadType,
  CreateReplacementPayloadType,
  UpdateSubjectNamePayloadType,
  AddLessonsToStreamPayloadType,
  UpdateSubjectHoursPayloadType,
  GetTeachersOverlayPayloadType,
  GetScheduleLessonsPayloadType,
  GetAuditoryOverlayPayloadType,
  AddGradeBookSummaryPayloadType,
  AttachSpecializationPayloadType,
  CreateSpecializationPayloadType,
  UpdateSpecializationPayloadType,
  DeleteSpecializationPayloadType,
  CreateScheduleLessonsPayloadType,
  DeleteGroupFromStreamPayloadType,
  CreateTeacherCategoryPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateScheduleLessonsPayloadType,
  UpdateAuditoryCategoryPayloadType,
  DeleteLessonFromStreamPayloadType,
  DeleteGroupFromStreamResponseType,
  FindLessonsForSchedulePayloadType,
  DeleteGradeBookSummaryPayloadType,
  AddStudentsToAllGroupLessonsType,
  DeleteStudentsFromAllGroupLessonsType,
  FindGroupLoadLessonsByGroupIdAndSemesterPayloadType,
  FindAllLessonDatesForTheSemesterPayloadType,
  UpdateColorsPayloadType,
  UpdateCallSchedulePayloadType,
  UpdateSemesterTermsPayloadType,
} from './apiTypes'
import { StreamsType } from '../store/streams/streamsTypes'
import { StudentType } from '../store/students/studentsTypes'
import { SettingsType } from '../store/settings/settingsTypes'
import { GradeBookType } from '../store/gradeBook/gradeBookTypes'
import { ScheduleLessonType } from '../store/scheduleLessons/scheduleLessonsTypes'
import { TeachersCategoryType, TeachersType } from '../store/teachers/teachersTypes'
import { PlanSubjectType, PlanType, PlansCategoriesType, PlansType } from '../store/plans/plansTypes'
import { GroupCategoriesType, GroupLoadType, GroupsType } from '../store/groups/groupsTypes'
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
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzIxMjM5MDYyLCJleHAiOjE3MjM4MzEwNjJ9.O0osoQUx2jo51o67VVgly4Fx4Rh3397VHE_z5aNIbn8'
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
  getTeachersCategories(isHide: boolean = false) {
    return instanse.get<TeachersCategoryType[]>(`/teacher-categories/${isHide}`)
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
  handleTeacherVisible(id: number) {
    return instanse.patch<{ id: number }>(`/teachers/handle-visible/${id}`)
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
  getPlanName(id: number) {
    return instanse.get<PlanType>(`/plans/${id}`)
  },
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
  getPlanSubjects(payload: { id: number; semesters: string }) {
    const { id, semesters } = payload

    return instanse.get<PlanSubjectType[]>(`/plan-subjects/${id}`, { params: { semesters } })
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
  getGroupsCategories(isHide: boolean) {
    return instanse.get<GroupCategoriesType[]>(`/group-categories/${isHide}`)
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
  handleGroupVisible(id: number) {
    return instanse.patch<{ id: number; isHide: boolean }>(`/groups/handle-visible/${id}`)
  },

  createSpecialization(payload: CreateSpecializationPayloadType) {
    return instanse.post<string[]>(`/groups/specialization`, payload)
  },

  updateSpecialization(payload: UpdateSpecializationPayloadType) {
    return instanse.patch<string[]>(`/groups/specialization`, payload)
  },

  deleteSpecialization(payload: DeleteSpecializationPayloadType) {
    return instanse.delete<string[]>(`/groups/specialization/${payload.groupId}/${payload.name}`)
  },
}

export const groupLoadLessonsAPI = {
  /* Specialization */
  attachSpecialization(payload: AttachSpecializationPayloadType) {
    return instanse.patch<AttachSpecializationPayloadType>(`/group-load-lessons/specialization`, payload)
  },

  /* Students */
  addStudentsToLesson(payload: AddStudentToLessonType) {
    return instanse.patch<StudentType[]>('/group-load-lessons/students/add', payload)
  },

  deleteStudentsFromLesson(payload: DeleteStudentFromLessonType) {
    return instanse.patch<StudentType[]>('/group-load-lessons/students/delete', payload)
  },

  addStudentsToAllGroupLessons(payload: AddStudentsToAllGroupLessonsType) {
    return instanse.patch<StudentType[]>('/group-load-lessons/students/all/add', payload)
  },

  deleteStudentsFromAllGroupLessons(payload: DeleteStudentsFromAllGroupLessonsType) {
    return instanse.patch<StudentType[]>('/group-load-lessons/students/all/delete', payload)
  },

  /* Subgroups */
  createSubgroups(payload: CreateSubgroupsPayloadType) {
    return instanse.patch<GroupLoadType[]>(`/group-load-lessons/subgroups`, payload)
  },

  /* teachers */
  attachTeacher(payload: AttachTeacherPayloadType) {
    return instanse.patch<{ lessonId: number; teacher: TeachersType }>(
      `/group-load-lessons/attach-teacher/${payload.lessonId}/${payload.teacherId}`
    )
  },

  unpinTeacher(lessonId: number) {
    return instanse.patch<{ lessonId: number }>(`/group-load-lessons/unpin-teacher/${lessonId}`)
  },

  /* group load */
  findLessonsForSchedule(payload: FindLessonsForSchedulePayloadType) {
    const { semester, itemId, scheduleType } = payload
    return instanse.get<GroupLoadType[]>(`/group-load-lessons/${semester}/${scheduleType}/${itemId}`)
  },

  findGroupLoadLessonsByGroupIdAndSemester(payload: FindGroupLoadLessonsByGroupIdAndSemesterPayloadType) {
    const { semester, groupId } = payload
    return instanse.get<GroupLoadType[]>(`/group-load-lessons/${semester}/${groupId}`)
  },

  getLessonStudents(id: number) {
    return instanse.get<StudentType[]>(`/group-load-lessons/students/get/${id}`)
  },
}

export const streamsAPI = {
  getStreams() {
    return instanse.get<StreamsType[]>('/streams')
  },
  createStream(payload: { name: string }) {
    return instanse.post<StreamsType>('/streams', payload)
  },
  updateStreamName(payload: UpdateEntityNamePayloadType) {
    const { id, name } = payload
    return instanse.patch<StreamsType>(`/streams/name/${id}`, { name })
  },
  deleteStream(id: number) {
    return instanse.delete<number>(`/streams/${id}`)
  },

  /* groups (add or delete) */
  addGroupToStream(payload: AddGroupToStreamPayloadType) {
    const { groupId, streamId } = payload
    return instanse.patch<StreamsType>(`/streams/group/add/${streamId}`, { groupId })
  },
  deleteGroupFromStream(payload: DeleteGroupFromStreamPayloadType) {
    const { groupId, streamId } = payload
    return instanse.delete<DeleteGroupFromStreamResponseType>(`/streams/group/remove/${streamId}/${groupId}`)
  },

  /* lessons (get, add or delete)  */
  getStreamLessonsByGroupId(id: number) {
    return instanse.get<GroupLoadType[]>(`/group-load-lessons/${id}`)
  },

  addLessonToStream(payload: AddLessonsToStreamPayloadType) {
    return instanse.patch<GroupLoadType[]>(`/streams/lesson/add/${payload.streamId}`, payload)
  },
  deleteLessonFromStream(payload: DeleteLessonFromStreamPayloadType) {
    return instanse.patch<GroupLoadType[]>(`/streams/lesson/remove`, payload)
  },
}

export const scheduleLessonsAPI = {
  getLessons(payload: GetScheduleLessonsPayloadType) {
    const { semester, type, id } = payload
    return instanse.get<ScheduleLessonType[]>(`/schedule-lessons/${semester}/${type}/${id}`)
  },
  getAuditoryOverlay(payload: GetAuditoryOverlayPayloadType) {
    const { date, lessonNumber, auditoryId } = payload
    return instanse.get<{ id: number; name: string }[]>(
      `/schedule-lessons/overlay/${date}/${lessonNumber}/${auditoryId}`
    )
  },
  getGroupOverlay(payload: GetGroupOverlayPayloadType) {
    const { semester, groupId } = payload
    return instanse.get<ScheduleLessonType[]>(`/schedule-lessons/${semester}/group/${groupId}`)
  },
  getTeacherOverlay(payload: GetTeachersOverlayPayloadType) {
    const { date, lessonNumber } = payload
    return instanse.get<TeachersType[]>(`/schedule-lessons/overlay/teacher/${date}/${lessonNumber}`)
  },
  create(payload: CreateScheduleLessonsPayloadType) {
    return instanse.post<ScheduleLessonType>(`/schedule-lessons`, payload)
  },

  copyWeekSchedule(payload: CopyWeekSchedulePayloadType) {
    return instanse.post<ScheduleLessonType[]>(`/schedule-lessons/copy-week`, payload)
  },
  copyDaySchedule(payload: CopyDaySchedulePayloadType) {
    return instanse.post<ScheduleLessonType[]>(`/schedule-lessons/copy-day`, payload)
  },

  createReplacement(payload: CreateReplacementPayloadType) {
    return instanse.patch<ScheduleLessonType>(`/schedule-lessons/replacement`, payload)
  },
  deleteReplacement(id: number) {
    return instanse.delete<number>(`/schedule-lessons/replacement/${id}`)
  },

  update(payload: UpdateScheduleLessonsPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<ScheduleLessonType>(`/schedule-lessons/${id}`, rest)
  },
  delete(id: number) {
    return instanse.delete<number>(`/schedule-lessons/${id}`)
  },

  findAllLessonDatesForTheSemester(payload: FindAllLessonDatesForTheSemesterPayloadType) {
    return instanse.get<{ date: string }[]>(`/schedule-lessons/dates`, { params: { ...payload } })
  },
}

export const settingsAPI = {
  getSettings(id: number = 1) {
    return instanse.get<SettingsType>(`/settings/${id}`)
  },
  updateSettings(payload: SettingsType) {
    const { id, ...rest } = payload
    return instanse.patch<SettingsType>(`/settings/${id}`, rest)
  },
  updateColors(payload: UpdateColorsPayloadType) {
    return instanse.patch<SettingsType>(`/settings/colors`, payload)
  },
  updateCallSchedule(payload: UpdateCallSchedulePayloadType) {
    return instanse.patch<SettingsType>(`/settings/call-schedule`, payload)
  },
  updateSemesterTerms(payload: UpdateSemesterTermsPayloadType) {
    return instanse.patch<SettingsType>(`/settings/semester-terms`, payload)
  },
}

export const studentsAPI = {
  getByGroupId(id: number) {
    return instanse.get<StudentType[]>(`/students/${id}`)
  },
  create(payload: CreateStudentsPayloadType) {
    return instanse.post<StudentType>('/students', payload)
  },
  update(payload: UpdateStudentsPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<StudentType>(`/students/${id}`, rest)
  },
  delete(id: number) {
    return instanse.delete<number>(`/students/${id}`)
  },
}

export const gradeBookAPI = {
  get(payload: GetGradeBookPayloadType) {
    const { group, lesson, semester, type } = payload
    return instanse.get<GradeBookType>(`/grade-book/${semester}/${group}/${lesson}/${type}`)
  },

  addSummary(payload: AddGradeBookSummaryPayloadType) {
    const { id, ...data } = payload
    return instanse.patch<AddSummaryResponceType>(`/grade-book/summary/add/${id}`, data)
  },

  deleteSummary(payload: DeleteGradeBookSummaryPayloadType) {
    const { id, ...data } = payload
    return instanse.patch<AddSummaryResponceType>(`/grade-book/summary/delete/${id}`, data)
  },

  getGrades(payload: GetGradesPayloadType) {
    const { studentId, semester } = payload
    return instanse.get<GetGradesResponceType>(`/grades/${semester}/${studentId}`)
  },

  // createGrades(payload: CreateGradesPayloadType) {
  //   return instanse.post<GetGradesResponceType[]>(`/grades`, payload)
  // },

  updateGrade(payload: UpdateGradePayloadType) {
    const { id, ...data } = payload
    return instanse.patch<UpdateGradesResponceType>(`/grades/${id}`, data)
  },

  // deleteGrades(payload: DeleteGradesPayloadType) {
  //   return instanse.patch<GetGradesResponceType[]>(`/grades/delete`, payload)
  // },
}
