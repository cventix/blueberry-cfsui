import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { t } from 'ttag'

// internal components & styles
import PreviewSideBarImage from './components/PreviewSideBarImage';
import {PreviewSideBar}  from './components/PreviewSideBar';
import { VM } from './components/VM'
import FM  from './components/FM'

import './Sidebar.scss'

export default interface Iprops {
  createFolderModal?: () => void
  onClickOverlay: () => void
  handleCFClose?: any
  showModal?: boolean
  open: boolean
  onItemClick?: (e: any) => void
}

export const Sidebar: React.FunctionComponent<Iprops> = ({ createFolderModal, handleCFClose, showModal, onClickOverlay, open, onItemClick  }: Iprops) => {
  return (
    <aside className={open ? "pg-relative sidebar open" : "pg-relative sidebar"}>
      <div className="pg-fixed pg-inset-0 pg-hidden pg-z-40 pg-bg-black pg-cursor-pointer pg-opacity-50 overlay" onClick={e => {e.preventDefault(); onClickOverlay()}}></div>
      <div className="pg-w-sidebar pg-bg-white pg-opacity-99 pg-z-50 pg-fixed pg-top-72p pg-right-0 pg-left-auto pg-bottom-0 tablet-max:pg-top-80p tablet-max:pg--right-260 menuWrapper">
        <Switch>
          <Route
            path={`/fm`}
            render={() => <FM onItemClick={onItemClick}/>}
          />
            <Route
            exact path={`/fm/preview/image/:size/:name`}
            render={() => <PreviewSideBarImage onItemClick={onItemClick}/>}
          />
           <Route
            exact path={`/fm/preview/:fileType/:name`}
            render={() => <PreviewSideBar onItemClick={onItemClick}/>}
          />
          <Route
            exact
            path={`/vm`}
            component={VM}  
          />
        </Switch>
      </div>
    </aside>
  )
}
