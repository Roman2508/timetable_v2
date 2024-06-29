import React from "react"
import { useSelector } from "react-redux"
import { ColumnWidthOutlined, FilterOutlined } from "@ant-design/icons"
import { Grid, Typography, Tooltip, IconButton, Divider } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { menuSelector } from "../../store/menu/menuSlice"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { LoadPageTable } from "../../components/LoadPage/LoadPageTable"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"

const LoadPage = () => {
  const dispatch = useAppDispatch()

  const { drawerOpen } = useSelector(menuSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)

  const { groupCategories } = useSelector(groupsSelector)

  React.useEffect(() => {
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <>
      <Grid container sx={{ mb: 2, pt: 0 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Навантаження
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Знайти групу">
                <IconButton onClick={() => setIsOpenFilterModal(true)}>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Додати підсумок">
                <IconButton onClick={() => setIsOpenSummaryModal(true)}>
                  <ColumnWidthOutlined />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Typography variant="h5">{`Група: PH-23-1. Cеместр 2`}</Typography>
            </Grid>
          </Grid>

          <Grid item sx={{ overflow: "hidden" }}>
            <LoadPageTable />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default LoadPage
