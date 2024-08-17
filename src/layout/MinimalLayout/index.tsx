import { Outlet } from "react-router-dom"
import { Typography } from "@mui/material"

import "./minimal-layout.css"
import Logo from "../../assets/logo.svg"
import MainCard from "../../components/MainCard"
import AppAlert from "../../components/AppAlert/AppAlert"

const MinimalLayout = () => (
  <>
    <AppAlert />

    <div className="minimal-layout__wrapper">
      <div className="minimal-layout__inner">
        <div
          className="minimal-layout__top"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            flexDirection: "column",
          }}
        >
          <img src={Logo} width={100} />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", textTransform: "uppercase", maxWidth: "480px", padding: "0 20px  " }}
          >
            Житомирський базовий фармацевтичний фаховий коледж
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "14px" }} variant="overline">
            Житомирської обласної ради
          </Typography>
        </div>

        <MainCard
          sx={{
            width: "300px",
            position: "relative",
            backgroundColor: "#fff !important",
            "& .MuiCardContent-root": { p: "20px 25px" },
          }}
        >
          <div className="minimal-layout__content">
            <Outlet />
          </div>
        </MainCard>
      </div>
    </div>
  </>
)

export default MinimalLayout
