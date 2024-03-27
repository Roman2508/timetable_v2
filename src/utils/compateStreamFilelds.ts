import { GroupLoadType } from '../store/groups/groupsTypes'

type LessonType = {
  hours: number
  stream: { id: number; name: string } | null
} | null

type FieldsType = 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'

export const convertLessonsForCompare = (lessons: GroupLoadType[][]) => {
  const allLessonsArr = lessons.map((lesson) => {
    let result = {
      name: '',
      semester: 0,
      // stream: null as null | { id: number; name: string },
      specialization: null as number | null,
      subgroupNumber: null as number | null,
      //
      lectures: null as LessonType,
      practical: null as LessonType,
      laboratory: null as LessonType,
      seminars: null as LessonType,
      exams: null as LessonType,
    }

    lesson.forEach((el) => {
      result = {
        ...result,
        name: el.name,
        // stream: el.stream,
        semester: el.semester,
        specialization: el.specialization,
        subgroupNumber: el.subgroupNumber,
        [el.typeEn]: {
          hours: el.hours,
          stream: el.stream,
        },
      }
    })

    return result
  })

  return allLessonsArr
}

const lessonTypes = ['lectures', 'practical', 'laboratory', 'seminars', 'exams']

export const areAllFieldsInStreamEqual = (lessons: GroupLoadType[][]): boolean => {
  const allLessonsArr = convertLessonsForCompare(lessons)

  if (allLessonsArr.length === 0) {
    return false // Пустий масив
  }

  const sampleObject = allLessonsArr[0]

  const keys = Object.keys(sampleObject)

  let compareResult

  for (let i = 1; i < allLessonsArr.length; i++) {
    const currentObject = allLessonsArr[i]

    keys.forEach((_key) => {
      let key = _key as keyof typeof sampleObject

      if (lessonTypes.some((k) => k === key)) {
        const lessonsKey = key as FieldsType

        if (!currentObject[lessonsKey]) return

        const isHoursTheSame = sampleObject[lessonsKey]?.hours === currentObject[lessonsKey]?.hours
        const isStreamsTheSame = sampleObject[lessonsKey]?.stream?.id === currentObject[lessonsKey]?.stream?.id

        if (!isHoursTheSame && !isStreamsTheSame) {
          compareResult = false
        }

        // compareResult = isHoursTheSame && isStreamsTheSame
      } else if (sampleObject[key] !== currentObject[key]) {
        compareResult = false // Значення інших полів не співпадають
      }
    })
  }

  if (compareResult !== false) {
    compareResult = true
  }

  return compareResult
}

export const isFieldNull = (lessons: GroupLoadType[][], field: FieldsType) => {
  const array = convertLessonsForCompare(lessons)
  return array.every((obj) => obj[field] === null)
}

export const isCombinedInStream = (lessons: GroupLoadType[][], field: FieldsType): boolean => {
  const array = convertLessonsForCompare(lessons)

  const filtredLessonsByLessonType = array.filter((el) => el[field] !== null)

  if (filtredLessonsByLessonType.length) {
    return filtredLessonsByLessonType.every((obj) => obj[field]?.stream !== null)
  } else {
    return false
  }
}
