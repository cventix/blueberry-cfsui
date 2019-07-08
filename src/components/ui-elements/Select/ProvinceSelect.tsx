import * as React from 'react'
import json from '../../../services/internal/utils/iranProvinces.json'

export class ProvinceSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
      <div>
        jobs
        <select>
          {json.map((option: any, i: number) => {
            return <option>{option}</option>
          })}
        </select>
        companies
        <select value={this.state.selectedCompany} onChange={this.props.onChange}>
          {this.state.companies.map((company: any, i: number) => {
            return <option>{name}</option>
          })}
        </select>
      </div>
    )
  }
}
