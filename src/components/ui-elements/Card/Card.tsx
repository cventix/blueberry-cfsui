import React, { Component } from "react";

import img from "../../../images/typeIcons/icon-folder.svg";

import styles from "./Card.module.scss";
import Dropdown from "../Dropdown/Dropdown";

export default interface Iprops {
  item?: boolean;
  checkbox?: boolean;
  dropdown?: boolean;
}

export const Card = ({ item, checkbox, dropdown }: any) => {
  return (
    <div className={styles.item}>
      <div className={styles.type}>
        {item["type"] === "folder" && <img src={img} />}
      </div>
      {item["نام"]}

      {checkbox && (
        <div className={styles.checkbox}>
          <input type="checkbox" />
        </div>
      )}
      {dropdown && (
        <div className={styles.dropdown}>
          <Dropdown isOpen={true} />
        </div>
      )}
    </div>
  );
};
