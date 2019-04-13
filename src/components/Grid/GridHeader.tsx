import React from "react";
import { Hr } from "../ui-elements/Hr";

import styles from "./Grid.module.scss";

export const GridHeader: React.FunctionComponent<any> = props => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <div className={[styles.flex_row, styles.checkbox].join(" ")}>
          <input
            type="checkbox"
            onChange={() => props.onCheckAll()}
            defaultChecked={props.checkAll}
          />
          نام
        </div>
      </div>
      <Hr />
    </div>
  );
};
