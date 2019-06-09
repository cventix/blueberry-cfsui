import React from 'react'
import ReactPlayer from 'react-player'
import { Progressbar } from '../ui-elements/Progressbar/Progressbar'
import styles from './VideoPlayer.module.scss'
import { formatProgressTime } from '../../services/internal/utils/formatProgressTime'
import { Icon } from '../ui-elements/Icon'
import volume from '../../images/controlcons/icon-volume.svg'
import play from '../../images/controlcons/icon-play.svg'
import pause from '../../images/controlcons/icon-pause.svg'
import fullscreen from '../../images/controlcons/icon-fullscreen.svg'
import { IconLink } from '../ui-elements/IconLink'

import Fullscreen from 'react-full-screen'
import { connect } from 'react-redux'
import { setFullScreen } from '../../services/internal/store/actions/selections'
import { RangeBar } from '../ui-elements/Rangebar/Rangebar'

class MyVideoPlayer extends React.Component<any, any> {
  player: any
  constructor(props: any) {
    super(props)
    this.state = {
      playing: false,
      volume: 0.8,
      isFull: false
    }
  }
  onSeekMouseDown = (e: any) => {
    this.setState({ seeking: true })
  }
  onSeekChange = (e: any) => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = (e: any) => {
    console.log(e.target.value)
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  setVolume = (e: any) => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  togglePlay = () => {
    this.setState({ playing: !this.state.playing })
  }
  onProgress = (state: any) => {
    console.log('onProgress', state)
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onDuration = (duration: number) => {
    console.log('onDuration', duration)
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
      <div className={styles.videoPlayer}>
        <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
          <ReactPlayer
            ref={this.ref}
            url={this.props.url}
            playing={this.state.playing}
            height={'100%'}
            width={this.state.isFull && '100%'}
            volume={this.state.volume}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
        </Fullscreen>
        <div className={styles.controlBar}>
          <div onClick={this.goFull}>
            <IconLink icon={fullscreen} />
          </div>
          <div className={styles.row}>
            <Progressbar max={1} width={62} height={4} value={this.state.volume} color={'gray'} onChange={this.setVolume} />
            <Icon src={volume} />
          </div>
          {this.state.duration && formatProgressTime(this.state.duration)}

          <RangeBar
            max={1}
            width={300}
            height={6}
            value={this.state.played}
            onMouseDown={this.onSeekMouseDown}
            updateRange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
          {this.state.duration && formatProgressTime(this.state.duration * (1 - this.state.played))}
          <button onClick={this.togglePlay} className={styles.play} type={'button'}>
            <Icon src={this.state.playing ? pause : play} className={styles.icon} />
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setFullScreen: (value: any) => dispatch(setFullScreen(value))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MyVideoPlayer)
