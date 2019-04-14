import React, { FunctionComponent } from "react";
import { Breadcrumb } from "../ui-elements/Breadcrumb/Breadcrumb";
import { Icon } from "../ui-elements/Icon";

import listView from "../../images/switchViewIcons/list-view.svg";
import gridView from "../../images/switchViewIcons/grid-view.svg";
import listViewActive from "../../images/switchViewIcons/list-view-active.svg";
import gridViewActive from "../../images/switchViewIcons/grid-view-active.svg";

import styles from "./Content.module.scss";
const history = [
  { title: "پوشه اصلی", link: "/" },
  { title: "پوشه فرعی", link: "/" },
  { title: "پوشه تست", link: "/", active: true }
];

export default interface Iprops {
  switchView: (e: string) => void;
  view: string;
}

export const Contentheader: React.FunctionComponent<Iprops> = ({
  switchView,
  view
}) => {
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <div className={styles.left}>
        <div onClick={() => switchView("grid")}>
          <Icon src={view === "table" ? listView : listViewActive} />
        </div>
        <div onClick={() => switchView("table")}>
          <Icon src={view === "grid" ? gridView : gridViewActive} />
        </div>
      </div>
    </div>
  );
};
