import React from "react"
import emptyImage from "../../assets/empty-image .png"
import { Typography } from "@mui/material"

const EmptyCard = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}
    >
      <img src={emptyImage} alt="empty image" width={100} />
      <Typography variant="h5">Пусто</Typography>
    </div>
  )
}

export default EmptyCard
