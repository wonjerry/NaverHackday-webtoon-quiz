import React, { Component } from 'react';
import './Result.css'
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
const Question = styled.div`
  color: ${props => props.primary ? "white" : "black"};
  width: 140%;
  font-size: 3em;
  border-radius: 3px;
  color: #088A29;
  margin-top:24%;
  margin-bottom:-6%;
`;
class Result extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          winner : ['김범수',	"나영석",
            '닐로',	'정준하',
            '박효신',	'박명수',
            '멜로망스',	'데프콘',
            '블랙핑크',	'하하',
            '에이핑크',	'김종국',
            '휘성',	'김건모',
            '임창정',	'토니',
            '트와이스',	'정형돈'],
          error : false,
        };
      }
    render() {
        let winnerResult =[];
        let winnerResult1 =[];
        let winnerResult2 =[];
        let winnerResult3 =[];

        let count =7;
        for (var i = 0; i < this.state.winner.length; i++) {   
            if(i<count)
              winnerResult[i] = <p className="winner">{this.state.winner[i]}  </p>;      
            else if(i<count*2)
            winnerResult1[i] = <p className="winner">{this.state.winner[i]}  </p>;    
            else if(i<count*3)
            winnerResult2[i] = <p className="winner">{this.state.winner[i]}  </p>;    
            
        }

        return (
            <div>

                <Container>
                <Question>
                <p className="title"><bold>웹툰 퀴즈 최다 득점자입니다. <br/>축하 드립니다.</bold></p>
                </Question>
                    <div className="mainScore">
                        <div className="wordBoxScore">{winnerResult}</div>
                        <div className="wordBoxScore">{winnerResult1}</div>
                        <div className="wordBoxScore">{winnerResult2}</div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Result;