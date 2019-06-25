import React from 'react'
import Fullscreen from 'react-full-screen'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'

// ui-elements
import { PlayerRangeBar } from '../ui-elements/RangeBar/PlayerRangeBar/PlayerRangeBar'
import { IconLink } from '../ui-elements/IconLink'
import { Icon } from '../ui-elements/Icon'

//styles and icons
import fullscreen from '../../images/controlcons/icon-fullscreen.svg'
import volume from '../../images/controlcons/icon-volume.svg'
import pause from '../../images/controlcons/icon-pause.svg'
import play from '../../images/controlcons/icon-play.svg'
import styles from './MediaPlayer.module.scss'

//services
import { formatProgressTime } from '../../services/internal/utils/formatProgressTime'
import { setFullScreen } from '../../services/internal/store/actions/selections'
import { formatBytes } from '../../services/internal/utils/formatBytes'

export interface Iprops {
  setFullScreen: (e: boolean) => void
  type?: string
  item: any
  url: string
}
export interface Istate {
  playing?: boolean
  volume: number
  isFull: boolean
  played: number
  seeking?: boolean
  duration?: number
}

class MediaPlayer extends React.Component<Iprops, Istate> {
  player: any
  constructor(props: any) {
    super(props)
    this.state = {
      playing: false,
      volume: 0.1,
      isFull: false,
      played: 0
    }
  }

  //seek player
  onSeekMouseDown = (e: any) => {
    this.setState({ seeking: true })
  }

  onSeekChange = (e: any) => {
    // console.log(e.target.value)
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = (e: any) => {
    // console.log(e.target.value)
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  setVolume = (e: any) => {
    console.log(e.target.value)
    this.setState({ volume: parseFloat(e.target.value) })
  }

  togglePlay = () => {
    this.setState({ playing: !this.state.playing })
  }

  onProgress = (state: any) => {
    // console.log('onProgress', state)
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onDuration = (duration: number) => {
    // console.log('onDuration', duration)
    this.setState({ duration })
  }

  ref = (player: any) => {
    this.player = player
  }

  goFull = () => {
    this.props.setFullScreen(true)
    this.setState({ isFull: true })
  }

  render() {
    return (
      <div className={this.props.type !== 'audio' ? styles.videoPlayer : [styles.videoPlayer, styles.audioPlayer].join(' ')}>
        {this.props.type == 'audio' && (
          <div className={[styles.row, styles.details].join(' ')}>
            <Icon mimetype={'audio'} style={{ width: '93px' }} />
            <div className='pg-mt-0 pg-mb-0 pg-mr-5 pg-ml-5'>
              <div>{this.props.item.name}</div>
              <div className={[styles.row, styles.description].join(' ')}>
                <div className='pg-mt-0 pg-mb-0 pg-mr-2p pg-ml-2p'> {this.state.duration && formatProgressTime(this.state.duration)} / </div>
                <div> حجم فایل: {formatBytes({ bytes: this.props.item.size, lang: 'fa' })}</div>
              </div>
            </div>
          </div>
        )}
        <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
          <ReactPlayer
            ref={this.ref}
            url={this.props.url}
            playing={this.state.playing}
            height={'100%'}
            width={'100%'}
            {...this.state.isFull && { width: '100%' }}
            volume={this.state.volume}
            onProgress={this.onProgress}
            onSeek={e => console.log('onSeek', e)}
            onDuration={this.onDuration}
          />
        </Fullscreen>
        <div className={`pg-p-8p pg-bg-white pg-rounded-sm pg-flex pg-items-center pg-justify-around ${styles.controlBar}`}>
          {this.props.type !== 'audio' && (
            <div onClick={this.goFull}>
              <IconLink icon={fullscreen} />
            </div>
          )}
          <div className={styles.row}>
            <PlayerRangeBar max={1} width={62} height={4} color={'gray'} value={this.state.volume} step={0.05} updateRange={this.setVolume} />
            <Icon src={volume} />
          </div>
          {this.state.duration && formatProgressTime(this.state.duration)}

          <PlayerRangeBar
            max={1}
            height={6}
            color={'blue'}
            step={0.016}
            value={this.state.played}
            onMouseDown={this.onSeekMouseDown}
            updateRange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />

          {this.state.duration && formatProgressTime(this.state.duration * (1 - this.state.played))}
          <button onClick={this.togglePlay} className='pg-cursor-pointer' type={'button'}>
            <Icon src={this.state.playing ? pause : play} className={styles.icon} />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  item: state.sidebar.item
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullScreen: (value: any) => dispatch(setFullScreen(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer)
