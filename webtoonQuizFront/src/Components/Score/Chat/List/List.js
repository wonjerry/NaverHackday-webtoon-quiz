import React, { Component } from 'react'
import './List.css'

class ChatList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  render() {
    return (
      <div className='chatList'>
        <h4>실시간 채팅</h4>
        {this.state.data.map((item, index) => {
          return (
            <p key={index} className='chatText'>
              {item}
            </p>
          )
        })}
      </div>
    )
  }
}

export default ChatList
