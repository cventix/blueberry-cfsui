import React from "react";
import { Hr } from "../ui-elements/Hr";

import styles from "./Grid.module.scss";

export default interface Iprops {
  onCheckAll?: () => void;
  checkAll?: boolean;
  sortable?: boolean;
}

export const GridHeader: React.FunctionComponent<Iprops> = ({
  onCheckAll,
  checkAll,
  sortable
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.title+' rowItem'}>
        <input
          type="checkbox"
          {...onCheckAll && { onChange: () => onCheckAll() }}
          defaultChecked={checkAll}
        />
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
