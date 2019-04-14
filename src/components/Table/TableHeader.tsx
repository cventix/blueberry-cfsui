<<<<<<< HEAD
import React, { Component } from 'react'
import { TableItem } from './TableItem'

export default interface Iprops {
  titles: any
  dropdown?: boolean
  onSort?: any
  onCheckAll?: any
  checkAll?: boolean
}

export const TableHeader: React.FunctionComponent<Iprops> = ({ titles, dropdown, onSort, onCheckAll }) => {
=======
import React, { Component } from "react";
import { TableItem } from "./TableItem";
import { IconLink } from "../ui-elements/IconLink";
import newFolderIcon from "../../images/sidebarIcons/newfolder.svg";

import styles from "./Table.module.scss";

export default interface Iprops {
  titles: any;
  dropdown?: boolean;
  onSort?: any;
  onCheckAll?: any;
  checkAll?: boolean;
  tabletView?: boolean;
}

export const TableHeader: React.SFC<Iprops> = ({
  titles,
  dropdown,
  onSort,
  onCheckAll,
  tabletView
}) => {
  const altIcon = "Icon";
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf
  return (
    <thead>
      {titles && (
        <tr>
          {Object.keys(titles).map((label, i) => {
            if (label !== 'type') {
              return (
                <TableItem
                  key={i}
                  label={label}
                  checkbox={label === 'نام' ? true : false}
                  onCheckAll={onCheckAll}
                  sortable={true}
                  sortType={label === 'تاریخ' ? 'alphabet' : ' '}
                  onSort={onSort}
                  className={label === 'نام' ? ['header', 'show'] : ['header']}
                />
              )
            }
          })}

          {dropdown && tabletView ? (
            <td className={styles.show}>
              <IconLink
                className={styles.icn}
                icon={newFolderIcon}
                iconAlt={`new-folder ${altIcon}`}
                label="پوشه جدید"
              />
            </td>
          ) : (
            <td />
          )}
        </tr>
      )}
    </thead>
  )
}
