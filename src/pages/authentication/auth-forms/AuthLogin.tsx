import React from "react"
import jwt_decode from "jwt-decode"
import { Link as RouterLink } from "react-router-dom"

// material-ui
import { Button, FormHelperText, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material"

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { GoogleLogin } from "@react-oauth/google"
import { useAppDispatch } from "../../../store/store"
import { setAppAlert } from "../../../store/appStatus/appStatusSlice"

interface IFormFields {
  login: string
  password: string
}

const AuthLogin = () => {
  const dispatch = useAppDispatch()

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
  } = useForm<IFormFields>({ mode: "onSubmit" })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="login" sx={errors.login ? { color: "#ff4d4f" } : {}}>
                  Логін*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="login"
                  type="text"
                  sx={{ mt: "2px !important" }}
                  error={Boolean(errors.login)}
                />
                {errors.login && <FormHelperText error>{errors.login.message}</FormHelperText>}
              </Stack>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="password" sx={errors.password ? { color: "#ff4d4f" } : {}}>
                  Пароль*
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="password"
                  type="password"
                  sx={{ mt: "2px !important" }}
                  error={Boolean(errors.password)}
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
          sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
        >
          Увійти
        </Button>
        {/* <Divider sx={{ mt: 1.5 }}>
          <Chip label={'Або'} size="medium" sx={{ userSelect: 'none' }} />
        </Divider> */}

        <Typography sx={{ display: "block", textAlign: "center", my: 1.5 }} variant="overline">
          або
        </Typography>

        <GoogleLogin
          width={248}
          onSuccess={async (credentialResponse) => {
            const decoded = jwt_decode(credentialResponse.credential || "")
            const response = decoded as any

            if (!Object.keys(response).length) {
              console.log(response)
              alert("error")
              dispatch(setAppAlert({ message: "Помилка авторизації!", status: "error" }))
              return
            }

            console.log(response)

            /* 
            response:
            ==================================
            email: "ptashnyk.roman@pharm.zt.ua"
            name: "Пташник Роман"
            picture: "https://lh3.googleusercontent.com/a/ACg8ocIi0NEbJA3hiboX8uXoBs_5gZv6l7GkCEl32osMqN1hlY6Lhw=s96-c"
            ==================================
            */
            dispatch(setAppAlert({ message: "Авторизований", status: "success" }))
          }}
        />
      </form>
    </div>
  )
}

export default AuthLogin
