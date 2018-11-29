import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../../img/logo.svg'
import globe from '../../img/globe.svg'
import anonymous from '../../img/anonymous.svg'
import { getNaverLoginInfo } from '../../utils'

import './Button.scss'
import './Login.scss'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const { CLIENT_ID, REDIRECT_URI } = getNaverLoginInfo()

class Login extends Component {
  constructor(props) {
    super(props)
    this.naverLogin = null
    this.state = {
      hasError: false
    }
  }

  // TODO(wonjerry): Do it in redux-saga.
  componentDidMount() {
    this.naverLogin = new window.naver_id_login(CLIENT_ID, REDIRECT_URI)
    this.naverLogin.setButton('white', 4, 60)
    this.naverLogin.setDomain('http://localhost:3000')
    this.naverLogin.setState(this.naverLogin.getUniqState())
    this.naverLogin.init_naver_id_login()
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return <div>Home화면이 에러가 났어요. 관리자에게 문의 바랍니다.</div>
    }

    return (
      <div>
        <Container>
          <div className='globe-container'>
            <img src={globe} alt='' />
          </div>
          <div className='logo-container'>
            <img src={logo} alt='' />
          </div>
          <div className='anonymous-container'>
            <img className='ananymous' src={anonymous} alt='' />
          </div>
          <div id='naver_id_login' className='naver-login' />
        </Container>
      </div>
    )
  }
}

export default Login
