import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import './WaitingRoom.scss'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      remainTimeText: this.getStartTimeText(props.startTime)
    }

    this.timer = setInterval(() => { 
      if (moment().isSameOrAfter(this.props.startTime, 'second')) {
        clearInterval(this.timer)
      }
      this.setState({
        remainTimeText: this.getStartTimeText(this.props.startTime)
      })
    }, 1000)
  }

  // TODO(wonjerry): Check this in router
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.startQuiz) {
      nextProps.history.push('/Quiz')
    }
    return null
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getStartTimeText(startTime) {
    return moment(moment().diff(moment(startTime))).format('mm : ss')
  }

  render() {
    const { remainTimeText } = this.state
    if (this.state.hasError) {
      return <div>관리자에게 문의 바랍니다.</div>
    }

    return (
      <Container>
        <div className="waiting-text">시작까지</div>
        <div className="waiting-time">{remainTimeText}</div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  startTime: state.waitingRoom.startTime,
  startQuiz: state.waitingRoom.startQuiz
})

export default connect(
  mapStateToProps,
  null
)(WaitingRoom)
