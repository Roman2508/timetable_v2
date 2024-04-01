import { LoadingStatusTypes } from '../appTypes'
import { GroupLoadType } from '../groups/groupsTypes'
import { StreamsType } from '../streams/streamsTypes'
import { TeachersType } from '../teachers/teachersTypes'
import { AuditoriesTypes } from '../auditories/auditoriesTypes'

export type ScheduleLessonInitialStateType = {
  scheduleLessons: ScheduleLessonType[] | null
  groupLoad: GroupLoadType[] | null
  loadingStatus: LoadingStatusTypes
}

export type ScheduleLessonType = {
  id: number
  name: string
  date: Date
  lessonNumber: number
  semester: number
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ'
  students: number
  replacement: TeachersType
  note: string
  group: { id: number; name: string }
  teacher: TeachersType
  auditory: AuditoriesTypes
  stream: StreamsType
}
