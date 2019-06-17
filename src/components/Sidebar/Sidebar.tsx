import * as React from 'react'
import { Route, Switch } from 'react-router-dom'


// internal components & styles
import FM from './components/FM'
import { VM } from './components/VM'
import './Sidebar.scss'
import PreviewSideBar from './components/PreviewSideBar'
import PreviewSideBarImage from './components/PreviewSideBarImage'
import TrashSideBar from './components/TrashSideBar'

export default interface Iprops {
  onClickOverlay: () => void
  open: boolean
  onItemClick?: (e: any, file?: any) => void
}

export const Sidebar: React.FunctionComponent<Iprops> = ({ onClickOverlay, open, onItemClick }: Iprops) => {
  return (
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div
        className="overlay"
        onClick={e => {
          e.preventDefault()
          onClickOverlay()
        }}
      />
      <div className="menuWrapper">
        <Switch>
          <Route path={`/fm/preview/image`} render={() => <PreviewSideBarImage onItemClick={onItemClick} />} />
          <Route path={`/fm/preview`} render={() => <PreviewSideBar onItemClick={onItemClick} />} />
          <Route path={`/fm/trash`} render={() => <TrashSideBar onItemClick={onItemClick} />} />
          <Route path={`/fm`} render={() => <FM onItemClick={onItemClick} />} />
          <Route exact path={`/vm`} component={VM} />
        </Switch>
      </div>
    </aside>
  )
}
