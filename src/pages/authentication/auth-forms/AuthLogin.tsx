import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Chip,
} from '@mui/material'

// third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial'
import AnimateButton from '../../../components/@extended/AnimateButton'

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false)

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEventHandler<HTMLButtonElement>) => {
    // @ts-ignore
    event.preventDefault()
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {/* <Typography sx={{ mt: 2 }}>Вхід</Typography> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Controller
          name="name"
          control={control}
          rules={{ required: 'Вкажіть назву категорії' }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="name">Назва*</InputLabel>
                <OutlinedInput
                  id="name"
                  type="firstname"
                  {...field}
                  // value={values.firstname}
                  name="name"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="Назва ЦК"
                  fullWidth
                  error={Boolean(errors.name)}
                />
                {errors.name && (
                  <FormHelperText error id="helper-text-name">
                    {errors.name.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        /> */}

        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="name">Логін*</InputLabel>
          <OutlinedInput
            id="name"
            type="text"
            name="name"
            placeholder="test"
            sx={{ mt: '2px !important' }}
            fullWidth
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <FormHelperText error id="helper-text-name">
              {errors.name.message}
            </FormHelperText>
          )}
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="name">Пароль*</InputLabel>
          <OutlinedInput
            id="name"
            type="password"
            sx={{ mt: '2px !important' }}
            name="name"
            placeholder="test"
            fullWidth
            error={Boolean(errors.name)}
          />
          {errors.name && (
            <FormHelperText error id="helper-text-name">
              {errors.name.message}
            </FormHelperText>
          )}
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'capitalize',
            width: '100%',
            p: '7.44px 15px',
            mt: 3,
          }}
        >
          Увійти
        </Button>

        <Divider sx={{ mt: 1.5 }}>
          <Chip label={'Або'} size="medium" sx={{ userSelect: 'none' }} />
        </Divider>

        <Button
          variant="outlined"
          color="primary"
          sx={{
            textTransform: 'capitalize',
            width: '100%',
            p: '7.44px 15px',
            mt: 1.5,
          }}
        >
          Google
        </Button>
      </form>
      {/* <Formik
        initialValues={{
          email: 'info@codedthemes.com',
          password: '123456',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
          } catch (err) {
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik> */}
    </div>
  )
}

export default AuthLogin
