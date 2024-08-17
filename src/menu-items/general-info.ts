import { UserOutlined } from "@ant-design/icons"

const icons = {
  UserOutlined,
}

const profile = {
  id: "profile",
  title: "Загальні відомості",
  icon: icons.UserOutlined,
  type: "group",
  children: [
    {
      id: "teacher",
      title: "Мій профіль",
      type: "item",
      url: "/teacher/:id",
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: "grade-book",
      title: "Електронний журнал",
      type: "item",
      url: "/grade-book",
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
  ],
}

export default profile
