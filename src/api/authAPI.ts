import { instanse } from "./api"
import { UserType } from "../store/auth/authTypes"
import { GetMePayloadType, GoogleLoginPayloadType, LoginPayloadType, RegisterPayloadType } from "./apiTypes"

export const authAPI = {
  register(payload: RegisterPayloadType) {
    return instanse.post<UserType>("/auth/register", payload)
  },

  login(payload: LoginPayloadType) {
    return instanse.post<UserType>("/auth/login", payload)
  },

  googleLogin(payload: GoogleLoginPayloadType) {
    return instanse.post<UserType>("/auth/google/me", payload)
  },

  getMe(payload: GetMePayloadType) {
    return instanse.post<UserType>("/auth", payload)
  },
}
