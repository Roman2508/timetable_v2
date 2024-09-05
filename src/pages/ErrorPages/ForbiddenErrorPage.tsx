import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

import ForbiddenErrorImage from '../../assets/images/Error-403.png'

const ForbiddenErrorPage = () => {
  return (
    <div className="minimal-layout__wrapper">
      <div className="minimal-layout__inner">
        <img src={ForbiddenErrorImage} alt="403 error" style={{ maxWidth: '360px' }} />
        <Typography sx={{ mb: '16px' }} variant="h1" component="h1">
          Доступ заборонено
        </Typography>

        <Typography sx={{ mb: '16px', textAlign: 'center', color: 'rgb(140, 140, 140)' }} variant="body1" component="p">
          Помилка 403. У вас немає доступу до цієї сторінки.
        </Typography>
        <Link to="/">
          <Button variant="contained">Повернутись на головну</Button>
        </Link>
      </div>
    </div>
  )
}

export default ForbiddenErrorPage
