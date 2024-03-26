import { GroupLoadType } from '../store/groups/groupsTypes'

export const convertLessonsForCompare = (lessons: GroupLoadType[][]) => {
  const allLessonsArr = lessons.map((lesson) => {
    let result = {
      name: '',
      semester: 0,
      stream: null as null | { id: number; name: string },
      specialization: null as number | null,
      subgroupNumber: null as number | null,
      //
      lectures: null,
      practical: null,
      laboratory: null,
      seminars: null,
      exams: null,
    }

    lesson.forEach((el) => {
      result = {
        ...result,
        name: el.name,
        stream: el.stream,
        semester: el.semester,
        specialization: el.specialization,
        subgroupNumber: el.subgroupNumber,
        [el.typeEn]: el.hours,
      }
    })

    return result
  })

  return allLessonsArr
}

export const areAllFieldsInStreamEqual = (lessons: GroupLoadType[][]): boolean => {
  const allLessonsArr = convertLessonsForCompare(lessons)

  if (allLessonsArr.length === 0) {
    return false // Пустий масив
  }

  const sampleObject = allLessonsArr[0]
  for (let i = 1; i < allLessonsArr.length; i++) {
    const currentObject = allLessonsArr[i]
    for (const _key in sampleObject) {
      let key = _key as keyof typeof sampleObject

      if (Object.hasOwnProperty.call(sampleObject, key)) {
        if (key === 'subgroupNumber' || key === 'specialization') {
          if (
            (sampleObject[key] !== null) !== (currentObject[key] !== null) ||
            typeof sampleObject[key] !== typeof currentObject[key]
          ) {
            return false // Значення поля subgroupNumber не співпадають
          }
        } else if (key === 'stream') {
          return sampleObject.stream !== currentObject.stream || sampleObject.stream?.id !== currentObject.stream?.id
        } else if (sampleObject[key] !== currentObject[key]) {
          return false // Значення інших полів не співпадають
        }
      }
    }
  }
  return true // Усі поля однакові
}

type FieldsType = 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'

// export const areFieldInStreamEqual = (lessons: GroupLoadType[][], field: FieldsType): boolean => {
//   const allLessonsArr = convertLessonsForCompare(lessons)

//   if (allLessonsArr.length === 0) {
//     return false // Пустий масив
//   }

//   const sampleValue = allLessonsArr[0][field]
//   for (let i = 1; i < allLessonsArr.length; i++) {
//     if (allLessonsArr[i][field] !== sampleValue) {
//       return false // Значення поля не співпадає зі значенням першого об'єкта
//     }
//   }
//   return true // Значення поля співпадає у всіх об'єктів
// }

export const isFieldNull = (lessons: GroupLoadType[][], field: FieldsType) => {
  const array = convertLessonsForCompare(lessons)
  return array.every((obj) => obj[field] === null)
}

export const isCombinedInStream = (lessons: GroupLoadType[][], field: FieldsType): boolean => {
  const array = convertLessonsForCompare(lessons)

  const filtredLessonsByLessonType = array.filter((el) => el[field] !== null)

  if (filtredLessonsByLessonType.length) {
    return filtredLessonsByLessonType.every((obj) => obj.stream !== null)
  } else {
    return false
  }
}
