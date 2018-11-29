import moment from 'moment'
import { Line } from 'rc-progress'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import './CheckBox.scss'
import './Switch.css'
import './Quiz.scss'

import jo from '../../img/jo.png'
import { actionCreators } from '../../state/actions/quiz'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const QUIZ_TIME = 5000

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      answerCount: 0,
      answer: 0,
      hasError: false
    }
    this.timer = null
  }

  componentDidMount() {
    const endTime = moment().valueOf() + QUIZ_TIME
    this.timer = setInterval(() => this.progressTime(endTime), 10)
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.endQuiz) {
      nextProps.history.push('/Score')
    }

    if (nextProps.endGame) {
      nextProps.history.push('/Result')
    }
    return null
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }

  isFinish(endTime) {
    const now = moment().valueOf()
    return moment(now).isSameOrAfter(endTime, 'second')
  }

  // TODO(wonjerry): Change time check logic
  progressTime(endTime) {
    let diff = moment(endTime).diff(moment())
    diff = diff < 0 ? 0 : diff
    this.setState({
      percent: (Math.floor(QUIZ_TIME - diff) / QUIZ_TIME) * 100
    })

    if (this.isFinish(endTime)) {
      clearInterval(this.timer) 
    }
  }

  buttonChange(event, confirm) {
    const quiz = document.getElementsByTagName('input')

    if (confirm) {
      for (let i = 0; i < quiz.length; i++) {
        if (quiz[i] === event.target) {
          quiz[i].checked = true
          this.props.setAnswer(i)
        } else {
          quiz[i].checked = false
        }
      }
      let count = this.state.answerCount
      this.setState({ answerCount: ++count })
    } else {
      for (let i = 0; i < quiz.length; i++) {
        quiz[i].checked = i === this.props.answer
      }
    }
  }

  CheckQuiz(event) {
    switch (this.state.answerCount) {
      case 0:
        this.buttonChange(event, true)
        break
      case 1:
        const isChange = window.confirm('마지막 기회입니다. ')
        this.buttonChange(event, isChange)
        break
      default:
        alert('기회가 없습니다.')
        this.buttonChange(event, false)
    }
  }
  CheckSwitch(event){
    if(event.target.id==="no"){
      this.props.setAnswer(1);
    }
    else if (event.target.id==="yes"){
      this.props.setAnswer(0);      
    }
  }

  getChoiceButtion(order, choice) {
    return (
      <label className='Switch'>
        <p className='quizText'>{`${order}. ${choice}`}</p>
        <div className='Switch-inner'>
          <input
            type='checkbox'
            id='quiz'
            value={order}
            onClick={this.CheckQuiz.bind(this)}
          />
          <div className='Switch-bg' />
          <div className='Switch-handle' />
        </div>
      </label>
    )
  }

  render() {
    
    const { hasError, answer, percent } = this.state
    const {
      question: { title, imgSrc, choices , type }
    } = this.props

    if (hasError) {
      return <div>Quiz화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
    }

    if(this.props.question.type==="option"){
      return (
        <Container>
          <div className='quiz-img-container'>
            <img src={jo} alt='img' className='quizImg' />
          </div>
          <div className='quiz-title'>{title}</div>
          <div className='quiz-choices'>
            {choices.map((choice, index) => this.getChoiceButtion(index, choice))}
          </div>
          <Line
            strokeWidth='2'
            trailWidth='2'
            percent={percent}
            strokeLinecap='square'
            trailColor='rgba(255,255,255,0.05)'
          />
        </Container>
      )
    }

    else if(this.props.question.type==="ox"){
      return (
        <Container>
          <div className='quiz-title'>{title}</div>
          <div className="quiz_ox"></div>
            <div class="toggle-radio">
            <input type="radio" v-model="picked" name="rdo" id="yes" onClick={this.CheckSwitch.bind(this)} />
            <input type="radio" v-model="picked" name="rdo" id="no"  onClick={this.CheckSwitch.bind(this)} />
            <div class="switch">
              <label for="yes">Yes</label>
              <label for="no">No</label>
              <span></span>
            </div>
        </div>
        
          <Line
              strokeWidth='2'
              trailWidth='2'
              percent={percent}
              strokeLinecap='square'
              trailColor='rgba(255,255,255,0.05)'
            />
        </Container>
      )
    }

  }
}

const mapStateToProps = (state) => ({
  question: state.quiz.question,
  answer: state.quiz.answer,
  endQuiz: state.quiz.endQuiz,
  endGame: state.quiz.endGame
})

const mapDispatchToProps = {
  setAnswer: actionCreators.setAnswer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)
