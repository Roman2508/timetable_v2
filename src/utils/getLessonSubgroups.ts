import { GroupLoadType } from '../store/groups/groupsTypes'

export const lessonsTypes = {
  lectures: 'ЛекціЇ',
  practical: 'Практичні',
  laboratory: 'Лабораторні',
  seminars: 'Семінари',
  exams: 'Екзамени',
} as const

export type SubgroupsCountList = {
  count: number
  isDisabled: boolean
  typeEn: keyof typeof lessonsTypes
  label: (typeof lessonsTypes)[keyof typeof lessonsTypes]
}

const getLessonSubgroups = (lessons: GroupLoadType[]): SubgroupsCountList[] => {
  const lessonKeys = Object.keys(lessonsTypes) as Array<keyof typeof lessonsTypes>

  return lessonKeys.map((lessonType: keyof typeof lessonsTypes) => {
    let lessonsSubgroups = {} as SubgroupsCountList

    lessons.forEach((lesson) => {
      if (lesson.typeEn === lessonType) {
        const subgroupsCount = lesson.subgroupNumber ? lesson.subgroupNumber : 1

        lessonsSubgroups = {
          typeEn: lessonType,
          count: subgroupsCount,
          isDisabled: false,
          label: lessonsTypes[lessonType],
        }
      }
    })

    if (Object.keys(lessonsSubgroups).length) {
      return lessonsSubgroups
    }

    return {
      typeEn: lessonType,
      count: 1,
      isDisabled: true,
      label: lessonsTypes[lessonType],
    }
  })
}

export { getLessonSubgroups }
