import { Outlet } from 'react-router-dom'
import { Typography } from '@mui/material'

import './minimal-layout.css'
import Logo from '../../assets/logo.svg'
import MainCard from '../../components/MainCard'

const MinimalLayout = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      maxHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        top: '-40px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          flexDirection: 'column',
        }}
      >
        <img src={Logo} width={100} />
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', textTransform: 'uppercase', maxWidth: '480px', padding: '0 20px  ' }}
        >
          Житомирський базовий фармацевтичний фаховий коледж
        </Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '14px' }} variant="overline">
          Житомирської обласної ради
        </Typography>
      </div>

      <MainCard
        sx={{
          width: '300px',
          position: 'relative',
          backgroundColor: '#fff !important',
          '& .MuiCardContent-root': { p: '20px 25px' },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'inherit',
            marginBottom: 12,
          }}
        >
          <Outlet />
        </div>
      </MainCard>
    </div>
  </div>
)

export default MinimalLayout
