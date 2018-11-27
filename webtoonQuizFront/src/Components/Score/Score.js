import React, { Component } from 'react';
import styled from 'styled-components';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './Score.css'
import Chat from './Chat/Chat';
import Clock from 'react-live-clock';
import WinnerList from './WinnerList/WinnerList.js';
import SockJsClient from 'react-stomp';
import {chatURL} from '../socketURL'
import 'animate.css'
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width:100%;
`;

let progress1=""
let progress2=""
let progress3=""

class Score extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          question: props.question,
          quizName: props.quizName, 
          answer: props.answer,
          answerCount :[],
          scoreTime:10,    
          time: 0,
          totalUser : 0, 
          nickname : props.nickname,
          error : false,
          connect: false,
          solution :1 ,
          data: [],
        };
      }
      componentDidMount() {
        this.setState({answerCount:["10","88","2"]});
        this.timerID = setInterval(() => this.progressTime(), 1000);
      }
      componentWillUnmount(){
        clearInterval(this.timerID);
      }
 
      progressTime() {
      
        let curruentdate= new Date();     
        let time = curruentdate.getSeconds();
      
        if (5<=time && time<15 ) {
            var temp = Math.abs(15-time);         
            this.setState({time : temp});
        }
        else if(20<=time && time<30){
            var temp = Math.abs(30-time);

            this.setState({time :temp});       
        }
        else if(35<=time && time<45){ 
            var temp = Math.abs(45-time);     
            this.setState({time :temp});          
        }
        else if(50<=time && time<60){
            var temp = Math.abs(60-time);

            this.setState({time :temp});
        }
      }

      
    render() {
       
            progress1 = (<div>
                <p className="scoreText"> <strong>정답</strong>   2. {this.state.quizName[1]}  </p>
                <p> {this.state.answerCount[1]} 명</p> 
            </div>
            );
            progress2 = (  <div>
                <p className="scoreText">1. {this.state.quizName[0]}</p> 
                <p> {this.state.answerCount[0]} 명</p> 
            </div>
            );
            progress3 =  ( 
            <div>
                <p className="scoreText">3. {this.state.quizName[2]}</p> 
                <p> {this.state.answerCount[2]} 명</p> 
            </div>
            );
        

      if(this.state.connect){
          return(
        <div className="score">
        <Container>
            <div className="list">
                <WinnerList/>
            </div>
            <SockJsClient url={chatURL}  topics={['/topic/answer']}
               onMessage={(msg) => { 
                var length= this.state.data.length; 
                this.state.data[length]=msg.content; 
                this.setState({data:this.state.data});    
                var el =document.querySelector(".chatList");
                el.scrollTop+=230;            
           }}
            onConnect={ () => { this.setState({ connect: true }) } }
            onDisConnect={ () => { this.setState({ connect: false }) } }          
                ref={ (client) => { this.clientRef = client }} />

            <h2>{this.state.question}</h2> 
             <p className="explain"> 퀴즈 제출 시간은 5초 입니다. 내가 제출한 답 <strong>{this.state.answer+1}</strong></p>
             <p className="explain" > 현재 {this.state.totalUser}명이 참가중입니다.</p>
             <h2 className="animated infinite slideInUp delay-1s">{this.state.time}</h2>
        <br/>

            {progress1}
            <Progress percent={this.state.answerCount[1]} status="success" />
            {progress2}
            <Progress  percent={this.state.answerCount[0]}
                status="error"
                theme={{
                    error: {
                    symbol: '😱',
                    color: '#fbc630'
                    }
                }} />
            {progress3}
            <Progress percent={this.state.answerCount[2]} status="error" />     
       
            <Chat clientRef={this.clientRef} data={this.state.data} nickname={this.state.nickname} props={this.props} />
        </Container>
  
    </div>
      );}
      else{
        return (
            <div className="score">
                <Container>
                    <div className="list">
                        <WinnerList/>
                    </div>
                    <SockJsClient url={chatURL} topics={['/topic/answer']}
                        onMessage={(msg) => { 
                            var length= this.state.data.length; 
                            this.state.data[length]=msg.content; 
                            this.setState({data:this.state.data});    
                            var el =document.querySelector(".chatList");
                            el.scrollTop+=230;            
                    }}
                    onConnect={ () => { this.setState({ connect: true }) } }
                    onDisConnect={ () => { this.setState({ connect: false }) } }
                    
                        ref={ (client) => { this.clientRef = client }} />

                    <h2>{this.state.question}</h2> 
                    <p className="explain"> 퀴즈 제출 시간은 5초 입니다. 내가 제출한 답 <strong>{this.state.answer+1}</strong></p>
                     <p className="explain" > 현재 {this.state.totalUser}명이 참가중입니다.</p>
                    
                     <h2 className="animated infinite slideInUp delay-1s">{this.state.time}</h2>
                <br/>
              
                    {progress1}
                    <Progress percent={this.state.answerCount[1]} status="success" />
                    {progress2}
                    <Progress  percent={this.state.answerCount[0]}
                        status="error"
                        theme={{
                            error: {
                            symbol: '😱',
                            color: '#fbc630'
                            }
                        }} />
                    {progress3}
                    <Progress percent={this.state.answerCount[2]} status="error" />  
               
                </Container>
          
            </div>
        );}
    }
}

export default Score;