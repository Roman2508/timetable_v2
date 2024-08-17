import {
  Box,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  ListItem,
  ButtonBase,
  IconButton,
  Typography,
  useMediaQuery,
  ListItemIcon,
  Chip,
} from "@mui/material"
import React from "react"
import { useTheme } from "@mui/material/styles"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

import ArrowIcon from "./ArrowIcon"
import ApplicationIcon from "./ApplicationIcon"
import AppBarStyled from "../../layout/MainLayout/Header/AppBarStyled"
import HeaderContent from "../../layout/MainLayout/Header/HeaderContent"
import menuItems from "../../menu-items"
import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import "./header.css"

/* 
Структура
 - Групи
 - Потоки
 - Аудиторії
Навчальне навантаження
 - Плани
 - Розподіл навантаження
 - Перегляд навантаження
Облікові записи
 - Педагогічний склад
 - Здобувачі освіти
 - Поділ на підгрупи
Розклад
 - Розклад
 - Контроль вичитки
 - Пошук вільної аудиторії
Загальні відомості
 - Особистий профіль
 - Електронний журнал
Налаштування
 - Налаштування
 - Статистика
 - Звіти
*/

interface IHeaderProps {
  open: boolean
  handleDrawerToggle: () => void
}

const Header: React.FC<IHeaderProps> = ({ open, handleDrawerToggle }) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"))
  const [hoveredItemId, setHoveredItemId] = React.useState("")

  const { pathname } = useLocation()

  const iconBackColor = "grey.100"
  const iconBackColorOpen = "grey.200"

  // app-bar params
  const appBar = {
    position: "fixed" as "fixed" | "absolute" | "relative" | "static" | "sticky" | undefined,
    color: "inherit" as "error" | "info" | "success" | "warning" | "transparent",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      // boxShadow: theme.customShadows.z1,
    },
  }

  return (
    <>
      {!matchDownMD ? (
        <>
          <AppBarStyled /* open={open}  */ {...appBar}>
            <Toolbar
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                zIndex: 10,
                paddingLeft: "12px !important",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: "5px", color: "inherit" }}>
                  <img src={Logo} width={50} />
                  <Typography className="collage-name">ЖБФФК</Typography>
                </Link>
              </Stack>

              {/* <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                color="secondary"
                sx={{ color: "text.primary", bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: 2 } }}
              >
                {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </IconButton> */}

              <Stack direction="row" spacing={2}>
                {menuItems.items.map((el) => {
                  const Icon = el.icon

                  const isSelectedPage = el.children.some((s) => s.url === pathname)

                  return (
                    <ListItem
                      key={el.id}
                      sx={{ position: "relative", m: "4px !important", p: 0 }}
                      onMouseEnter={() => setHoveredItemId(el.id)}
                      onMouseLeave={() => setHoveredItemId("")}
                    >
                      <ButtonBase
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: "10px",
                          color: isSelectedPage ? "rgb(22, 119, 255)" : "#262626",
                          backgroundColor: isSelectedPage ? "rgba(22, 119, 255, 0.08)" : "#fff",
                        }}
                        color="primary"
                      >
                        <Icon />

                        <Typography sx={{ whiteSpace: "nowrap" }}>{el.title}</Typography>

                        <ArrowIcon style={hoveredItemId === el.id ? { transform: "rotate(90deg)" } : {}} />
                      </ButtonBase>

                      {hoveredItemId === el.id && (
                        <Paper sx={{ position: "absolute", top: "40px", py: "10px", minWidth: "240px" }} elevation={7}>
                          {el.children.map((c) => {
                            const Icon = c.icon

                            return (
                              <Link to={c.url} style={{ color: "inherit" }}>
                                <ButtonBase
                                  key={c.id}
                                  sx={{
                                    gap: 1,
                                    p: "10px 20px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    color: pathname === c.url ? "rgb(22, 119, 255)" : "#262626",
                                    backgroundColor: pathname === c.url ? "rgba(22, 119, 255, 0.08)" : "#fff",
                                  }}
                                >
                                  <Icon />
                                  <Typography>{c.title}</Typography>
                                </ButtonBase>
                              </Link>
                            )
                          })}
                        </Paper>
                      )}
                    </ListItem>
                  )
                })}
              </Stack>

              <HeaderContent />
            </Toolbar>
          </AppBarStyled>

          {/* <AppBar
            {...appBar}
            sx={open ? { top: "60px", transition: "all .3s linear", p: 0 } : { top: "0", transition: "all .3s linear" }}
          >
            <Toolbar
              sx={
                open
                  ? { top: "0", transition: "all .3s linear", p: 0 }
                  : { top: "-150px", transition: "all .3s linear", p: 0 }
              }
            >
              <Box sx={{ maxWidth: "1440px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                <Stack direction="row" spacing={2}>
                  {menuItems.items.map((el) => {
                    const Icon = el.icon

                    const isSelectedPage = el.children.some((s) => s.url === pathname)

                    return (
                      <ListItem
                        key={el.id}
                        sx={{ position: "relative", m: "4px !important", p: 0 }}
                        onMouseEnter={() => setHoveredItemId(el.id)}
                        onMouseLeave={() => setHoveredItemId("")}
                      >
                        <ButtonBase
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: "10px",
                            color: isSelectedPage ? "rgb(22, 119, 255)" : "#262626",
                            backgroundColor: isSelectedPage ? "rgba(22, 119, 255, 0.08)" : "#fff",
                          }}
                          color="primary"
                        >
                          <Icon />

                          <Typography sx={{ whiteSpace: "nowrap" }}>{el.title}</Typography>

                          <ArrowIcon style={hoveredItemId === el.id ? { transform: "rotate(90deg)" } : {}} />
                        </ButtonBase>

                        {hoveredItemId === el.id && (
                          <Paper
                            sx={{ position: "absolute", top: "40px", py: "10px", minWidth: "240px" }}
                            elevation={7}
                          >
                            {el.children.map((c) => {
                              const Icon = c.icon

                              return (
                                <Link to={c.url} style={{ color: "inherit" }}>
                                  <ButtonBase
                                    key={c.id}
                                    sx={{
                                      gap: 1,
                                      p: "10px 20px",
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      color: pathname === c.url ? "rgb(22, 119, 255)" : "#262626",
                                      backgroundColor: pathname === c.url ? "rgba(22, 119, 255, 0.08)" : "#fff",
                                    }}
                                  >
                                    <Icon />
                                    <Typography>{c.title}</Typography>
                                  </ButtonBase>
                                </Link>
                              )
                            })}
                          </Paper>
                        )}
                      </ListItem>
                    )
                  })}
                </Stack>
              </Box>
            </Toolbar>
          </AppBar> */}
        </>
      ) : (
        <AppBar {...appBar}>
          <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}`, justifyContent: "space-between" }}>
            <IconButton
              disableRipple
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              color="secondary"
              sx={{ color: "text.primary", bgcolor: open ? iconBackColorOpen : iconBackColor, ml: -1 }}
            >
              {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </IconButton>
            <HeaderContent />
          </Toolbar>
        </AppBar>
      )}
    </>
  )
}

export default Header
