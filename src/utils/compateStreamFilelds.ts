import { GroupLoadType } from '../store/groups/groupsTypes'

type LessonType = {
  hours: number
  stream: { id: number; name: string } | null
} | null

type FieldsType = 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'

const lessonTypes = ['lectures', 'practical', 'laboratory', 'seminars', 'exams']

export const convertLessonsForCompare = (lessons: GroupLoadType[][]) => {
  const allLessonsArr = lessons.map((lesson) => {
    let result = {
      name: '',
      semester: 0,
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
      if (el.typeEn === 'examsConsulation' || el.typeEn === 'metodologicalGuidance') return

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

export const areAllFieldsInStreamEqual = (lessons: GroupLoadType[][]): boolean => {
  const allLessonsArr = convertLessonsForCompare(lessons)

  console.log(allLessonsArr)

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

export const getIdsByType = (selectedLessons: GroupLoadType[][], type: FieldsType): number[] => {
  const ids: number[] = []

  // Проходимося по кожному масиві у `selectedLessons`
  selectedLessons.forEach((lessonArray) => {
    // Проходимося по кожному об'єкту у масиві `lessonArray`
    lessonArray.forEach((lesson) => {
      // Якщо тип `typeEn` поточного об'єкта дорівнює переданому типу,
      // додаємо його ідентифікатор у масив `ids`
      if (lesson.typeEn === type) {
        ids.push(lesson.id)
      }
    })
  })

  // Повертаємо масив ідентифікаторів
  return ids
}
