import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Progress } from 'react-sweet-progress'
import 'animate.css'
import 'react-sweet-progress/lib/style.css'

import Chat from './Chat/Chat'
import WinnerList from './WinnerList/WinnerList.js'
import SockJsClient from 'react-stomp'
import { chatURL } from '../socketURL'

import './Score.css'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
`

let progress1 = ''
let progress2 = ''
let progress3 = ''
let progress4 = ''

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answerCount: [],
      time: 0,
      totalUser: 0,
      nickname: props.nickname,
      error: false,
      connect: false,
      solution: 1,
      data: []
    }
  }

  componentDidMount() {
    this.setState({ answerCount: ['10', '88', '2'] })
    this.timerID = setInterval(() => this.progressTime(), 1000)
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.restartQuiz) {
      nextProps.history.push('/Quiz')
    }
    return null
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  progressTime() {
    const curruentdate = new Date()
    const time = curruentdate.getSeconds()

    if (5 <= time && time < 15) {
      this.setState({ time: Math.abs(15 - time) })
    } else if (20 <= time && time < 30) {
      this.setState({ time: Math.abs(30 - time) })
    } else if (35 <= time && time < 45) {
      this.setState({ time: Math.abs(45 - time) })
    } else if (50 <= time && time < 60) {
      this.setState({ time: Math.abs(60 - time) })
    }
  }

  render() {
    console.log(this.props)
    const {
      answer,
      question: { title, description, img, option },
      nickname,
      result: { survivors }
    } = this.props

    // progress1 = (
    //   <div className='scoreProgress'>
    //     <p className='scoreText'>
    //       <strong>정답</strong> 2. {option[1]}{' '}
    //     </p>
    //     <p> {answerStatics[0]} 명</p>
    //   </div>
    // )
    // progress2 = (
    //   <div className='scoreProgress'>
    //     <p className='scoreText'>1. {option[0]}</p>
    //     <p> {answerStatics[0]} 명</p>
    //   </div>
    // )
    // progress3 = (
    //   <div className='scoreProgress'>
    //     <p className='scoreText'>3. {option[2]}</p>
    //     <p> {answerStatics[0]} 명</p>
    //   </div>
    // )

    // progress4 = (
    //   <div className='scoreProgress'>
    //     <p className='scoreText'>4. {option[3]}</p>
    //     <p> {answerStatics[0]} 명</p>
    //   </div>
    // )

    const isSurvivor = survivors.includes(nickname)

    return (
      <div className='score'>
        <Container>
          <div className='list'>
            <WinnerList />
          </div>

          <h2>{title}</h2>
          <p className='explain'>
            {`퀴즈 제출 시간은 5초 입니다. 내가 제출한 답 `}
            <strong>{answer + 1}</strong>
          </p>
          <p className='explain'>
            {`현재 ${survivors.length}명이 참가중입니다.`}
          </p>

          <h2 className='animated infinite slideInUp delay-1s'>
            {this.state.time}
          </h2>
          <br />
          <div className='is-survivor'>
            {isSurvivor ? '생존하였습니다' : '탈락하였습니다'}
          </div>

          {/* {progress1}
          <Progress percent={answerStatics[0]} status='success' />
          {progress2}
          <Progress
            percent={answerStatics[0]}
            status='error'
            theme={{
              error: {
                symbol: '😱',
                color: '#fbc630'
              }
            }}
          />
          {progress3}
          <Progress percent={answerStatics[0]} status='error' />
          {progress4}
          <Progress percent={answerStatics[0]} status='error' /> */}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  nickname: state.home.nickname,
  question: state.quiz.question,
  answer: state.quiz.answer,
  result: state.score.result,
  restartQuiz: state.score.restartQuiz
})

export default connect(
  mapStateToProps,
  null
)(Score)
