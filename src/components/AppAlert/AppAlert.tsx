import React from "react"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { useSelector } from "react-redux"
// import { Theme, ToastContainer, toast } from "react-toastify"

import { useAppDispatch } from "../../store/store"
import { clearAppAlert, selectAppStatus } from "../../store/appStatus/appStatusSlice"

const AppAlert: React.FC = () => {
  const dispatch = useAppDispatch()

  const { message, status } = useSelector(selectAppStatus)

  React.useEffect(() => {
    if (!message || !status) return

    toast[status](message)
    dispatch(clearAppAlert())
  }, [message, status, dispatch])

  return <Toaster expand richColors closeButton position="top-right" toastOptions={{ duration: 2000 }} />
}

export default AppAlert

// const AppAlert: React.FC = () => {
//   const dispatch = useAppDispatch()

//   const { message, status } = useSelector(selectAppStatus)

//   React.useEffect(() => {
//     if (!message || !status) return

//     toast[status](message, { autoClose: 1500 })
//     dispatch(clearAppAlert())
//   }, [message, status, dispatch])

//   return (
//     <ToastContainer
//       position="top-right"
//       autoClose={1500}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   )
// }

// export default AppAlert
