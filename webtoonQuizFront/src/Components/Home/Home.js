import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Quiz from '../Quiz/Quiz'

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
      nickname: '',
      question: '',
      buttonOpen: false,
      quizOpen: false
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
    this.setState({
      nickname: naverLogin.getProfileData('nickname')
    })
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
    return this.state.buttonOpen ? (
      <section
        className="portfolio-experiment"
        onClick={() => {
          this.setState({ quizOpen: true })
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
    const { hasError, quizOpen, nickname, question } = this.state
    if (hasError) {
      return <div>Home화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
    }

    if (quizOpen) {
      return (
        <div>
          <Quiz nickname={nickname} question={question} props={this.props} />
        </div>
      )
    }

    return (
      <div className="Home">
        <Container>
          <p className="HOME-WEBTOON-LIVE-LOGO">
            <p className="HOME-WEBTOON-text">대국민 라이브 퀴즈쇼</p>
            WEBTOON
            <p className="HOME-text-style-1">LIVE</p>
          </p>
          <p className="HOME-WEBTOON-text1">
            와 함께하는 실시간 퀴즈쇼에 참여하시고 엄청난 상금의 주인공이
            되세요!
          </p>
          {this.getStartButton()}
          <br />
          <div>환영합니다 {nickname}님</div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  nickname: state.home.nickname
})

export default connect(mapStateToProps, null)(Home)
