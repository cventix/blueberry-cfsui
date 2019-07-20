import React from 'react'

import { connect } from 'react-redux'
import { t } from 'ttag'


class Invoice extends React.Component<any, any> {
  state = {

  }


  componentDidMount() {
      
  }

  render() {
   
    return(
        <div>
            <div className={'pg-flex pg-justify-around'}>

            </div>
        </div>
    )
  }
}

const mapStateToProps = (state: any) => ({ })

const mapDispatchToProps = (dispatch: any) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice)
