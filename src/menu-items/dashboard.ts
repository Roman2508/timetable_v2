// assets
import { DashboardOutlined } from '@ant-design/icons'
import { ApartmentOutlined } from '@ant-design/icons'
import { ProfileOutlined } from '@ant-design/icons'
import { BookOutlined } from '@ant-design/icons'
import { GroupOutlined } from '@ant-design/icons'
import { AppstoreOutlined } from '@ant-design/icons'
import { ReadOutlined } from '@ant-design/icons'
import { UserOutlined } from '@ant-design/icons'
import { CalendarOutlined } from '@ant-design/icons'
import { FormOutlined } from '@ant-design/icons'
import { FileSearchOutlined } from '@ant-design/icons'

// icons
const icons = {
  DashboardOutlined,
  ApartmentOutlined,
  ProfileOutlined,
  BookOutlined,
  GroupOutlined,
  AppstoreOutlined,
  ReadOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
  FileSearchOutlined,
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Групи',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.ApartmentOutlined,
      breadcrumbs: false,
    },
    {
      id: 'distribution',
      title: 'Розподіл навантаження',
      type: 'item',
      url: '/distribution',
      icon: icons.ProfileOutlined,
      breadcrumbs: false,
    },
    {
      id: 'plans',
      title: 'Плани',
      type: 'item',
      url: '/plans',
      icon: icons.BookOutlined,
      breadcrumbs: false,
    },
    {
      id: 'streams',
      title: 'Потоки',
      type: 'item',
      url: '/streams',
      icon: icons.GroupOutlined,
      breadcrumbs: false,
    },
    {
      id: 'teachers',
      title: 'Викладачі',
      type: 'item',
      url: '/teachers',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'auditories',
      title: 'Аудиторії',
      type: 'item',
      url: '/auditories',
      icon: icons.AppstoreOutlined,
      breadcrumbs: false,
    },
    {
      id: 'load',
      title: 'Навантаження',
      type: 'item',
      url: '/load',
      icon: icons.ReadOutlined,
      breadcrumbs: false,
    },
    {
      id: 'distribution',
      title: 'Контроль вичиткия',
      type: 'item',
      url: '/distribution',
      icon: icons.FormOutlined,
      breadcrumbs: false,
    },
    {
      id: 'distribution',
      title: 'Пошук вільної аудиторії',
      type: 'item',
      url: '/distribution',
      icon: icons.FileSearchOutlined,
      breadcrumbs: false,
    },
    {
      id: 'timetable',
      title: 'Розклад',
      type: 'timetable',
      url: '/distribution',
      icon: icons.CalendarOutlined,
      breadcrumbs: false,
    },
    /*  */
    {
      id: 'students',
      title: 'Студенти',
      type: 'item',
      url: '/students',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    /*  */
  ],
}

export default dashboard
