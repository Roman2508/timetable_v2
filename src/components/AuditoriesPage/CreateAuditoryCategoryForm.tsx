// material-ui
import { Stack, Button, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'

// project import
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { createAuditoryCategory, updateAuditoryCategory } from '../../store/auditories/auditoriesAsyncActions'

interface ICreateAuditoryCategoryFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingAuditoryCategory: { id: number; name: string } | null
}

const CreateAuditoryCategoryForm: React.FC<ICreateAuditoryCategoryFormProps> = ({
  isOpenInModal,
  handleClose = () => {},
  editingAuditoryCategory,
}) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onBlur',
    defaultValues: {
      name: editingAuditoryCategory ? editingAuditoryCategory.name : '',
    },
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (isOpenInModal) {
        if (!editingAuditoryCategory) return
        await dispatch(updateAuditoryCategory({ id: editingAuditoryCategory.id, name: data.name }))
        handleClose()
        reset({ name: '' })
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createAuditoryCategory(data.name))
        reset({ name: '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
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
                placeholder="Корпус 1"
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
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
      >
        {/* {isOpenInModal ? 'Оновити' : 'Створити'} */}
        {isOpenInModal && !isSubmitting ? 'Оновити' : !isSubmitting ? 'Створити' : 'Завантаження...'}
      </Button>
    </form>
  )
}

export default CreateAuditoryCategoryForm
