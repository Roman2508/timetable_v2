import { Button, Typography } from "@mui/material"

import InternalServerErrorImage from "../../assets/images/Error500.png"

const InternalServerErrorPage = () => {
  return (
    <div className="minimal-layout__wrapper">
      <div className="minimal-layout__inner">
        <img src={InternalServerErrorImage} alt="500 error" style={{ marginBottom: "20px", maxWidth: "396px" }} />
        <Typography sx={{ mb: "16px" }} variant="h1" component="h1">
          Internal Server Error
        </Typography>

        <Typography sx={{ mb: "16px", textAlign: "center", color: "rgb(140, 140, 140)" }} variant="body1" component="p">
          Server error 500. we fixing the problem. please try
          <br />
          again at a later stage.
        </Typography>

        <Button variant="contained">Back To Home</Button>
      </div>
    </div>
  )
}

export default InternalServerErrorPage
