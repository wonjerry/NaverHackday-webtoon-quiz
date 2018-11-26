import React, {Component} from 'react';
import styled from 'styled-components';
import SockJsClient from 'react-stomp';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from './List/List.js';
const Post = styled.div`
    padding: 3em 1em;
`;


class PaperSheet extends Component{
    constructor(props){
        super(props);
        this.state = { 
            data:[],
            nickname : props.nickname,  
            connect: false,
        };
      }


componentDidMount(){
    console.log(this.clientRef.state.connected)
    if(this.clientRef.state.connected){
        this.setState({connect:true});
    }
}

sendChat= ()=>{
    var temp = document.getElementsByTagName("input").context.value;
    if(!(temp==='')){
    var context= this.state.nickname+": ";   
    context += temp;
    this.clientRef.sendMessage(`/app/chat`,JSON.stringify({'name': context}));
    document.getElementsByTagName("input").context.value='';}
    else{
        alert("내용을 입력하세요.");
    }
}

enterkey=()=>{

    if (window.event.key== 'Enter') {
        var temp = document.getElementsByTagName("input").context.value;
        console.log(this.clientRef)
        if(!(temp==='')){
        var context= this.state.nickname+": ";   
        context += temp;
  
        this.clientRef.sendMessage(`/app/chat`,JSON.stringify({'name': context}));
        document.getElementsByTagName("input").context.value='';
        }
        else{
            alert("내용을 입력하세요.");
        }
    }
}



render(){

    if(!(this.state.connect)){
        return(
            <div>
        <SockJsClient url='http://localhost:8080/websocketChat' topics={['/topic/answer']}
            onMessage={(msg) => { 
                var length= this.state.data.length; 
                this.state.data[length]=msg.content; 
                this.setState({data:this.state.data});    
                var el =document.querySelector(".chatList");
                el.scrollTop+=230;            
           }}
            ref={ (client) => { this.clientRef = client }} />
            </div>
        );
    }
    else{
  return(
    <div className="chat">
         <SockJsClient url='http://localhost:8080/websocketChat' topics={['/topic/answer']}
            onMessage={(msg) => { 
                var length= this.state.data.length; 
                this.state.data[length]=msg.content; 
                this.setState({data:this.state.data});    
                var el =document.querySelector(".chatList");
                el.scrollTop+=230;            
           }}
            ref={ (client) => { this.clientRef = client }} />
      
        <Post >
        <List data={this.state.data} props={this.props}/>
  
        <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
                <TextField
                    required
                    id="context"
                    name="context"
                    label="채팅 내용을 적으세요."
                    fullWidth
                    autoComplete="내용"
                    onKeyUp={this.enterkey.bind(this)}
                /> 
        </Grid>
            <Button  variant="contained" color="primary" onClick={this.sendChat.bind(this)}>
            send
            </Button>
            </Grid>
           
        </Post>
    </div>
  );}}

}

export default PaperSheet;