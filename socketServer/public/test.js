const socket = io.connect('http://localhost:5000')
socket.emit('join')

socket.on('waiting', (data) => {
  const current = moment(data.currentTime)
  const end = moment(data.endTime)
  const min = moment.duration(end.diff(current)).get('minutes')
  const sec = moment.duration(end.diff(current)).get('seconds')

  $('#msgbox').text(`${min} : ${sec}`)
})

$('#button').click(() => {
  $('#msgbox').append('Ping server<br>')
  socket.emit('message', { txt: 'this is a message from client' })
})
