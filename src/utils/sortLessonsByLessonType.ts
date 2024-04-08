import { GroupLoadType } from '../store/groups/groupsTypes'

export const sortLessonsByLessonType = (selectedLesson: GroupLoadType[]): GroupLoadType[] => {
  if (!selectedLesson) return []
  const sortOrder = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ', 'ЕКЗ', 'КОНС', 'МЕТОД']
  const lessonsCopy = JSON.parse(JSON.stringify(selectedLesson))

  lessonsCopy.sort((a: GroupLoadType, b: GroupLoadType) => {
    return sortOrder.indexOf(a.typeRu) - sortOrder.indexOf(b.typeRu)
  })

  return lessonsCopy
}
