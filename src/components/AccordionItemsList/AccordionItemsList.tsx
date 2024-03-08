// material-ui
import {
  List,
  Divider,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { DownOutlined } from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'

// project import
import { Dispatch, SetStateAction } from 'react'

interface IItemType {
  id: number
  name: string
  teachers?: {
    id: number
    name: string
  }[]
  auditories?: {
    id: number
    name: string
  }[]
  plans?: {
    id: number
    name: string
  }[]
  groups?: {
    id: number
    name: string
  }[]
  items?: {
    id: number
    name: string
  }[]
}

interface IAccordionItemsListProps {
  setIsUpdateCategoryModalOpen?: Dispatch<SetStateAction<boolean>>
  setIsUpdateItemModalOpen?: Dispatch<SetStateAction<boolean>>
  items: IItemType[]
}

const AccordionItemsList: React.FC<IAccordionItemsListProps> = ({
  setIsUpdateCategoryModalOpen,
  setIsUpdateItemModalOpen,
  items,
}) => {
  const getItemsKeyName = (items: IItemType[]) => {
    if ('teachers' in items[0]) return 'teachers'
    else if ('auditories' in items[0]) return 'auditories'
    else if ('plans' in items[0]) return 'plans'
    else if ('groups' in items[0]) return 'groups'
    else return 'items'
  }

  return (
    <>
      {items.map((mainItem) => (
        <Accordion key={mainItem.id} sx={{ boxShadow: 0, border: '' }}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<DownOutlined />}>
            <Typography
              sx={{
                flexGrow: 1,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}
              variant="h6"
            >
              {mainItem.name}
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                mr: 4,
              }}
            >
              ({mainItem[getItemsKeyName(items)]?.length || 0})
            </Typography>

            {setIsUpdateCategoryModalOpen && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  setIsUpdateCategoryModalOpen(true)
                }}
                sx={{ mr: '5px' }}
              >
                <EditOutlined />
              </IconButton>
            )}

            <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '15px' }}>
              <DeleteOutlined />
            </IconButton>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <List>
              {mainItem[getItemsKeyName(items)]?.map((plan: { id: number; name: string }) => (
                <div>
                  <Divider />
                  <ListItem disablePadding key={plan.id} sx={{ '&:hover .MuiButtonBase-root': { display: 'block' } }}>
                    <ListItemButton>
                      <ListItemText primary={plan.name} />
                    </ListItemButton>

                    {setIsUpdateItemModalOpen && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsUpdateItemModalOpen(true)
                        }}
                        sx={{ mr: '5px', display: 'none' }}
                      >
                        <EditOutlined />
                      </IconButton>
                    )}

                    <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '5px', display: 'none' }}>
                      <DeleteOutlined />
                    </IconButton>
                  </ListItem>
                </div>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

export { AccordionItemsList }
