import React, { Component } from 'react';
import styled from 'styled-components';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './Score.css'
import Chat from './Chat/Chat';
import Clock from 'react-live-clock';
import WinnerList from './WinnerList/WinnerList.js';
import SockJsClient from 'react-stomp';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width:100%;
`;


class Score extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          question: props.question,
          quiz: "웹툰 퀴즈", 
          scoreTime:10,    
          time: 0,
          totalUser : 0, 
          nickname : props.nickname,
          error : false,
          connect: false,
          data: [],
        };
      }
  

    render() {
      if(this.state.connect){
          return(
        <div className="score">
        <Container>
            <div className="list">
                <WinnerList/>
            </div>
            <SockJsClient url='http://localhost:8080/websocketChat' topics={['/topic/answer']}
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
             <p className="explain"> 퀴즈는 30초 마다 시작 됩니다. 퀴즈 제출 시간은 10초 입니다.</p>
             <p className="explain" > 현재 {this.state.totalUser}명이 참가중입니다.</p>
             <br/>
             <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'} />
        <br/>
            <div>
                <p className="scoreText"> <strong>정답</strong>     1. {this.state.quiz}  </p>
                <p>88명</p> 
            </div>
            <Progress percent={88} status="success" />
            <div>
                <p className="scoreText">2. {this.state.quiz}</p> 
                <p>10명</p> 
            </div>
            <Progress  percent={10}
                status="error"
                theme={{
                    error: {
                    symbol: '😱',
                    color: '#fbc630'
                    }
                }} />
            <div>
                <p className="scoreText">3. {this.state.quiz}</p> 
                <p>2명</p> 
            </div>
            <Progress percent={2} status="error" />     
       
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
                    <SockJsClient url='http://localhost:8080/websocketChat' topics={['/topic/answer']}
      
                    onConnect={ () => { this.setState({ connect: true }) } }
                    onDisConnect={ () => { this.setState({ connect: false }) } }
                    
                        ref={ (client) => { this.clientRef = client }} />

                    <h2>{this.state.question}</h2> 
                     <p className="explain"> 퀴즈는 30초 마다 시작 됩니다. 퀴즈 제출 시간은 10초 입니다.</p>
                     <p className="explain" > 현재 {this.state.totalUser}명이 참가중입니다.</p>
                     <br/>
                     <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'} />
                <br/>
                    <div>
                        <p className="scoreText"> <strong>정답</strong>     1. {this.state.quiz}  </p>
                        <p>88명</p> 
                    </div>
                    <Progress percent={88} status="success" />
                    <div>
                        <p className="scoreText">2. {this.state.quiz}</p> 
                        <p>10명</p> 
                    </div>
                    <Progress  percent={10}
                        status="error"
                        theme={{
                            error: {
                            symbol: '😱',
                            color: '#fbc630'
                            }
                        }} />
                    <div>
                        <p className="scoreText">3. {this.state.quiz}</p> 
                        <p>2명</p> 
                    </div>
                    <Progress percent={2} status="error" />     
               
                </Container>
          
            </div>
        );}
    }
}

export default Score;