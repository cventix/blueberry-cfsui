import React from 'react'
import { Table } from '../Table/Table'
import { Grid } from '../Grid/Grid'
import { GridHeader } from '../Grid/GridHeader'
import { Contentheader } from './Contentheader'
import { Breadcrumb } from '../ui-elements/Breadcrumb/Breadcrumb'
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import arrowLeft from '../../images/arrow-left.svg'
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'

import styles from './Content.module.scss'

const history = [{ title: 'پوشه اصلی', link: '/' }, { title: 'پوشه فرعی', link: '/' }, { title: 'پوشه تست', link: '/', active: true }]

const table = [
  {
    نام: 'رزومه ها',
    مالک: 10,
    تاریخ: 'sth',
    حجم: 444,
    '-': '-',
    type: 'folder',
  },
  {
    نام: 'عکس های شخصی',
    مالک: 323,
    تاریخ: 'fdf',
    حجم: 444231,
    '-': '-',
    type: 'folder',
  },
  {
    نام: 'موسیقی',
    مالک: 10,
    تاریخ: 'sth',
    حجم: 42323,
    '-': '-',
    type: 'music',
  },
  {
    نام: 'رزومه ها',
    مالک: 10,
    تاریخ: 'sth',
    حجم: 444,
    '-': '-',
    type: 'folder',
  },
  {
    نام: 'عکس های شخصی',
    مالک: 323,
    تاریخ: 'fdf',
    حجم: 444231,
    '-': '-',
    type: 'folder',
  },
  {
    نام: 'موسیقی',
    مالک: 10,
    تاریخ: 'sth',
    حجم: 42323,
    '-': '-',
    type: 'music',
  },
]
const sort = (data: any) => {
  var sortOrder = ['folder', 'image', 'music']
  data.sort(function(a: any, b: any) {
    return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type)
  })
  return data
}
export class Content extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      table: sort(table),
      checkAll: false,
      view: 'grid',
      width: 0,
      height: 0,
      optionSelected: 0,
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onSort = (sortBy: string, type?: string) => {
    let table = this.state.table
    switch (type) {
      case 'alphabet':
        table &&
          table.sort((a: any, b: any) => {
            if (a[sortBy] < b[sortBy]) {
              return -1
            }
            if (a[sortBy] > b[sortBy]) {
              return 1
            }
            return 0
          })
        break
      default:
        table &&
          table.sort((a: any, b: any) => {
            if (this.state[sortBy] !== 'ascending') {
              this.setState({ [sortBy]: 'ascending' })
              return a[sortBy] - b[sortBy]
            } else {
              this.setState({ [sortBy]: 'decending' })
              return b[sortBy] - a[sortBy]
            }
          })
    }

    this.setState({ table })
  }

  onCheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll })
  }

  switchView = (view: string) => {
    this.setState({ view })
  }
  onSelect = (optionSelected: number) => {
    this.setState({ optionSelected })
  }
  public render() {
    console.log(this.state.width)
    if (this.state.width < 768) {
      return (
        <React.Fragment>
          <Breadcrumb history={history} />
          <Table
            dropdown={true}
            tabletView={true}
            onCheckAll={this.onCheckAll}
            checkAll={this.state.checkAll}
            onSort={this.onSort}
            table={this.state.table}
          />
        </React.Fragment>
      )
    } else
      return (
        <div>
          <Contentheader view={this.state.view} switchView={this.switchView} />
          {this.state.view === 'table' ? (
            <div>
              <GridHeader onCheckAll={this.onCheckAll} checkAll={this.state.checkAll} sortable={true} onSort={this.onSort} />
              <Grid checkbox={true} onCheckAll={this.onCheckAll} checkAll={this.state.checkAll} table={this.state.table} />
            </div>
          ) : (
            <React.Fragment>
              <Table
                dropdown={true}
                optionSelected={this.state.optionSelected}
                onSelect={this.onSelect}
                onCheckAll={this.onCheckAll}
                checkAll={this.state.checkAll}
                onSort={this.onSort}
                table={this.state.table}
              />
              <div className={styles.footer}>
                <Button className={['btnDefault0', 'btnLg']}>
                  <IconLink icon={arrowBottom} className={styles.arrow} iconAlt={`new-folder`} label="پوشه جدید" />
                </Button>
              </div>
            </React.Fragment>
          )}
        </div>
      )
  }
}
