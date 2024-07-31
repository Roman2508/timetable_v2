import { instanse } from './api'
import { IndividualTeacherWordTypes, InstructionalMaterialsType } from '../store/teacherProfile/teacherProfileTypes'
import { CreateInstructionalMaterialsPayloadType, UpdateInstructionalMaterialsPayloadType } from './apiTypes'

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
    return instanse.get<IndividualTeacherWordTypes[]>('/instructional-materials')
  },
}
