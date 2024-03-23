import { LoadingStatusTypes } from "../appTypes"
import { GroupLoadType } from "../groups/groupsTypes"

export type StreamsInitialState = {
  streams: StreamsType[] | null
  streamLessons: null | GroupLoadType[]
  loadingStatus: LoadingStatusTypes
}

export type StreamsType = {
  id: number
  name: string
  groups: { id: number; name: string }[]
  lessons: { id: number; name: string }[]
}
