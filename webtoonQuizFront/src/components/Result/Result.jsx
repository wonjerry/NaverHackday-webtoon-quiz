import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Result.css'
import styled from 'styled-components'
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`
const Question = styled.div`
  color: ${(props) => (props.primary ? 'white' : 'black')};
  width: 140%;
  font-size: 3em;
  border-radius: 3px;
  color: #088a29;
  margin-top: 24%;
  margin-bottom: -6%;
`
class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: [
        '김범수',
        '나영석',
        '닐로',
        '정준하',
        '박효신',
        '박명수',
        '멜로망스',
        '데프콘',
        '블랙핑크',
        '하하',
        '에이핑크',
        '김종국',
        '휘성',
        '김건모',
        '임창정',
        '토니',
        '트와이스',
        '정형돈'
      ],
      error: false
    }
  }
  render() {
    console.log(this.props.totalResult.survivors)
    console.log(this.props.totalResult)
    return (
      <div>
        <Container>
          <Question>
            <p className='title'>
              <bold>
                웹툰 퀴즈 최다 득점자입니다. <br />
                축하 드립니다.
              </bold>
            </p>
          </Question>
          <div className='mainScore'>
            <div className='wordBoxScore'>
              {
                this.props.totalResult.survivors.map((survivor) => {
                  return <p className='winner'>{survivor}</p>
                })
              }
            </div>
            {/* <div className='wordBoxScore'>{winnerResult1}</div>
            <div className='wordBoxScore'>{winnerResult2}</div> */}
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  totalResult: state.result.totalResult
})

export default connect(
  mapStateToProps,
  null
)(Result)
