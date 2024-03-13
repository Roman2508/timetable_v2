import {
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import { PlanSubjectType } from '../../store/plans/plansTypes'
import { IFormFields, formFields } from './FullPlanPageFormFields'
import { deletePlanSubjects, updatePlanSubjectsHours } from '../../store/plans/plansAsyncActions'
import useTotalAndCurrendSubjectHours from '../../utils/useTotalAndCurrendSubjectHours'

interface ISemesterHoursModalProps {
  open: boolean
  selectedSemester: PlanSubjectType | null
  setOpen: Dispatch<SetStateAction<boolean>>
  editingSubjectData: { name: string; cmk: number }
}

const SemesterHoursModal: React.FC<ISemesterHoursModalProps> = ({
  open,
  setOpen,
  selectedSemester,
  editingSubjectData,
}) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    watch,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({ mode: 'onBlur' })

  const { total, current } = useTotalAndCurrendSubjectHours({
    lectures: watch('lectures'),
    practical: watch('practical'),
    laboratory: watch('laboratory'),
    seminars: watch('seminars'),
    independentWork: watch('independentWork'),
    totalHours: watch('totalHours'),
  })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (!selectedSemester) return alert('Семестр не вибраний')

      await dispatch(
        updatePlanSubjectsHours({
          lectures: Number(data.lectures),
          practical: Number(data.practical),
          laboratory: Number(data.laboratory),
          seminars: Number(data.seminars),
          exams: Number(data.exams),
          examsConsulation: Number(data.examsConsulation),
          independentWork: Number(data.independentWork),
          metodologicalGuidance: Number(data.metodologicalGuidance),
          totalHours: Number(data.totalHours),
          id: selectedSemester.id,
          name: selectedSemester.name,
          planId: selectedSemester.plan.id,
          semesterNumber: selectedSemester.semesterNumber,
          cmk: selectedSemester.cmk.id,
        })
      )

      setOpen(false)
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const onDeleteSemester = async () => {
    if (!selectedSemester) return alert('Семестр не вибраний')

    if (window.confirm('Ви дійсно хочете видалити семестр?')) {
      await dispatch(deletePlanSubjects(selectedSemester.id))
      setOpen(false)
    }
  }

  React.useEffect(() => {
    if (selectedSemester) {
      reset(selectedSemester)
    } else {
      reset({
        exams: 0,
        examsConsulation: 0,
        independentWork: 0,
        laboratory: 0,
        lectures: 0,
        metodologicalGuidance: 0,
        practical: 0,
        seminars: 0,
        totalHours: 0,
      })
    }
  }, [selectedSemester])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">{editingSubjectData.name}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText id="alert-dialog-description">
          <Typography sx={current !== total ? { color: 'red' } : {}}>
            {current} / {total}
          </Typography>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((el) => (
              <Controller
                key={el.value}
                name={el.value}
                control={control}
                rules={{ min: 0 }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1} sx={{ mt: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <InputLabel htmlFor={el.value} sx={{ flexGrow: 1, mt: '8px !important', mr: '16px !important' }}>
                        {el.label}
                      </InputLabel>

                      <TextField
                        fullWidth
                        id={el.value}
                        InputProps={{ inputProps: { min: 0, max: 300 } }}
                        size="small"
                        {...field}
                        type="number"
                        name={el.value}
                        placeholder=""
                        sx={{
                          maxWidth: '100px',
                          mr: '8px !important',
                          '& .MuiInputBase-root': { p: 0 },
                        }}
                      />
                    </Stack>
                  )
                }}
              />
            ))}

            <div style={{ display: 'flex', gap: 20 }}>
              <Button
                type="button"
                color="error"
                variant="outlined"
                disabled={isSubmitting}
                onClick={onDeleteSemester}
                sx={{ textTransform: 'capitalize', width: '50%', p: '7.44px 15px', mt: 3 }}
              >
                {!isSubmitting ? 'Видалити' : 'Завантаження...'}
              </Button>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting || current !== total || (!current && !total)}
                sx={{ textTransform: 'capitalize', width: '50%', p: '7.44px 15px', mt: 3 }}
              >
                {!isSubmitting ? 'Зберегти' : 'Завантаження...'}
              </Button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export { SemesterHoursModal }
