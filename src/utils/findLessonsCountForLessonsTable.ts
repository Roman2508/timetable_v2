import { ScheduleLessonType } from '../store/scheduleLessons/scheduleLessonsTypes'

export const findLessonsCountForLessonsTable = (
  name: string,
  groupId: number,
  subgroupNumber: number | null,
  streamId: number | undefined,
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД',
  scheduleLessons: ScheduleLessonType[] | null
): number => {
  if (!scheduleLessons) return 0

  let matchingCount = 0

  scheduleLessons.forEach((el) => {
    const isNameSame = el.name === name
    const isGroupIdSame = el.group.id === groupId
    const isSubgroupNumberSame = el.subgroupNumber === subgroupNumber
    const isStreamSame = el.stream?.id === streamId
    const isTypeRuSame = el.typeRu === typeRu

    if (isNameSame && isGroupIdSame && isSubgroupNumberSame && isStreamSame && isTypeRuSame) {
      ++matchingCount
    }
  })

  return matchingCount * 2
}
