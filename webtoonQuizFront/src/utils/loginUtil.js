const CLIENT_ID = 'JnMzxgYF8MGJLzpxmSmh'
const REDIRECT_URI = encodeURI('http://localhost:3000/Home')

const getNaverLoginInfo = () => { 
  return {
    CLIENT_ID,
    REDIRECT_URI
  }
}

export { getNaverLoginInfo }