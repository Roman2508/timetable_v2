import React from 'react'
import { Tooltip, IconButton } from '@mui/material'
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../store/store'
import { deleteStudent } from '../../store/students/studentsAsyncActions'

interface IDeleteStudentsProps {
  deleteMode: boolean
  studentsIdsToDelete: number[]
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>
  setStudentsIdsToDelete: React.Dispatch<React.SetStateAction<number[]>>
}

const DeleteStudents: React.FC<IDeleteStudentsProps> = ({
  deleteMode,
  setDeleteMode,
  studentsIdsToDelete,
  setStudentsIdsToDelete,
}) => {
  const dispatch = useAppDispatch()

  const [isFetching, setIsFetching] = React.useState(false)

  const cancelDeleting = () => {
    setDeleteMode(false)
    setStudentsIdsToDelete([])
  }

  const onDelete = async () => {
    if (!window.confirm('Ви впевнені, що хочете видалити вибраних студентів?')) return
    if (!studentsIdsToDelete.length) return

    try {
      setIsFetching(true)

      Promise.all(
        studentsIdsToDelete.map(async (el) => {
          await dispatch(deleteStudent(el))
        })
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <>
      {deleteMode ? (
        <div>
          <Tooltip title="Видалити студентів">
            <IconButton onClick={onDelete} disabled={isFetching || !studentsIdsToDelete.length}>
              <CheckCircleOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Відмінити">
            <IconButton onClick={cancelDeleting} disabled={isFetching}>
              <CloseCircleOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Видалити студентів">
          <IconButton onClick={() => setDeleteMode(true)} disabled={isFetching}>
            <DeleteOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

export default DeleteStudents
