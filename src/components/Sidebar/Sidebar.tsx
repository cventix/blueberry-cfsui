import * as React from 'react'
import { Route, Switch } from 'react-router-dom';
import { t } from 'ttag'

// internal components & styles
import FM  from './components/FM'
import { VM } from './components/VM'
import './Sidebar.scss'
import  {PreviewSideBar}  from './components/PreviewSideBar';
import PreviewSideBarImage from './components/PreviewSideBarImage';


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
    <aside className={open ? "sidebar open" : "sidebar"}>
      <div className="overlay" onClick={e => {e.preventDefault(); onClickOverlay()}}></div>
      <div className="menuWrapper">
        <Switch>
          <Route
            path={`/fm`}
           render={() => <FM onItemClick={onItemClick}  />}
          />
            <Route
            exact path={`/fm/preview/image/:size/:name`}
            render={() => <PreviewSideBarImage onItemClick={onItemClick}  />}
          />
           <Route
            exact path={`/fm/preview/:fileType/:name`}
            render={() => <PreviewSideBar onItemClick={onItemClick}  />}
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
