import React from "react";
import { Hr } from "../ui-elements/Hr";

import styles from "./Grid.module.scss";
import { Checkbox } from "../ui-elements/Checkbox/Checkbox";

export default interface Iprops {
  onCheckAll?: () => void;
  checkAll?: boolean;
  sortable?: boolean;
  onSort?: (sortBy: string, type?: string) => void;
}

export const GridHeader: React.FunctionComponent<Iprops> = ({
  onCheckAll,
  checkAll,
  sortable,
  onSort
}) => {
  return (
    <div
      className={styles.header}
      {...onSort && { onClick: () => onSort("نام") }}
    >
      <div className={styles.title + " rowItem"}>
      <Checkbox onChange={onCheckAll}/>
        <span>نام</span>
        {sortable && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
      <Hr />
    </div>
  );
};
