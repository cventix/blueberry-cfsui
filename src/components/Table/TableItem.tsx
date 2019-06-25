import React, { useState, useRef } from 'react'
import { Icon } from '../ui-elements/Icon'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

//style
import styles from './Table.module.scss'

//interface
import { ITableItem } from '../Content/ContentBody'
import { Button } from '../ui-elements/Button/Button'
import { t } from 'ttag'
import { connect } from 'react-redux'
import { TextInput } from '../ui-elements/Input/Input'
import { setEditStatus } from '../../services/internal/store/actions'

export interface Iprops {
  checkbox?: boolean
  label: string
  name?: string
  sortable?: boolean
  sortType?: string
  className?: string | string[]
  mimetype?: string
  itemName?: string
  uuid?: string
  item?: ITableItem
  checked?: any
  checkAll?: boolean
  id?: number
  hovered?: boolean
  openModal?: any
  shareButton?: boolean
  setEditStatus?: any
  isEditable?: number
  onCheckAll?: () => void
  onSort?: (label: string, sortType: string | undefined) => void
  onCheck?: (id: number, e?: any) => void
  handleNavigate?: (e: any) => void
  handleChange?: any
  renameText?: string
}

export const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

const TableItem: React.FunctionComponent<Iprops> = ({
  label,
  checkbox,
  name,
  sortable,
  isEditable,
  onSort,
  id,
  sortType,
  className,
  mimetype,
  handleNavigate,
  onCheckAll,
  checked,
  itemName,
  setEditStatus,
  item,
  hovered,
  onCheck,
  shareButton,
  renameText,
  openModal,
  handleChange,
  uuid
}) => {
  let imgSrc = item && `http://cdn.persiangig.com/preview/${uuid}/medium/${item.name}`
  const [hoveredButton, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hoveredButton)


  return (
    <td
      data-label={name}
      className={className ? splitter(className) : ' '}
      {...sortable && { onClick: () => onSort && onSort(label, sortType) }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={'rowItem'}>
        {checkbox && (
          <div className={hovered ? 'rowItem' : [styles.invisible, 'rowItem'].join(' ')}>
            <Checkbox onChange={() => (onCheckAll ? onCheckAll() : onCheck && id && onCheck(id))} checked={checked} />
          </div>
        )}
        <div
          className={'rowItem'}
          {...handleNavigate && { onClick: e => handleNavigate({ e: e, name: itemName, id: id, uuid: uuid, item: item && item.item }) }}
        >
          {mimetype && mimetype === 'image' ? <Icon src={imgSrc} className={'imageIcon icon'} /> : <Icon mimetype={mimetype} />}
          <div className={styles.name}>
            {name == 'name' && isEditable == id ? (
              <div >
                <TextInput placeholder={label} value={renameText} onChange={handleChange} />
              </div>
            ) : (
              label
            )}
          </div>
        </div>
        {sortable && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
        {shareButton && (
          <Button
            className={hoveredButton ? ['btnPrimaryOutline'] : ['btnDefaultOutline']}
            extraClassName={[styles.share, hovered ? '' : styles.invisible]}
            onClick={() => openModal(id, t`اشتراک گذاری`)}
          >
            share
          </Button>
        )}
      </div>
    </td>
  )
}

const mapStateToProps = (state: any) => ({ isEditable: state.sidebar.isEditable, renameText: state.sidebar.renameText })
const mapDispatchToProps = (dispatch: any) => {
  return {
    setEditStatus: (value: any) => dispatch(setEditStatus(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableItem)
