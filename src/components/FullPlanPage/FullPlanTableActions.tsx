import React from "react"
import debounse from "lodash/debounce"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Box, Typography, Button, TextField, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { useAppDispatch } from "../../store/store"
import { getPlanSubjects } from "../../store/plans/plansAsyncActions"
import { useParams } from "react-router-dom"

interface IFullPlanTableActionsProps {
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setSubjectsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSubjectsModalType: React.Dispatch<React.SetStateAction<"create" | "update">>
}

const FullPlanTableActions: React.FC<IFullPlanTableActionsProps> = (props) => {
  const { searchValue, setSearchValue, setSubjectsModalVisible, setSubjectsModalType } = props

  const dispatch = useAppDispatch()

  const params = useParams()

  const [showedSemesters, setShowedSemesters] = React.useState(() => [1, 2, 3, 4, 5, 6])

  const debouncedGetResponce = React.useCallback(
    debounse((payload) => dispatch(getPlanSubjects(payload)), 1000),
    []
  )

  const fetchLessonsBySemesters = () => {
    let semesters = ""
    showedSemesters.forEach((el) => {
      if (!semesters.length) semesters = semesters.concat(String(el))
      else semesters = semesters.concat(`,${el}`)
    })
    const payload = { id: Number(params.id), semesters }
    // dispatch(getPlanSubjects(payload))
    debouncedGetResponce(payload)
  }

  const handleShowedSemesters = (_: React.MouseEvent<HTMLElement>, newSemesters: number[]) => {
    setShowedSemesters(newSemesters)
  }

  React.useEffect(() => {
    fetchLessonsBySemesters()
  }, [showedSemesters])

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <TextField
            size="small"
            value={searchValue}
            placeholder="Знайти..."
            sx={{ width: "200px" }}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{ endAdornment: <SearchOutlined style={{ opacity: 0.5 }} /> }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Typography sx={{ mr: 2 }}>Семестри:</Typography>

          <ToggleButtonGroup value={showedSemesters} onChange={handleShowedSemesters} aria-label="text formatting">
            {[1, 2, 3, 4, 5, 6].map((el) => (
              <ToggleButton key={el} value={el} sx={{ py: 0.55 }}>
                {el}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Button
            sx={{ ml: 4, whiteSpace: "nowrap", padding: "6px 12px !important" }}
            variant="contained"
            onClick={() => {
              setSubjectsModalType("create")
              setSubjectsModalVisible(true)
            }}
          >
            <PlusOutlined style={{ marginRight: "4px" }} />
            Додати дисципліну
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FullPlanTableActions
