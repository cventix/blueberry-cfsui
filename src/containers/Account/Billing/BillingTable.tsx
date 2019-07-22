import React, { Component } from 'react'

export class ParentComponent extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      data: [
        { id: 1, date: '2014-04-18', total: 121.0, status: 'Shipped', name: 'A', points: 5, percent: 50 },
        { id: 2, date: '2014-04-21', total: 121.0, status: 'Not Shipped', name: 'B', points: 10, percent: 60 },
        { id: 3, date: '2014-08-09', total: 121.0, status: 'Not Shipped', name: 'C', points: 15, percent: 70 },
        { id: 4, date: '2014-04-24', total: 121.0, status: 'Shipped', name: 'D', points: 20, percent: 80 },
        { id: 5, date: '2014-04-26', total: 121.0, status: 'Shipped', name: 'E', points: 25, percent: 90 }
      ],
      expandedRows: []
    }
  }

  handleRowClick(rowId: number) {
    const currentExpandedRows = this.state.expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId)

    const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter((id:any) => id !== rowId) : currentExpandedRows.concat(rowId)

    this.setState({ expandedRows: newExpandedRows })
  }

  renderItem(item: any) {
    const clickCallback = () => this.handleRowClick(item.id)
    const itemRows = [
      <tr onClick={clickCallback} key={'row-data-' + item.id}>
        <td>{item.date}</td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ]

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={'row-expanded-' + item.id}>
          <td>{item.name}</td>
          <td>{item.points}</td>
          <td>{item.percent}</td>
        </tr>
      )
    }

    return itemRows
  }

  render() {
    let allItemRows: any = []

    this.state.data.forEach((item: any) => {
      const perItemRows = this.renderItem(item)
      allItemRows = allItemRows.concat(perItemRows)
    })

    return <table>{allItemRows}</table>
  }
}
