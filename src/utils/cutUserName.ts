import { UserRoles, UserType } from '../store/auth/authTypes'

const cutUserName = (user: UserType) => {
  if (!user) return ''

  if (user.role.includes(UserRoles.STUDENT) && user.student) {
    return user.student.name
  }

  if (user.role.includes(UserRoles.TEACHER) && user.teacher) {
    return `${user.teacher.lastName} ${user.teacher.middleName} ${user.teacher.firstName}`
  }

  return user.email.split('@')[0]
}

export default cutUserName
