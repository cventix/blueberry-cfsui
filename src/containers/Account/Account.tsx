import * as React from 'react'
import { SwitchBar } from '../../components/SwitchBar/SwitchBar'
import { ProfileEdit } from '../../components/Profile/ProfileEdit'
import { Security } from '../../components/Security/Security'

export interface Iprops {}
export interface Istate {
  selected: string
}
export class Account extends React.Component<Iprops, Istate> {
  state = {
    selected: 'پروفایل'
  }

  switchView = (selected: string) => {
    this.setState({ selected })
  }

  render() {
    const options = ['پروفایل', 'پلن ها', 'امنیت']
    let view
    switch (this.state.selected) {
      case 'پروفایل':
        view = <ProfileEdit />
        break
      case 'پلن ها':
        view = 'hi'
        break
      case 'امنیت':
        view = <Security />
        break
    }
    return (
      <div>
          <h1 className={'pg-text-lg pg-text-gray-700'}>  اکانت شخصی</h1>
        
        <SwitchBar options={options} onSwitch={this.switchView} selected={this.state.selected} />
        {view}
      </div>
    )
  }
}
