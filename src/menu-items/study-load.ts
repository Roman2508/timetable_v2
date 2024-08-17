import { BookOutlined } from "@ant-design/icons"
import { ReadOutlined } from "@ant-design/icons"
import { ProfileOutlined } from "@ant-design/icons"

const icons = { ProfileOutlined, BookOutlined, ReadOutlined }

const studyLoad = {
  id: "study-load",
  title: "Навантаження",
  icon: icons.BookOutlined,
  type: "group",
  children: [
    {
      id: "plans",
      title: "Плани",
      type: "item",
      url: "/plans",
      icon: icons.BookOutlined,
      breadcrumbs: false,
    },
    {
      id: "distribution",
      title: "Розподіл навантаження",
      type: "item",
      url: "/distribution",
      icon: icons.ProfileOutlined,
      breadcrumbs: false,
    },
    {
      id: "load",
      title: "Перегляд навантаження",
      type: "item",
      url: "/load",
      icon: icons.ReadOutlined,
      breadcrumbs: false,
    },
  ],
}

export default studyLoad
