import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

// internal components & styles
import FM from './components/FM'
import { VM } from './components/VM'
import './Sidebar.scss'
import PreviewSideBar from './components/PreviewSideBar'
import PreviewSideBarImage from './components/PreviewSideBarImage'
import TrashSideBar from './components/TrashSideBar'
import AccountSideBar from './components/AccountSideBar';

export default interface Iprops {
  onClickOverlay: () => void
  open: boolean
  onItemClick?: (e: any, file?: any) => void
}

export const Sidebar: React.FunctionComponent<Iprops> = ({ onClickOverlay, open, onItemClick }: Iprops) => {
  return (
    <aside className={open ? 'pg-relative sidebar open' : 'pg-relative sidebar'}>
      <div
        className="pg-fixed pg-inset-0 pg-hidden pg-z-40 pg-bg-black pg-cursor-pointer pg-opacity-50 overlay"
        onClick={e => {
          e.preventDefault()
          onClickOverlay()
        }}
      />
      <div className="pg-w-sidebar pg-bg-white pg-opacity-99 pg-z-50 pg-fixed pg-top-72p pg-right-0 pg-left-auto pg-bottom-0 tablet-max:pg-top-80p tablet-max:pg--right-260 menuWrapper">
        <Switch>
          <Route path={`/fm/preview/image`} render={() => <PreviewSideBarImage onItemClick={onItemClick} />} />
          <Route path={`/fm/preview`} render={() => <PreviewSideBar onItemClick={onItemClick} />} />
          <Route path={`/fm/trash`} render={() => <TrashSideBar onItemClick={onItemClick} />} />
          <Route path={`/fm`} render={() => <FM onItemClick={onItemClick} />} />
          <Route exact path={`/vm`} component={VM} />
          <Route exact path={`/account`} component={AccountSideBar} />
        </Switch>
      </div>
    </aside>
  )
}
