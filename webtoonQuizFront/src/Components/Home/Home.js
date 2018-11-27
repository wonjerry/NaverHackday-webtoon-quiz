import React, { Component } from 'react';
import './Button.scss';
import './Home.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Clock from 'react-live-clock';
import Quiz from '../Quiz/Quiz';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const client_id = 'JnMzxgYF8MGJLzpxmSmh';
const redirectURI = encodeURI("http://localhost:3000/Home");

class Home extends Component {

    constructor(props) {
        super(props);  
        this.state = {   
          startTimeHour: '오전 1',
          startTimeMin: '15',   
          error : false,
          nickname: '',
          question:'',
          buttonOpen : true,
          quizOpen: false
        };
        window.naverSignInCallback = this.naverSignInCallback.bind(this)
      }

  
      componentDidMount() {
        setInterval(() => this.timeCheck(), 1000);
        var naver_id_login = new window.naver_id_login(client_id, redirectURI)

        if(naver_id_login.oauthParams.access_token===undefined){
            alert("로그인 해주세요.")
            this.props.history.push("/");}

        naver_id_login.get_naver_userprofile("naverSignInCallback()");
      }

      naverSignInCallback() {
        var naver_id_login = new window.naver_id_login(client_id, redirectURI);
        this.setState({
          nickname: naver_id_login.getProfileData('nickname')
        });
      }

      timeCheck() {
        var curruentdate= new Date();     
        let time = curruentdate.toLocaleTimeString().split(":");
        if(this.state.startTimeHour===time[0] && this.state.startTimeMin<time[1] )
            { this.setState({open: true})};
      }

      componentDidCatch(error, info){
        this.setState({
          error: true ,
        });
      }

    render() {
        if(this.state.error){
            return(
              <div>Home화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
            );
        }
        else{
            let button = ( <Paper elevation={2} id='paper'>
                <Typography variant="h5" component="h3">
                대기중입니다.
                </Typography>
                <Typography component="p">
                    퀴즈 시작 시간은 {this.state.startTimeHour}시 {this.state.startTimeMin}분 입니다.
                </Typography>
  
                </Paper>);

            if(this.state.buttonOpen){
                button=(
                   <section className="portfolio-experiment" onClick={()=>{this.setState({quizOpen : true})}}>
                        <a className="quiz_a">
                            <span className="text">GAME START</span>
                            <span className="line -right"></span>
                            <span className="line -top"></span>
                            <span className="line -left"></span>
                            <span className="line -bottom"></span>
                        </a>
                    </section>       
                );
            }
                if(this.state.quizOpen){
                    return (
                        <div>
                    
                        <Quiz nickname={this.state.nickname} question={this.state.question} props={this.props}/>
                        </div>
                    );}
                    
                else{
                    return (
                        <div className="Home">   
                            <Container>
                              
                                <p className="HOME-WEBTOON-LIVE-LOGO">
                                <p className="HOME-WEBTOON-text">대국민 라이브 퀴즈쇼</p>
                                    WEBTOON
                                    <p className="HOME-text-style-1">LIVE</p>                                   
                                </p>
                                <p className="HOME-WEBTOON-text1">와 함께하는 실시간 퀴즈쇼에 참여하시고 엄청난 상금의 주인공이 되세요!</p>
                             
                               {button}              
                                    <br/>
                                <div>환영합니다 {this.state.nickname}님</div>
                            </Container>
                        </div>
                );}
        }
    }
}

export default Home;