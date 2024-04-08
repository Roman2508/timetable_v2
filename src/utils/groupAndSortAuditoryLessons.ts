import { GroupLoadType } from '../store/groups/groupsTypes'
import { ScheduleLessonType } from '../store/scheduleLessons/scheduleLessonsTypes'

export const groupAndSortAuditoryLessons = (selectedLesson: ScheduleLessonType[]): ScheduleLessonType[] => {
  if (!selectedLesson) return []

  const groupedLessons: Record<string, ScheduleLessonType[]> = {}

  selectedLesson.forEach((subject) => {
    const subjectKey = subject.group.id + subject.name + subject.typeRu + subject.subgroupNumber + subject.stream?.id

    if (!groupedLessons[subjectKey]) {
      groupedLessons[subjectKey] = []
    }

    groupedLessons[subjectKey].push(subject)
  })

  const lessonsArr = Object.values(groupedLessons).flat(2)

  const sortOrder = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ', 'ЕКЗ', 'КОНС', 'МЕТОД']
  const lessonsCopy = JSON.parse(JSON.stringify(lessonsArr))

  lessonsCopy.sort((a: GroupLoadType, b: GroupLoadType) => {
    return sortOrder.indexOf(a.typeRu) - sortOrder.indexOf(b.typeRu)
  })

  return lessonsCopy
}
