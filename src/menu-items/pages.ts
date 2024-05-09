// assets
import { LoginOutlined, ProfileOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
  TeamOutlined,
}

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'students',
  title: 'Студенти',
  type: 'group',
  children: [
    {
      id: 'students-accounts',
      title: 'Облікові записи',
      type: 'item',
      url: '/students/accounts',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'students-divide',
      title: 'Поділ на підгрупи',
      type: 'item',
      url: '/students/divide',
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true,
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true,
    },
  ],
}

export default pages
