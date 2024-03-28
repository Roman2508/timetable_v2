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
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'

// project import
import { Dispatch, SetStateAction } from 'react'
import { GroupCategoriesType } from '../../store/groups/groupsTypes'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { TeachersCategoryType, TeachersType } from '../../store/teachers/teachersTypes'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../../store/auditories/auditoriesTypes'

interface IAccordionItemsListProps {
  selectedItemId?: number | null
  onDeleteItem?: (id: number) => void
  onSelectItem?: Dispatch<SetStateAction<any>>
  onDeleteMainItem?: (id: number, itemsCount: number) => void
  setIsUpdateItemModalOpen?: Dispatch<SetStateAction<boolean>>
  setIsUpdateCategoryModalOpen?: Dispatch<SetStateAction<boolean>>
  onEditItem?: Dispatch<SetStateAction<TeachersType | AuditoriesTypes | null>>
  onEditMainItem?: Dispatch<SetStateAction<{ id: number; name: string } | null>>
  items: TeachersCategoryType[] | AuditoryCategoriesTypes[] | GroupCategoriesType[]
}

const AccordionItemsList: React.FC<IAccordionItemsListProps> = ({
  setIsUpdateCategoryModalOpen,
  setIsUpdateItemModalOpen,
  onDeleteMainItem,
  onEditMainItem,
  selectedItemId,
  onDeleteItem,
  onSelectItem,
  onEditItem,
  items,
}) => {
  const getItemsKeyName = (items: TeachersCategoryType[] | AuditoryCategoriesTypes[] | GroupCategoriesType[]) => {
    if ('teachers' in items[0]) return 'teachers'
    else if ('auditories' in items[0]) return 'auditories'
    else if ('plans' in items[0]) return 'plans'
    else if ('groups' in items[0]) return 'groups'
    else return 'items'
  }

  return (
    <>
      {items.map((mainItem) => (
        <Accordion key={mainItem.id} sx={{ boxShadow: 0, border: '' }} disableGutters>
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
                mr: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                color: 'text.secondary',
              }}
            >
              {/* @ts-ignore */}
              {mainItem[getItemsKeyName(items)]?.length || 0}
            </Typography>

            {setIsUpdateCategoryModalOpen && onEditMainItem && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  onEditMainItem({ id: mainItem.id, name: mainItem.name })
                  setIsUpdateCategoryModalOpen(true)
                }}
                sx={{ mr: '5px' }}
              >
                <EditOutlined />
              </IconButton>
            )}

            {onDeleteMainItem && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  // @ts-ignore
                  onDeleteMainItem(mainItem.id, mainItem[getItemsKeyName(items)].length)
                }}
                sx={{ mr: '15px' }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <List>
              {/* @ts-ignore */}
              {mainItem[getItemsKeyName(items)]?.map((el) => (
                <div>
                  <Divider />
                  <ListItem
                    key={el.id}
                    disablePadding
                    selected={selectedItemId === el.id}
                    sx={{ '&:hover .MuiButtonBase-root': { display: 'block' } }}
                  >
                    <ListItemButton>
                      <ListItemText primary={el.name ? el.name : getLastnameAndInitials(el)} />
                    </ListItemButton>

                    {setIsUpdateItemModalOpen && onEditItem && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditItem(el)
                          setIsUpdateItemModalOpen(true)
                        }}
                        sx={{ mr: '5px', display: 'none' }}
                      >
                        <EditOutlined />
                      </IconButton>
                    )}

                    {onDeleteItem && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteItem(el.id)
                        }}
                        sx={{ mr: '5px', display: 'none' }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}

                    {/* select group (streams page/distribution page) */}
                    {onSelectItem && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectItem(el.id)
                        }}
                        sx={{ mr: '5px', display: 'none' }}
                      >
                        <PlusOutlined />
                      </IconButton>
                    )}
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
