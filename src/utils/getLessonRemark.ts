import { GroupLoadStreamType } from "../store/groups/groupsTypes"

interface IgetLessonRemarkProps {
  stream: GroupLoadStreamType | null
  subgroupNumber: number | null
  typeRu: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД"
}

const getLessonRemark = ({ stream, subgroupNumber, typeRu }: IgetLessonRemarkProps): string => {
  const streamName = stream ? ` ⋅ ${stream.name}` : ""
  const subgroup = subgroupNumber ? ` ⋅ п.${subgroupNumber}` : ""
  const remark = typeRu + streamName + subgroup

  return remark
}

export { getLessonRemark }
