import {
  TeacherReportType,
  IndividualWorkPlanType,
  InstructionalMaterialsType,
} from '../store/teacherProfile/teacherProfileTypes'
import {
  CreateTeacherReportType,
  UpdateTeacherReportType,
  CreateIndividualTeacherWorkType,
  UpdateIndividualTeacherWorkType,
  CreateInstructionalMaterialsPayloadType,
  UpdateInstructionalMaterialsPayloadType,
  TeacherReportUploadFileType,
  TeacherReportUploadFileResponceType,
  TeacherReportDeleteFileType,
  TeacherReportDeleteFileResponceType,
} from './apiTypes'
import { instanse } from './api'

export const teacherProfileAPI = {
  /* instructional-materials */
  getInstructionalMaterials(id: number) {
    return instanse.get<InstructionalMaterialsType[]>(`/instructional-materials/${id}`)
  },
  createInstructionalMaterial(payload: CreateInstructionalMaterialsPayloadType) {
    return instanse.post<InstructionalMaterialsType>('/instructional-materials', payload)
  },
  updateInstructionalMaterial(payload: UpdateInstructionalMaterialsPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<InstructionalMaterialsType>(`/instructional-materials/${id}`, rest)
  },
  deleteInstructionalMaterial(id: number) {
    return instanse.delete<number>(`/instructional-materials/${id}`)
  },

  /* individual-teacher-work */
  getIndividualTeacherWork() {
    return instanse.get<IndividualWorkPlanType[]>('/individual-teacher-work')
  },
  createIndividualTeacherWork(payload: CreateIndividualTeacherWorkType) {
    return instanse.post<IndividualWorkPlanType>(`/individual-teacher-work`, payload)
  },
  updateIndividualTeacherWork(payload: UpdateIndividualTeacherWorkType) {
    const { id, ...rest } = payload
    return instanse.patch<IndividualWorkPlanType>(`/individual-teacher-work/${id}`, rest)
  },
  deleteIndividualTeacherWork(id: number) {
    return instanse.delete<number>(`/individual-teacher-work/${id}`)
  },

  /* teacher-report */
  getTeacherReport(id: number) {
    return instanse.get<TeacherReportType[]>(`/teacher-report/${id}`)
  },
  createTeacherReport(payload: CreateTeacherReportType) {
    return instanse.post<TeacherReportType>(`/teacher-report`, payload)
  },
  updateTeacherReport(payload: UpdateTeacherReportType) {
    const { id, ...rest } = payload
    return instanse.patch<TeacherReportType>(`/teacher-report/${id}`, rest)
  },
  createFile(payload: TeacherReportUploadFileType) {
    const { id, file } = payload
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    return instanse.patch<TeacherReportUploadFileResponceType>(`/teacher-report/file/${id}`, file, config)
  },
  deleteFile(payload: TeacherReportDeleteFileType) {
    const { id, fileId } = payload
    return instanse.delete<TeacherReportDeleteFileResponceType>(`/teacher-report/file/${id}/${fileId}`)
  },
  deleteTeacherReport(id: number) {
    return instanse.delete<number>(`/teacher-report/${id}`)
  },
}
