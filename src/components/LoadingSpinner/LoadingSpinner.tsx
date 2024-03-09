import { CircularProgress } from "@mui/material"

const LoadingSpinner = () => {
  return (
    <div style={{ padding: "15px", display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  )
}

export default LoadingSpinner
