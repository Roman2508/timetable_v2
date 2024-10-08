import { Link } from "react-router-dom"
import { Button, Typography } from "@mui/material"

import NotFoundImage from "../../assets/images/Error404.png"

const NotFoundPage = () => {
  return (
    <div className="minimal-layout__wrapper">
      <div className="minimal-layout__inner">
        <img src={NotFoundImage} alt="404 error" style={{ marginBottom: "40px" }} />
        <Typography sx={{ mb: "16px" }} variant="h1" component="h1">
          Сторінку не знайдено
        </Typography>

        <Typography sx={{ mb: "16px", textAlign: "center", color: "rgb(140, 140, 140)" }} variant="body1" component="p">
          Сторінку, яку ви шукаєте, було переміщено, видалено,
          <br />
          перейменовано, або може ніколи не існувало!
        </Typography>

        <Link to="/">
          <Button variant="contained">Повернутись на головну</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
