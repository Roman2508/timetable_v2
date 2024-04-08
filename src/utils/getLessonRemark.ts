import { StreamsType } from '../store/streams/streamsTypes'
import { GroupLoadStreamType } from '../store/groups/groupsTypes'

interface IgetLessonRemarkProps {
  stream: GroupLoadStreamType | StreamsType | null
  subgroupNumber: number | null
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД'
}

const getLessonRemark = ({ stream, subgroupNumber, typeRu }: IgetLessonRemarkProps): string => {
  const streamName = stream ? ` ⋅ ${stream.name}` : ''
  const subgroup = subgroupNumber ? ` ⋅ п.${subgroupNumber}` : ''
  const remark = typeRu + streamName + subgroup

  return remark
}

export { getLessonRemark }
