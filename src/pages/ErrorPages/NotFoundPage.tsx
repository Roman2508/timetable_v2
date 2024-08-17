import { Button, Typography } from "@mui/material"

import NotFoundImage from "../../assets/images/Error404.png"

const NotFoundPage = () => {
  return (
    <div className="minimal-layout__wrapper">
      <div className="minimal-layout__inner">
        <img src={NotFoundImage} alt="404 error" style={{ marginBottom: "80px" }} />
        <Typography sx={{ mb: "16px" }} variant="h1" component="h1">
          Page Not Found
        </Typography>

        <Typography sx={{ mb: "16px", textAlign: "center", color: "rgb(140, 140, 140)" }} variant="body1" component="p">
          The page you are looking was moved, removed,
          <br />
          renamed, or might never exist!
        </Typography>

        <Button variant="contained">Back To Home</Button>
      </div>
    </div>
  )
}

export default NotFoundPage
