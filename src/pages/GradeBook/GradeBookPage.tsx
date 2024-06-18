import React from "react"
import {
  Grid,
  Table,
  Checkbox,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Tooltip,
  IconButton,
} from "@mui/material"
import { useSelector } from "react-redux"

import { FilterOutlined } from "@ant-design/icons"
import { useAppDispatch } from "../../store/store"
import HIcon from "../../assets/images/icons/letter-h.svg"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import GradeBookFilter from "../../components/GradeBookPage/GradeBookFilter"
import GradeBookTable from "../../components/GradeBookPage/GradeBookTable"

const cellStyles = { border: "1px solid rgb(235, 235, 235)" }

const students = [
  {
    _id: "664dfc7aa21dd243763ac23a",
    name: "Rosalyn Strong",
  },
  {
    _id: "664dfc7aadc506bdadca3dd4",
    name: "Delacruz Chen",
  },
  {
    _id: "664dfc7ad533114aeb28c100",
    name: "Harding Lawson",
  },
  {
    _id: "664dfc7a03dc3c1b2664865e",
    name: "Stark Collier",
  },
  {
    _id: "664dfc7a9f8a6594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    _id: "664dfc7a11c1584e358b540d",
    name: "Clara Ashley",
  },
  {
    _id: "664dfc7aa2132d12d243763ac23a",
    name: "Rosalyn Strong",
  },
  {
    _id: "664dfc7aadc532256bdadca3dd4",
    name: "Delacruz Chen",
  },
  {
    _id: "664dfc7ad53123114aeb28c100",
    name: "Harding Lawson",
  },
  {
    _id: "664dfc7a03dc312c1b2664865e",
    name: "Stark Collier",
  },
  {
    _id: "664dfc7a9f8a126594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    _id: "664dfc7a11c151284e358b540d",
    name: "Clara Ashley",
  },
  {
    _id: "664dfc7afa6f076a35a75218",
    name: "Pena Medina",
  },
  {
    _id: "664dfc7ada95bf55afd8ccf2",
    name: "Potts Rush",
  },
  {
    _id: "664dfc7ac3c890f6d53be34d",
    name: "Chan Hunter",
  },
  {
    _id: "664dfc7a3a2f6e15ea0b3819",
    name: "Wooten Park",
  },
  {
    _id: "664dfc7a3c647a2ed26a35f9",
    name: "Rosie Mckenzie",
  },
  {
    _id: "664dfc7a2265ac4e413a6c94",
    name: "Mcknight Tran",
  },
]

const GradeBookPage = () => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)

  React.useEffect(() => {
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <>
      <Grid container sx={{ justifyContent: "center", mb: 2, pt: 0, ".MuiGrid-root>.MuiGrid-item": { pt: 0 } }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Електронний журнал
              </Typography>

              <Tooltip title="Знайти групу">
                <IconButton>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid sx={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
              <GradeBookFilter groupCategories={groupCategories} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <GradeBookTable students={students} />
    </>
  )
}

export default GradeBookPage
