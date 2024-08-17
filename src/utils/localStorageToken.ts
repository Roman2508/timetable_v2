export const TOKEN_NAME = "pharm.token"

export const getLocalStorageToken = () => {
  const token = window.localStorage.getItem(TOKEN_NAME)
  return token
}

export const setLocalStorageToken = (token: string) => {
  window.localStorage.setItem(TOKEN_NAME, token)
}

export const removeLocalStorageToken = () => {
  window.localStorage.removeItem(TOKEN_NAME)
}
