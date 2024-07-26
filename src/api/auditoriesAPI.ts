import { instanse } from './api'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../store/auditories/auditoriesTypes'
import { CreateAuditoryPayloadType, UpdateAuditoryCategoryPayloadType, UpdateAuditoryPayloadType } from './apiTypes'

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
