import {
  Grid,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  getGroupCategories,
} from '../../store/groups/groupsAsyncActions'
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import { plansSelector } from '../../store/plans/plansSlice'
import { getPlansCategories } from '../../store/plans/plansAsyncActions'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { clearGroupData, groupsSelector } from '../../store/groups/groupsSlice'
import { SelectPlanModal } from '../../components/FullGroupPage/SelectPlanModal'
import { SubgroupsModal } from '../../components/FullGroupPage/Subgroups/SubgroupsModal'
import SpecializationModal from '../../components/FullGroupPage/Specialization/SpecializationModal'

export interface IGroupFilelds {
  name: string
  yearOfAdmission: number
  courseNumber: number
  students: number
  formOfEducation: 'Денна' | 'Заочна'
  educationPlan: number
  category: number
}

const FullGroupPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { plansCategories } = useSelector(plansSelector)
  const { group, groupCategories, loadingStatus } = useSelector(groupsSelector)

  const [planModalVisible, setPlanModalVisible] = React.useState(false)
  const [specializationModalVisible, setSpecializationModalVisible] = React.useState(false)
  const [subgroupsModalVisible, setSubgroupsModalVisible] = React.useState(false)

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupFilelds>({
    mode: 'onChange',
    defaultValues: {
      category: group.id,
      formOfEducation: 'Денна',
    },
  })

  const onSubmit: SubmitHandler<IGroupFilelds> = async (data) => {
    try {
      if (!data.educationPlan) {
        toast.error('Навчальний план не вибраний')
        return
      }
      const { students, ...rest } = data
      const groupData = {
        ...rest,
        id: group.id,
        educationPlan: Number(data.educationPlan),
      }

      if (params.id) {
        await dispatch(updateGroup(groupData))
        navigate('/groups')
      } else {
        await dispatch(createGroup(groupData))
        navigate('/groups')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteGroup = async () => {
    if (!group) return
    if (window.confirm(`Ви дійсно хочете видалити групу ${group.name}?`)) {
      await dispatch(deleteGroup(group.id))
      navigate('/groups')
    }
  }

  React.useEffect(() => {
    if (params.id) {
      dispatch(getGroup(params.id))
    }
    if (!groupCategories) {
      dispatch(getGroupCategories(false))
    }
    if (!plansCategories) {
      dispatch(getPlansCategories())
    }
  }, [])

  React.useEffect(() => {
    if (params.categoryId) {
      setValue('category', Number(params.categoryId))
    }
    return () => {
      dispatch(clearGroupData())
    }
  }, [params])

  React.useEffect(() => {
    if (params.id) {
      setValue('name', group.name)
      setValue('yearOfAdmission', group.yearOfAdmission)
      setValue('courseNumber', group.courseNumber)
      setValue('students', group.students.length)
      setValue('formOfEducation', group.formOfEducation)

      if (group.educationPlan) {
        setValue('educationPlan', group.educationPlan.id)
      }

      if (group.category) {
        setValue('category', group.category.id)
      }
    }
  }, [group])

  return (
    <>
      <SelectPlanModal
        control={control}
        getValues={getValues}
        open={planModalVisible}
        setOpen={setPlanModalVisible}
        plansCategories={plansCategories}
      />

      <SpecializationModal open={specializationModalVisible} setOpen={setSpecializationModalVisible} />

      <SubgroupsModal open={subgroupsModalVisible} setOpen={setSubgroupsModalVisible} />

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: '860px', margin: '0 auto', mb: 2 }}
      >
        <Grid item>
          <Typography variant="h5">{group.name ? `Група: ${group.name}` : 'Нова група'}</Typography>
        </Grid>
        <Grid item />
      </Grid>

      {/* Якщо створена група ще не завантажилась */}
      {params.id && !group.id && loadingStatus === LoadingStatusTypes.LOADING ? (
        <MainCard sx={{ mt: 2, p: 4, maxWidth: '860px', margin: '0 auto' }} content={false}>
          <LoadingSpinner />
        </MainCard>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainCard sx={{ mt: 2, p: 4, maxWidth: '860px', margin: '0 auto' }} content={false}>
            <Grid
              container
              spacing={3}
              sx={{ mb: 2, display: 'flex', alignItems: errors.name ? 'center' : 'flex-end' }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Вкажіть шифр групи' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Шифр групи*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          id="name"
                          {...field}
                          type="text"
                          name="name"
                          placeholder="PH-24-1"
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
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  // size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPlanModalVisible(true)}
                  sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px' }}
                >
                  Навчальний план
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: errors.yearOfAdmission ? 'center' : 'flex-end',
              }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="yearOfAdmission"
                  control={control}
                  rules={{ required: 'Вкажіть рік вступу' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="yearOfAdmission">Рік вступу*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          {...field}
                          type="number"
                          placeholder="2024"
                          id="yearOfAdmission"
                          name="yearOfAdmission"
                          error={Boolean(errors.yearOfAdmission)}
                        />
                        {errors.yearOfAdmission && (
                          <FormHelperText error id="helper-text-yearOfAdmission">
                            {errors.yearOfAdmission.message}
                          </FormHelperText>
                        )}
                      </Stack>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Link to="/streams">
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      textTransform: 'capitalize',
                      width: '100%',
                      p: '7.44px 15px',
                    }}
                  >
                    Потоки
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: errors.courseNumber ? 'center' : 'flex-end',
              }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="courseNumber"
                  control={control}
                  rules={{ required: 'Вкажіть номер курсу' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="courseNumber">Курс*</InputLabel>
                        <OutlinedInput
                          {...field}
                          fullWidth
                          type="number"
                          placeholder="1"
                          id="courseNumber"
                          name="courseNumber"
                          error={Boolean(errors.courseNumber)}
                        />
                        {errors.courseNumber && (
                          <FormHelperText error id="helper-text-courseNumber">
                            {errors.courseNumber.message}
                          </FormHelperText>
                        )}
                      </Stack>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  // size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => setSubgroupsModalVisible(true)}
                  sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px' }}
                >
                  Підгрупи
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{ mb: 2, display: 'flex', alignItems: errors.students ? 'center' : 'flex-end' }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="students"
                  control={control}
                  rules={{ required: 'Вкажіть кількість студентів в групі' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="students">Кількість студентів*</InputLabel>
                        <OutlinedInput
                          readOnly
                          disabled
                          fullWidth
                          {...field}
                          type="number"
                          id="students"
                          name="students"
                          placeholder="30"
                          error={Boolean(errors.students)}
                        />
                        {errors.students && (
                          <FormHelperText error id="helper-text-students">
                            {errors.students.message}
                          </FormHelperText>
                        )}
                      </Stack>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => setSpecializationModalVisible(true)}
                  sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px' }}
                >
                  Спеціалізовані підгрупи
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid item xs={12} md={6}>
                <Controller
                  name="formOfEducation"
                  control={control}
                  rules={{ required: 'Вкажіть форму навчання' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="formOfEducation">Форма навчання*</InputLabel>
                        <TextField
                          select
                          {...field}
                          fullWidth
                          id="formOfEducation"
                          sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                        >
                          {[
                            { value: 'Денна', label: 'Денна' },
                            { value: 'Заочна', label: 'Заочна' },
                          ].map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Вкажіть категорію' }}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1}>
                        <InputLabel htmlFor="category">Категорія*</InputLabel>
                        <TextField
                          select
                          fullWidth
                          {...field}
                          id="category"
                          sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                        >
                          {(groupCategories ? groupCategories : []).map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Stack>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </MainCard>

          <Grid
            container
            spacing={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '860px',
              m: '0 auto',
              '& .MuiGrid-root': { pl: '0 !important' },
            }}
          >
            <Grid item xs={5} md={5}>
              <Button
                color="error"
                variant="outlined"
                disabled={!group.id}
                onClick={onDeleteGroup}
                sx={{ textTransform: 'capitalize', width: '200px', p: '7.44px 15px' }}
              >
                Видалити
              </Button>
            </Grid>

            <Grid item xs={7} md={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => navigate('/groups')}
                sx={{ textTransform: 'capitalize', width: '200px', p: '7.44px 15px', mr: 3 }}
              >
                Відмінити
              </Button>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={loadingStatus === LoadingStatusTypes.LOADING}
                sx={{ textTransform: 'capitalize', width: '200px', p: '7.44px 15px' }}
              >
                Зберегти
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default FullGroupPage
