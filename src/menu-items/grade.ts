// assets
import { LoginOutlined, ProfileOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
  TeamOutlined,
}

// ==============================|| MENU ITEMS - GRADE PAGES ||============================== //

const grade = {
  id: 'students',
  title: 'Журнал',
  type: 'group',
  children: [
    {
      id: 'grade-book',
      title: 'Електронний журнал',
      type: 'item',
      url: '/grade-book',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
  ],
}

export default grade
