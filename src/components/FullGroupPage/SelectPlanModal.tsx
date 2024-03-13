import {
  Chip,
  Radio,
  Dialog,
  Divider,
  RadioGroup,
  IconButton,
  DialogTitle,
  FormControl,
  DialogContent,
  FormControlLabel,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"

import { CloseOutlined } from "@ant-design/icons"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { PlansCategoriesType } from "../../store/plans/plansTypes"
import { IGroupFilelds } from "../../pages/FullGroup/FullGroupPage"
import { Control, Controller, UseFormGetValues } from "react-hook-form"

interface ISelectPlanModalProps {
  open: boolean
  control: Control<IGroupFilelds, any>
  getValues: UseFormGetValues<IGroupFilelds>
  setOpen: Dispatch<SetStateAction<boolean>>
  plansCategories: PlansCategoriesType[] | null
}

const SelectPlanModal: React.FC<ISelectPlanModalProps> = ({
  open,
  control,
  setOpen,
  getValues,
  plansCategories,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!plansCategories ? (
        <LoadingSpinner />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle id="alert-dialog-title">{"Навчальний план"}</DialogTitle>

            <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </div>
          <DialogContent sx={{ padding: "0 24px 20px" }}>
            <DialogContentText id="alert-dialog-description">
              {(plansCategories ? plansCategories : []).map((category) => (
                <div key={category.id}>
                  <br />
                  <Divider>
                    <Chip label={category.name} size="medium" />
                  </Divider>

                  <Controller
                    name="educationPlan"
                    control={control}
                    rules={{ required: "Вкажіть шифр групи" }}
                    render={({ field }) => {
                      return (
                        <FormControl>
                          <RadioGroup {...field} aria-labelledby="educationPlan-label">
                            {category.plans.map((plan) => (
                              <FormControlLabel
                                key={plan.id}
                                value={plan.id}
                                label={plan.name}
                                control={
                                  <Radio checked={Number(getValues("educationPlan")) === plan.id} />
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )
                    }}
                  />
                </div>
              ))}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleClose}
              sx={{
                textTransform: "capitalize",
                maxWidth: "200px",
                margin: "0 auto",
                p: "7.44px 15px",
                width: "100%",
              }}
            >
              Зберегти
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export { SelectPlanModal }
