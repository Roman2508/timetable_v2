import { BarChartOutlined, SettingOutlined, SnippetsOutlined } from '@ant-design/icons'

// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons'
// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

const icons = {
  SettingOutlined,
  ChromeOutlined,
  QuestionOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  BarChartOutlined,
  SnippetsOutlined,
}

const settings = {
  id: 'settings',
  title: 'Налаштування',
  icon: icons.SettingOutlined,
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Налаштування',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false,
    },
    {
      id: 'stats',
      title: 'Статистика',
      type: 'item',
      url: '/stats',
      icon: icons.BarChartOutlined,
      breadcrumbs: false,
    },
    {
      id: 'reports',
      title: 'Звіти',
      type: 'item',
      url: '/reports',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false,
    },

    /*  */

    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true,
    },
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/typography',
      icon: icons.FontSizeOutlined,
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/color',
      icon: icons.BgColorsOutlined,
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.BarcodeOutlined,
    },
    {
      id: 'ant-icons',
      title: 'Ant Icons',
      type: 'item',
      url: '/icons/ant',
      icon: icons.AntDesignOutlined,
      breadcrumbs: false,
    },
  ],
}

export default settings
