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
    const { answerCount } = this.state
    const {
      answer,
      question: { title, imgSrc, choices },
      nickname
    } = this.props

    progress1 = (
      <div className='scoreProgress'>
        <p className='scoreText'>
          <strong>정답</strong> 2. {choices[1]}{' '}
        </p>
        <p> {answerCount[1]} 명</p>
      </div>
    )
    progress2 = (
      <div className='scoreProgress'>
        <p className='scoreText'>1. {choices[0]}</p>
        <p> {answerCount[0]} 명</p>
      </div>
    )
    progress3 = (
      <div className='scoreProgress'>
        <p className='scoreText'>3. {choices[2]}</p>
        <p> {answerCount[2]} 명</p>
      </div>
    )

    if (this.state.connect) {
      return (
        <div className='score'>
          <Container>
            <div className='list'>
              <WinnerList />
            </div>
            <SockJsClient
              url={chatURL}
              topics={['/topic/answer']}
              onMessage={(msg) => {
                var length = this.state.data.length
                this.state.data[length] = msg.content
                this.setState({ data: this.state.data })
                var el = document.querySelector('.chatList')
                el.scrollTop += 230
              }}
              onConnect={() => {
                this.setState({ connect: true })
              }}
              onDisConnect={() => {
                this.setState({ connect: false })
              }}
              ref={(client) => {
                this.clientRef = client
              }}
            />

            <h2>{this.state.question}</h2>
            <p className='explain'>
              {' '}
              퀴즈 제출 시간은 5초 입니다. 내가 제출한 답{' '}
              <strong>{answer + 1}</strong>
            </p>
            <p className='explain'>
              {' '}
              현재 {this.state.totalUser}명이 참가중입니다.
            </p>
            <h2 className='animated infinite slideInUp delay-1s'>
              {this.state.time}
            </h2>
            <br />

            {progress1}
            <Progress percent={this.state.answerCount[1]} status='success' />
            {progress2}
            <Progress
              percent={this.state.answerCount[0]}
              status='error'
              theme={{
                error: {
                  symbol: '😱',
                  color: '#fbc630'
                }
              }}
            />
            {progress3}
            <Progress percent={this.state.answerCount[2]} status='error' />

            <Chat
              clientRef={this.clientRef}
              data={this.state.data}
              nickname={nickname}
              props={this.props}
            />
          </Container>
        </div>
      )
    }

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
            {`현재 ${this.state.totalUser}명이 참가중입니다.`}
          </p>

          <h2 className='animated infinite slideInUp delay-1s'>
            {this.state.time}
          </h2>
          <br />

          {progress1}
          <Progress percent={answerCount[1]} status='success' />
          {progress2}
          <Progress
            percent={answerCount[0]}
            status='error'
            theme={{
              error: {
                symbol: '😱',
                color: '#fbc630'
              }
            }}
          />
          {progress3}
          <Progress percent={answerCount[2]} status='error' />
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
