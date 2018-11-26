import React, { Component } from 'react';
import './Button.scss';
import './Login.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Clock from 'react-live-clock';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const client_id = 'JnMzxgYF8MGJLzpxmSmh';
const redirectURI = encodeURI("http://localhost:3000/Home");

class Login extends Component {
    constructor(props) {
        super(props);  
        this.state = {   
          error : false,
          startTimeHour: '오전 1',
          startTimeMin: '15',         
          open : false,
        };
      }

    componentDidMount() {
        this.timeCheck();
        let naver_id_login = new window.naver_id_login(client_id, redirectURI);
        let state = naver_id_login.getUniqState();
        naver_id_login.setButton("white", 2,40);
        naver_id_login.setDomain("http://localhost:3000");
        naver_id_login.setState(state);
        naver_id_login.init_naver_id_login();
    }
    
      componentDidCatch(error, info){
        this.setState({
          error: true ,
        });
      }
      
    timeCheck() {
        var curruentdate= new Date();     
        let time = curruentdate.toLocaleTimeString().split(":");
        if(this.state.startTimeHour===time[0] && this.state.startTimeMin<time[1] )
            { this.setState({open: true})};
    }

    render() {
        if(this.state.error){
            return(
              <div>Login화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
            )
        }
        else{
            let button =    ( <Paper elevation={2} id='paper'>
                                <Typography variant="h5" component="h3">
                                대기중입니다.
                                </Typography>
                                <Typography component="p">
                                    퀴즈 시작 시간은 {this.state.startTimeHour}시 {this.state.startTimeMin}분 입니다.
                                </Typography>
                                <Typography component="p">
                                    로그인 후 게임을 시작할 수 있습니다. 
                                </Typography>
                        
                            </Paper>);
       
            if(this.state.open){
                button=(
                    <section className="portfolio-experiment" onClick={()=>{alert("로그인이 필요합니다.")}}>
                    <a>
                        <span classNmae="text">웹툰 퀴즈 참여하기</span>
                        <span className="line -right"></span>
                        <span className="line -top"></span>
                        <span className="line -left"></span>
                        <span className="line -bottom"></span>
                    </a>
                </section>       
                );
            }
            return (
                <div>
                    <Container>  
                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Seoul'} />
                        {button}      

                        <br/>
                        <div id="naver_id_login"></div>
                    </Container>
                </div>
            );
        }
    }
}

export default Login;
