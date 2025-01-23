import React from 'react'
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, FormHelperText, IconButton, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material'

import { useAppDispatch } from '../../../store/store'
import { AuthResponseType } from '../../../api/apiTypes'
import { authSelector, clearUser } from '../../../store/auth/authSlice'
import { validEmailPattern } from '../../../utils/validEmailPattern'
import { setAppAlert } from '../../../store/appStatus/appStatusSlice'
import { authLogin, authMe, googleLogin } from '../../../store/auth/authAsyncActions'
import { getLocalStorageToken, removeLocalStorageToken, setLocalStorageToken } from '../../../utils/localStorageToken'

interface IFormFields {
  email: string
  password: string
}

const AuthLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useSelector(authSelector)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({ mode: 'onSubmit' })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const { payload } = await dispatch(authLogin(data))
      const response = payload as AuthResponseType

      if (response?.accessToken) {
        setLocalStorageToken(response.accessToken)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    const token = getLocalStorageToken()

    if (token) {
      const fetchData = async () => {
        const res = await dispatch(authMe(token))

        if (!res.payload) {
          removeLocalStorageToken()
          dispatch(clearUser())
        }
      }

      fetchData()
    }
  }, [])

  if (user) navigate('/')

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Це поле обов'язкове",
            pattern: { value: validEmailPattern, message: 'Некоректний email' },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email" sx={errors.email ? { color: '#ff4d4f' } : {}}>
                  Ел.пошта*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="email"
                  type="text"
                  sx={{ mt: '2px !important' }}
                  error={Boolean(errors.email)}
                />
                {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
              </Stack>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Це поле обов'язкове",
            minLength: { value: 6, message: 'Мінімальна кількість символів - 6' },
            maxLength: { value: 25, message: 'Максимальна кількість символів - 25' },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="password" sx={errors.password ? { color: '#ff4d4f' } : {}}>
                  Пароль*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="password"
                  error={Boolean(errors.password)}
                  sx={{ mt: '2px !important', pr: 0 }}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    // <IconButton onClick={handleClickShowPassword} type="button">
                    <IconButton onClick={handleClickShowPassword} type="button">
                      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </IconButton>
                  }
                />
                {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
              </Stack>
            )
          }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting || !!Object.keys(errors).length}
          sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
        >
          Увійти
        </Button>

        <Typography sx={{ display: 'block', textAlign: 'center', my: 1.5 }} variant="overline">
          або
        </Typography>

        <GoogleLogin
          width={248}
          onSuccess={async (credentialResponse) => {
            const decoded = jwt_decode(credentialResponse.credential || '')
            const googleResponse = decoded as any

            if (!Object.keys(googleResponse).length) {
              console.log(googleResponse)
              dispatch(setAppAlert({ message: 'Помилка авторизації!', status: 'error' }))
              return
            }

            const { payload } = await dispatch(googleLogin({ email: googleResponse.email }))
            const response = payload as AuthResponseType
            if (response.accessToken) setLocalStorageToken(response.accessToken)
            navigate('/')

            /* 
            response:
            ==================================
            email: "ptashnyk.roman@pharm.zt.ua"
            name: "Пташник Роман"
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIi0NEbJA3hiboX8uXoBs_5gZv6l7GkCEl32osMqN1hlY6Lhw=s96-c"
            ==================================
            */
          }}
        />
      </form>
    </div>
  )
}

export default AuthLogin
