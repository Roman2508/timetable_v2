import { ILastSelectedDataToLocalStoragepProps } from "./setLastSelectedDataToLocalStorage"

export const getLastSelectedDataToLocalStorage = (): ILastSelectedDataToLocalStoragepProps => {
  const data = window.localStorage.getItem("timetable-last-selected-data")

  if (data) {
    return JSON.parse(data)
  } else {
    return {}
  }
}
