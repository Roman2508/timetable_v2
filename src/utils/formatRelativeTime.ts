import dayjs from 'dayjs'
import { customDayjs } from './customDayJs'

export const formatRelativeTime = (inputTime: string | null): string => {

  if (!inputTime) return '-'
  const currentTime = customDayjs().utc() // Текущее время в UTC
  const targetTime = customDayjs.utc(inputTime) // Преобразуем входное время в UTC
  // Возвращаем относительное время
  return targetTime.from(currentTime)
}
