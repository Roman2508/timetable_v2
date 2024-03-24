import React from "react"
import emptyImage from "../../assets/empty-image .png"
import { Typography } from "@mui/material"

const EmptyCard: React.FC<{ text?: string }> = ({ text = "Пусто" }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}
    >
      <img src={emptyImage} alt="empty image" width={100} />
      <Typography variant="h5">{text}</Typography>
    </div>
  )
}

export default EmptyCard
