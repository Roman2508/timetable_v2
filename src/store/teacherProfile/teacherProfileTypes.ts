import { LoadingStatusTypes } from '../appTypes'
import { GroupLoadType } from '../groups/groupsTypes'
import { TeachersType } from '../teachers/teachersTypes'

export type TeacherProfileInitialInitialState = {
  // Загальна інформація, Видавнича діяльність
  generalInfo: TeachersType | null

  // Пед. навантаження
  workload: GroupLoadType[] | null

  // Дисципліна в яку викладач вносить теми уроків (Навчально-методичні комплекси)
  // TODO: Переіменувати
  lesson: GroupLoadType | null
  instructionalMaterials: InstructionalMaterialsType[] | null

  individualWorkPlan: IndividualWorkPlanType[] | null

  report: TeacherReportType[] | null

  loadingStatus: LoadingStatusTypes
}

export type InstructionalMaterialsType = {
  id: number
  lesson: { id: number; name: string }
  lessonNumber: number
  name: string // Назва теми
}

export type IndividualWorkPlanType = {
  id: number
  name: string
  date: string
  hours: number
  description: string
}

export type TeacherReportType = {
  id: number
  name: string
  plannedDate: string
  doneDate: string
  hours: number
  description: string
  isDone: boolean
  files: any[] // Може: string[] де string це посилання на гугл диск
}
