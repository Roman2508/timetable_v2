import { FormOutlined } from '@ant-design/icons'
import { CalendarOutlined } from '@ant-design/icons'
import { FileSearchOutlined } from '@ant-design/icons'

const icons = { FormOutlined, CalendarOutlined, FileSearchOutlined }

const timetable = {
  id: 'timetable',
  title: 'Розклад',
  type: 'group',
  icon: icons.CalendarOutlined,
  children: [
    {
      id: 'timetable',
      title: 'Розклад',
      type: 'timetable',
      url: '/timetable',
      icon: icons.CalendarOutlined,
      breadcrumbs: false,
    },
    {
      id: 'scheduling-constraints',
      title: 'Обмеження розкладу',
      type: 'item',
      url: '/scheduling-constraints',
      icon: icons.FormOutlined,
      breadcrumbs: false,
    },
    {
      id: 'controls',
      title: 'Контроль вичитки',
      type: 'item',
      url: '/controls',
      icon: icons.FormOutlined,
      breadcrumbs: false,
    },
    {
      id: 'controls',
      title: 'Мій розклад',
      type: 'item',
      url: '/my-timetable',
      icon: icons.FormOutlined,
      breadcrumbs: false,
    },
    {
      id: 'find-free-auditory',
      title: 'Пошук вільної аудиторії',
      type: 'item',
      url: '/find-free-auditory',
      icon: icons.FileSearchOutlined,
      breadcrumbs: false,
    },
  ],
}

export default timetable
