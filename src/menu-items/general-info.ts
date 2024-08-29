import { BookOutlined, BranchesOutlined, ProfileOutlined } from "@ant-design/icons"

const icons = {
  ProfileOutlined,
  BookOutlined,
  BranchesOutlined,
}

const profile = {
  id: "profile",
  title: "Загальні відомості",
  icon: icons.ProfileOutlined,
  type: "group",
  children: [
    {
      id: "teacher",
      title: "Мій профіль",
      type: "item",
      url: "/teacher/:id",
      icon: icons.ProfileOutlined,
      breadcrumbs: false,
    },
    {
      id: "optional-disciplines",
      title: "Вибіркові дисципліни",
      type: "item",
      url: "/404",
      // url: "/optional-disciplines",
      icon: icons.BranchesOutlined,
      breadcrumbs: false,
    },
    {
      id: "grade-book",
      title: "Електронний журнал",
      type: "item",
      url: "/grade-book",
      icon: icons.BookOutlined,
      breadcrumbs: false,
    },
  ],
}

export default profile
