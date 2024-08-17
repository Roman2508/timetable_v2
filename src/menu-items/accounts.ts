import { UserOutlined, TeamOutlined } from "@ant-design/icons"

const icons = { UserOutlined, TeamOutlined }

const accounts = {
  id: "accounts",
  title: "Облікові записи",
  type: "group",
  icon: icons.UserOutlined,
  children: [
    {
      id: "students-accounts",
      title: "Облікові записи",
      type: "item",
      url: "/students/accounts",
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: "students-divide",
      title: "Поділ на підгрупи",
      type: "item",
      url: "/students/divide",
      icon: icons.TeamOutlined,
      breadcrumbs: false,
    },
    {
      id: "login1",
      title: "Login (del)",
      type: "item",
      url: "/auth",
      icon: icons.UserOutlined,
      target: true,
    },
    {
      id: "register1",
      title: "Register (del)",
      type: "item",
      url: "/register",
      icon: icons.UserOutlined,
      target: true,
    },
  ],
}

export default accounts
