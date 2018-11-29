import React, { Component } from 'react'
import styled from 'styled-components'
import SockJsClient from 'react-stomp'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import List from './List/List.js'
const Post = styled.div`
  padding: 3em 1em;
`

class PaperSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      nickname: props.nickname,
      clientRef: props.clientRef
    }
  }

  componentDidMount() {}

  sendChat = () => {
    var temp = document.getElementsByTagName('input').context.value
    if (!(temp === '')) {
      var context = this.state.nickname + ': '
      context += temp
      this.state.clientRef.sendMessage(
        `/app/chat`,
        JSON.stringify({ name: context })
      )
      document.getElementsByTagName('input').context.value = ''
    } else {
      alert('내용을 입력하세요.')
    }
  }

  enterkey = () => {
    if (window.event.key === 'Enter') {
      var temp = document.getElementsByTagName('input').context.value

      if (!(temp === '')) {
        var context = this.state.nickname + ': '
        context += temp

        this.state.clientRef.sendMessage(
          `/app/chat`,
          JSON.stringify({ name: context })
        )
        document.getElementsByTagName('input').context.value = ''
      } else {
        alert('내용을 입력하세요.')
      }
    }
  }

  render() {
    return (
      <div className='chat'>
        <Post>
          <List data={this.state.data} props={this.props} />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='context'
                name='context'
                label='채팅 내용을 적으세요.'
                fullWidth
                autoComplete='내용'
                onKeyUp={this.enterkey.bind(this)}
              />
            </Grid>
            <Button
              variant='contained'
              color='primary'
              onClick={this.sendChat.bind(this)}
            >
              send
            </Button>
          </Grid>
        </Post>
      </div>
    )
  }
}

export default PaperSheet
