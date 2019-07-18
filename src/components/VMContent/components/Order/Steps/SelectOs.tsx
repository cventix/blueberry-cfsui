import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { Icon } from '../../../../../components/ui-elements/Icon'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'
import Card from './Card/Card'

// services
import { selectOs, goToNextStep } from '../../../../../services/internal/store/actions'

// icons & styles
import windowsOs from '../../../../../images/vmIcons/osIcons/windows.png'
import ubuntuOs from '../../../../../images/vmIcons/osIcons/ubuntu.png'
import debianOs from '../../../../../images/vmIcons/osIcons/debian.svg'
import centOs from '../../../../../images/vmIcons/osIcons/centos.svg'
import styles from '../Order.module.scss'

export interface Iprops {
  osName?: string
  os?: string
  selectOs?: (e: string) => void
  currentStep: number
  goToNextStep?: (e: number) => void
}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`]

const SelectOs: React.FunctionComponent<Iprops> = ({ os, selectOs, goToNextStep, currentStep }) => {
  return (
    <React.Fragment>
      <ColorfulBox
        className={['green', 'lg']}
        withClose={true}
        message={t`با خرید پلن روزانه، سرور شما هر روز به صورت خودکار تمدید می شود. هر گاه از تمدید منصرف شدید، می توانید سرور را حذف نمایید.`}
      />
      <div className={styles.stepbarWrapper}>
        <Stepbar
          steps={steps}
          currentStep={currentStep}
          // onStepClick={(stepNum) => console.log(steps[stepNum])}
        />
      </div>
      <StepDescription
        stepNumber={1}
        title={[t`مرحله اول`, `:`, steps[0]].join(' ')}
        subTitle={t`سیستم عاملی که قصد دارید روی سرور مجازی شما نصب شود انتخاب کنید.`}
      />
      <div className={styles.cardWrapper}>
        <Card footerData={'Debian 8 (64bit)'} onClickCard={selectOs} selected={os === 'Debian 8 (64bit)'}>
          {GetImgByOsName('debian')}
        </Card>
        <Card footerData={'CentOS 6.9 (64bit)'} onClickCard={selectOs} selected={os === 'CentOS 6.9 (64bit)'}>
          {GetImgByOsName('centos')}
        </Card>
        <Card footerData={'Debian 8 (64bit)'} onClickCard={selectOs} selected={os === 'Debian 8 (64bit)'}>
          {GetImgByOsName('debian')}
        </Card>
        <Card footerData={'Windows Server 2012'} onClickCard={selectOs} selected={os === 'Windows Server 2012'}>
          {GetImgByOsName('windows')}
        </Card>
        <Card footerData={'CentOS 7.3 (64bit)'} onClickCard={selectOs} selected={os === 'CentOS 7.3 (64bit)'}>
          {GetImgByOsName('centos')}
        </Card>
        <Card footerData={'Ubuntu 14.04 (64bit)'} onClickCard={selectOs} selected={os === 'Ubuntu 14.04 (64bit)'}>
          {GetImgByOsName('ubuntu')}
        </Card>
      </div>
      <Footer firstStep={true} nextStep={`vms/order/serviceDuration`} handleNextStep={goToNextStep} />
    </React.Fragment>
  )
}

export const GetImgByOsName = (osName: string) => {
  switch (osName) {
    case 'debian':
      return <Icon src={debianOs} />
    case 'centos':
      return <Icon src={centOs} />
    case 'ubuntu':
      return <Icon src={ubuntuOs} />
    case 'windows':
      return <Icon src={windowsOs} />
    default:
      return <Icon src={debianOs} />
  }
}

const mapStateToProps = (state: any) => ({
  os: state.vm.os,
  currentStep: state.vm.currentStep
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectOs: (osId: string) => dispatch(selectOs(osId)),
    goToNextStep: (stepNumber: number) => dispatch(goToNextStep(stepNumber))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectOs)
