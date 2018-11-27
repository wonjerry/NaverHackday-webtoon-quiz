import React, { Component } from 'react';
import './CheckBox.scss';
import styled from 'styled-components';
import './Switch.css'
import { Line, Circle } from 'rc-progress';
import Score from '../Score/Score.js';
import SockJsClient from 'react-stomp';
import jo from './../../img/jo.png';
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
`;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question,
      quizName: [],
      quizTime:5,    
      quizNumber:1,
      totalUser:'',
      time: 0,
      answerCount: 0,
      answer: 0,
      nickname: props.nickname,
      scoreOpen: false,
      error : false,
    };
    
  }

  componentDidMount() {
    setInterval(() => this.progressTime(), 100);
    this.setState({question:"문제1 : 누구 일까요?? "})
    this.setState({quizName:["자까","조석","박용제"]})
    
  }
  
  componentDidCatch(error, info){
    this.setState({
      error: true ,
    });
  }
  componentWillUnmount(){
    console.log("df")
  }
  progressTime() {
    let curruentdate= new Date();     
    let time = curruentdate.getSeconds();
  
    if (time<5 ) {
      this.setState({scoreOpen:false});
      this.setState({time: time*20});
    }
    else if(15<=time && time<20){
      this.setState({scoreOpen:false});
      this.setState({time: (time-15)*20});
    }
    else if(30<=time && time<35){
      this.setState({scoreOpen:false});
      this.setState({time: (time-30)*20});
    }
    else if(45<=time && time<50){
      this.setState({scoreOpen:false});
      this.setState({time: (time-45)*20});
    }
    else {
      this.setState({scoreOpen:true});  
      this.setState({answerCount: 0});
    }
  }


  buttonChange(event, confirm){
    var quiz = document.getElementsByTagName("input");
    
    if(confirm){ 
      for(var i=0; i<quiz.length; i++){
        if(quiz[i]===event.target){
            quiz[i].checked=true;
            this.setState({answer:i})
        }
        else {
            quiz[i].checked=false;
          }
      }
      var count = this.state.answerCount;
      this.setState({answerCount: ++count});
    }
    else{
        for(var i=0; i<quiz.length; i++){
          if(i===this.state.answer){
              quiz[i].checked=true;
          }
          else {
            quiz[i].checked=false;
          }
        }
      }
  }

  CheckQuiz(event){
    if(this.state.answerCount<2){
      if(this.state.answerCount===1){ 
       const isChange =window.confirm("마지막 기회입니다. ");
       if(isChange){ this.buttonChange(event,true); }
       else{ this.buttonChange(event,false); }
      }
      else{ this.buttonChange(event,true); }
    }
    else{
      alert("기회가 없습니다.");
      this.buttonChange(event,false);
    }
  }
    render() {
      if(this.state.error){
        return(
          <div>Quiz화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
        )
    }
    else{
      if(this.state.scoreOpen){
        return (
          <Score nickname={this.state.nickname} question={this.state.question} answer={this.state.answer} quizName={this.state.quizName} time={this.state.time} props={this.props}/>
        );
      }
      else{
        return (
          
            <Container>
          
                <Question>
                {/* <span className="quizNumber">문제{this.state.quizNumber}</span> */}
                    <p className="questionName"> <b>{this.state.question}</b></p>
                </Question>
                <img src={jo} alt="img" className="quizImg"/>

               <div className="quizDiv">
                <label className="Switch">
                  <p className="quizText">1. {this.state.quizName[0]}</p>
                  <div className="Switch-inner">            
                    <input type="checkbox" id="quiz" value="1" onClick={this.CheckQuiz.bind(this)}/> 
                    <div className="Switch-bg"></div>
                    <div className="Switch-handle"></div>
                  </div>
                </label>

                <label className="Switch">
                <p className="quizText">2. {this.state.quizName[1]}</p>
                  <div className="Switch-inner">                
                    <input type="checkbox" id="quiz" value="2" onClick={this.CheckQuiz.bind(this)} /> 
                    <div className="Switch-bg"></div>
                    <div className="Switch-handle"></div>
                  </div>
                </label>

                <label className="Switch">
                  <p className="quizText">3. {this.state.quizName[2]}</p>
                    <div className="Switch-inner">       
                      <input type="checkbox" id="quiz" value="3" onClick={this.CheckQuiz.bind(this)} /> 
                    <div className="Switch-bg"></div>
                    <div className="Switch-handle"></div>
                  </div>
                </label>
              </div>
              
               <Line strokeWidth="2" trailWidth="2" percent={this.state.time} strokeLinecap="square" trailColor="rgba(255,255,255,0.05)" />
                
            </Container>

        );}
      }
    }
}

export default Quiz;