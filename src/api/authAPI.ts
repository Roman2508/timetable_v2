import { instanse } from "./api"
import { AuthResponseType, GoogleLoginPayloadType, LoginPayloadType, RegisterPayloadType } from "./apiTypes"

export const authAPI = {
  register(payload: RegisterPayloadType) {
    return instanse.post<AuthResponseType>("/auth/register", payload)
  },

  login(payload: LoginPayloadType) {
    return instanse.post<AuthResponseType>("/auth/login", payload)
  },

  googleLogin(payload: GoogleLoginPayloadType) {
    return instanse.post<AuthResponseType>("/auth/google/me", payload)
  },

  getMe(token: string) {
    return instanse.post<AuthResponseType>("/auth/me", { token })
  },
}
