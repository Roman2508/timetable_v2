import { Divider, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Logo from '../../assets/logo.svg'
import MainCard from '../../components/MainCard'
import './minimal-layout.css'

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <div
    style={{
      height: '100vh',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className="blur-logo-bg">
      <img src={Logo} />
    </div>

    <MainCard sx={{ width: '300px', backgroundColor: '#fff !important', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'inherit',
          marginBottom: 12,
        }}
      >
        <img src={Logo} width={70} />
        <Typography>ЖБФФК</Typography>

        <Divider />

        <Outlet />
      </div>
    </MainCard>
  </div>
)

export default MinimalLayout
