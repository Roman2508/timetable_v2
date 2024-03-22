import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { GroupCategoriesType, GroupLoadType, GroupsInitialState, GroupsType } from './groupsTypes'
import {
  attachSpecialization,
  createGroup,
  createGroupCategory,
  createSpecialization,
  createSubgroups,
  deleteGroup,
  deleteGroupCategory,
  deleteSpecialization,
  getGroup,
  getGroupCategories,
  updateGroup,
  updateGroupCategory,
  updateSpecialization,
} from './groupsAsyncActions'
import { AttachSpecializationPayloadType, CreateSubgroupsPayloadType } from '../../api/apiTypes'

const groupsInitialState: GroupsInitialState = {
  groupCategories: null,
  group: {
    id: 0,
    name: '',
    courseNumber: 1,
    yearOfAdmission: Number(new Date().getFullYear().toString()),
    students: 1,
    formOfEducation: 'Денна',
    specializationList: [],
    educationPlan: null,
    groupLoad: null,
    category: null,
    stream: [],
  },
  loadingStatus: LoadingStatusTypes.NEVER,
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState: groupsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    clearGroupData(state) {
      state.group = groupsInitialState.group
    },
  },
  extraReducers: (builder) => {
    /* getGroupCategories */
    builder.addCase(getGroupCategories.fulfilled, (state, action: PayloadAction<GroupCategoriesType[]>) => {
      state.groupCategories = action.payload
    })

    /* createGroupCategory */
    builder.addCase(createGroupCategory.fulfilled, (state, action: PayloadAction<GroupCategoriesType>) => {
      state.groupCategories?.push(action.payload)
    })

    /* updateGroupCategory */
    builder.addCase(updateGroupCategory.fulfilled, (state, action: PayloadAction<GroupCategoriesType>) => {
      if (!state.groupCategories) return

      const newCategories = state.groupCategories.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }

        return el
      })

      state.groupCategories = newCategories
    })

    /* deleteGroupCategory */
    builder.addCase(deleteGroupCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const newCategories = state.groupCategories.filter((el) => el.id !== action.payload)

      state.groupCategories = newCategories
    })

    /* --- groups --- */

    /* getGroup */
    builder.addCase(getGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      state.group = action.payload
    })

    /* createGroup */
    builder.addCase(createGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category?.id) {
          return { ...el, groups: [...el.groups, action.payload] }
        }

        return el
      })

      state.groupCategories = newGroups
    })

    /* updateGroup */
    builder.addCase(updateGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category?.id) {
          const newGroups = el.groups.map((group) => {
            if (group.id === action.payload.id) {
              return action.payload
            }

            return group
          })

          return { ...el, groups: newGroups }
        }

        return el
      })
      state.group = action.payload
      state.groupCategories = newGroups
    })

    /* deleteGroup */
    builder.addCase(deleteGroup.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const updatedCategories = state.groupCategories.map((el) => {
        const newGroups = el.groups.filter((group) => group.id !== action.payload)

        return { ...el, groups: newGroups }
      })

      state.groupCategories = updatedCategories
    })

    /* specialization */

    /* attachSpecialization */
    builder.addCase(attachSpecialization.fulfilled, (state, action: PayloadAction<AttachSpecializationPayloadType>) => {
      if (!state.group || !state.group.groupLoad) return

      const { groupId, planSubjectId, name } = action.payload

      const groupLoad = state.group.groupLoad.map((el) => {
        if (el.group.id === groupId && el.planSubjectId.id === planSubjectId) {
          return { ...el, specialization: name }
        }
        return el
      })

      state.group.groupLoad = groupLoad
    })

    /* createSpecialization */
    builder.addCase(createSpecialization.fulfilled, (state, action: PayloadAction<string[]>) => {
      if (!state.group) return
      state.group.specializationList = action.payload
    })

    /* updateSpecialization */
    builder.addCase(updateSpecialization.fulfilled, (state, action: PayloadAction<string[]>) => {
      if (!state.group) return
      state.group.specializationList = action.payload
    })

    /* deleteSpecialization */
    builder.addCase(deleteSpecialization.fulfilled, (state, action: PayloadAction<string[]>) => {
      if (!state.group) return
      state.group.specializationList = action.payload
    })

    /* createSubgroups */
    builder.addCase(createSubgroups.fulfilled, (state, action: PayloadAction<CreateSubgroupsPayloadType[]>) => {
      if (!state.group || !state.group.groupLoad) return

      let newLessons = action.payload

      const groupLoad = state.group.groupLoad.map((el) => {
        const lesson = action.payload.find((l) => l.planSubjectId === el.planSubjectId.id)

        if (lesson) {
          newLessons = newLessons.filter((l) => l.id === lesson.id)
          return lesson
        }

        return el
      })

      state.group.groupLoad = [...groupLoad, ...newLessons]
    })
  },
})

export const groupsSelector = (state: RootState) => state.groups

export const { setLoadingStatus, clearGroupData } = groupsSlice.actions

export default groupsSlice.reducer
