import dayjs from 'dayjs'
import { customDayjs } from './customDayJs'

export const formatRelativeTime = (inputTime: string | null): string => {
  if (!inputTime) return '-'
  const currentTime = dayjs().utc() // Текущее время в UTC
  const targetTime = dayjs.utc(inputTime) // Преобразуем входное время в UTC
  // Возвращаем относительное время
  return targetTime.from(currentTime)
}
