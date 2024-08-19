import {
  List,
  Divider,
  Tooltip,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import { GroupCategoriesType } from '../../store/groups/groupsTypes'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { TeachersCategoryType, TeachersType } from '../../store/teachers/teachersTypes'
import { AuditoriesTypes, AuditoryCategoriesTypes } from '../../store/auditories/auditoriesTypes'
import { sortItemsByKey } from '../../utils/sortItemsByKey'

interface IAccordionItemsListProps {
  selectedItemId?: number | null
  onDeleteItem?: (id: number) => void
  onChangeVisible?: (id: number) => void
  onSelectItem?: Dispatch<SetStateAction<any>>
  getSelectedItemName?: Dispatch<SetStateAction<any>>
  onDeleteMainItem?: (id: number, itemsCount: number) => void
  setIsUpdateItemModalOpen?: Dispatch<SetStateAction<boolean>>
  setIsUpdateCategoryModalOpen?: Dispatch<SetStateAction<boolean>>
  onEditItem?: Dispatch<SetStateAction<TeachersType | AuditoriesTypes | null>>
  onEditMainItem?: Dispatch<SetStateAction<{ id: number; name: string } | null>>
  items: TeachersCategoryType[] | AuditoryCategoriesTypes[] | GroupCategoriesType[]
}

const AccordionItemsList: React.FC<IAccordionItemsListProps> = ({
  items,
  onEditItem,
  onDeleteItem,
  onSelectItem,
  selectedItemId,
  onEditMainItem,
  onChangeVisible,
  onDeleteMainItem,
  getSelectedItemName,
  setIsUpdateItemModalOpen,
  setIsUpdateCategoryModalOpen,
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
      {sortItemsByKey(items, 'name').map(
        (mainItem: TeachersCategoryType | AuditoryCategoriesTypes | GroupCategoriesType) => (
          <Accordion
            disableGutters
            key={mainItem.id}
            sx={{
              boxShadow: 0,
              border: '',
              '&:not(:first-of-type)': { borderTop: '1px solid #eaeaea' },
              '&.Mui-expanded': { background: 'white' },
              '&.Mui-expanded .MuiAccordionSummary-root': { background: '#fafafb' },
            }}
          >
            <AccordionSummary expandIcon={<DownOutlined />}>
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

            <AccordionDetails sx={{ p: 0, '.MuiList-root': { p: 0 } }}>
              <List>
                {/* @ts-ignore */}
                {mainItem[getItemsKeyName(items)]?.map((el) => (
                  <div key={el.id}>
                    <Divider />
                    <ListItem
                      disablePadding
                      selected={selectedItemId === el.id}
                      sx={{
                        '&:hover .MuiButtonBase-root': { display: 'block' },
                        '&:hover': { backgroundColor: '#f3f3f3' },
                        '& div:hover': { backgroundColor: '#f3f3f3' },
                        '&.MuiListItem-root.Mui-selected': { backgroundColor: '#ECF4FF ' },
                        '&.MuiListItem-root.Mui-selected .MuiButtonBase-root:hover': {
                          backgroundColor: '#ECF4FF',
                        },
                        '&.MuiListItem-root.Mui-selected .MuiListItemText-root:hover': {
                          backgroundColor: '#ECF4FF',
                        },
                      }}
                    >
                      <ListItemButton disableRipple sx={{ cursor: 'default' }}>
                        <ListItemText primary={el.name ? el.name : getLastnameAndInitials(el)} />
                      </ListItemButton>

                      {setIsUpdateItemModalOpen && onEditItem && (
                        <Tooltip title="Редагувати">
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
                        </Tooltip>
                      )}

                      {onDeleteItem && (
                        <Tooltip title={'Видалити'}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeleteItem(el.id)
                            }}
                            sx={{ mr: '5px', display: 'none' }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </Tooltip>
                      )}

                      {/* select group (streams page/distribution page) */}
                      {onSelectItem && (
                        <Tooltip title={''}>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectItem(el.id)
                              getSelectedItemName && getSelectedItemName(el?.name)
                            }}
                            sx={{ mr: '5px', display: 'none' }}
                          >
                            <PlusOutlined />
                          </IconButton>
                        </Tooltip>
                      )}

                      {onChangeVisible && (
                        <Tooltip title={el.isHide ? 'Показати викладача' : 'Приховати викладача'}>
                          <IconButton onClick={() => onChangeVisible(el.id)} sx={{ mr: '5px', display: 'none' }}>
                            {el.isHide ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </Tooltip>
                      )}
                    </ListItem>
                  </div>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )
      )}
    </>
  )
}

export { AccordionItemsList }
