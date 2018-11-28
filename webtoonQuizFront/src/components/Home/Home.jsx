import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import Quiz from '../Quiz'
import logo from '../../img/logo.svg'
import { actionCreators } from '../../state/actions/home'
import { getNaverLoginInfo } from '../../utils'

import './Button.scss'
import './Home.css'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const { CLIENT_ID, REDIRECT_URI } = getNaverLoginInfo()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      buttonOpen: false,
    }
    window.naverSignInCallback = this.naverSignInCallback.bind(this)
  }

  // TODO(wonjerry): Do it in redux-saga.
  componentDidMount() {
    // setInterval(() => this.timeCheck(), 1000)
    const naverLogin = new window.naver_id_login(CLIENT_ID, REDIRECT_URI)
    // TODO(wonjerry): Get from redux store.
    if (!naverLogin.oauthParams.access_token) {
      alert('로그인 해주세요.')
      this.props.history.push('/')
    }
    naverLogin.get_naver_userprofile('naverSignInCallback()')
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }

  naverSignInCallback() {
    const naverLogin = new window.naver_id_login(CLIENT_ID, REDIRECT_URI)
    // TODO(wonjerry): Get from redux store.
    const nickname = naverLogin.getProfileData('nickname')
    this.props.setNickname(nickname)
  }

  // TODO(wonjerry): Convert to moment.
  // I think ui don't have to check start time.
  timeCheck() {
    const curruentdate = new Date()
    let time = curruentdate.toLocaleTimeString().split(':')
    if (
      this.state.startTimeHour === time[0] &&
      this.state.startTimeMin < time[1]
    ) {
      this.setState({ open: true })
    }
  }

  getStartButton() {
    // TODO(wonjerry): Get start time from REST server.
    return !this.state.buttonOpen ? (
      <section
        className="portfolio-experiment"
        onClick={() => {
          this.props.history.push('/Quiz')
        }}
      >
        <a className="quiz_a">
          <span className="text">GAME START</span>
          <span className="line -right" />
          <span className="line -top" />
          <span className="line -left" />
          <span className="line -bottom" />
        </a>
      </section>
    ) : (
      <Paper elevation={2} id="paper">
        <Typography variant="h5" component="h3">
          대기중입니다.
        </Typography>
        <Typography component="p">
          퀴즈 시작 시간은 00시 00분 입니다.
        </Typography>
      </Paper>
    )
  }

  render() {
    if (this.state.hasError) {
      return <div>Home화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
    }

    return (
      <div className="home">
        <Container>
          <div className="webtoon-live-text-top">대국민 라이브 퀴즈쇼</div>
          <div className="webtoon-live-logo">
            <img src={logo} alt="" />
          </div>
          <div className="webtoon-live-text-bottom">
            와 함께하는 실시간 퀴즈쇼에 참여하시고 엄청난 상금의 주인공이
            되세요!
          </div>
          <div className="start-button">{this.getStartButton()}</div>
          <div>환영합니다 {this.props.nickname}님</div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  nickname: state.home.nickname
})

const mapDispatchToProps = {
  setNickname: actionCreators.setNickname
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
