import React, { Component } from "react";

import img from "../../../images/typeIcons/icon-folder.svg";

import styles from "./Card.module.scss";
import Dropdown from "../../ui-elements/Dropdown/Dropdown";
import { EnhanceDropdown as enhancer } from "../../ui-elements/Dropdown/EnhanceDropdown";
import { Icon } from "../../ui-elements/Icon";
import { formatBytes } from "../../../services/internal/utils/formatBytes";

const EnhancedDropdown = enhancer(Dropdown);

export default interface Iprops {
  item?: boolean;
  checkbox?: boolean;
  dropdown?: boolean;
}

export const Card = ({ item, checkbox, dropdown }: any) => {
  return (
    <div className={styles.item}>
      <div className={styles.type}>
        {item["type"] && <Icon mimetype={item["type"]} />}
      </div>
      <div className={styles.info}>
       <span>{item["نام"]}</span>
       <span className={styles.date}>{item["تاریخ"]} ,{formatBytes(item["حجم"])}</span>
      </div>
      {checkbox && (
        <div className={styles.checkbox}>
          <input type="checkbox" />
        </div>
      )}
      {dropdown && (
        <div className={styles.dropdown}>
          <EnhancedDropdown
            data={["option one", "option two", "option three"]}
          />
        </div>
      )}
    </div>
  );
};
