import React from "react"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { Stack, Button, MenuItem, TextField, InputLabel, ListSubheader } from "@mui/material"

interface IGradeBookFilterProps {
  groupCategories: GroupCategoriesType[] | null
}

const GradeBookFilter: React.FC<IGradeBookFilterProps> = ({ groupCategories }) => {
  return (
    <>
      <Stack spacing={1}>
        <InputLabel htmlFor="group">Рік*</InputLabel>
        <TextField
          select
          fullWidth
          id="group"
          defaultValue={2024}
          sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem", width: "80px" } }}
        >
          {[2019, 2020, 2021, 2022, 2023, 2024].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack spacing={1}>
        <InputLabel htmlFor="group">Семестр*</InputLabel>
        <TextField
          select
          fullWidth
          id="group"
          defaultValue={1}
          sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem", width: "80px" } }}
        >
          {[1, 2].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack spacing={1}>
        <InputLabel htmlFor="group">Група*</InputLabel>
        <TextField
          select
          fullWidth
          id="group"
          sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem", width: "80px" } }}
        >
          {(!groupCategories ? [] : groupCategories).map((category) => (
            <>
              <ListSubheader
                key={category.id}
                value={category.id}
                sx={{ fontWeight: 700, color: "rgba(38, 38, 38, .9)", lineHeight: "40px" }}
              >
                {category.name}
              </ListSubheader>

              {category.groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </>
          ))}
        </TextField>
      </Stack>

      <Stack spacing={1}>
        <InputLabel htmlFor="group">Дисципліна*</InputLabel>
        <TextField
          select
          fullWidth
          id="group"
          defaultValue={1}
          sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem", width: "200px" } }}
        >
          {[1, 2, 3, 4, 5, 6].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Button type="submit" color="primary" variant="outlined" sx={{ height: "40.91px" }}>
        Показати
      </Button>
    </>
  )
}

export default GradeBookFilter
