const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(http);
const ss = require('socket.io-stream')
var data ;
io.on('connection',socket => {
    socket.on('videoStream',stream => {
      data = stream
        socket.broadcast.emit('sendVideoStream',stream)
        
    })
   socket.on('connection',data => {
    socket.emit('stream',data)
   })
   
},{"transports": ['websocket']})
app.use(express.static('public'))

app.get('/',(req,res) => {
  res.sendFile(path.resolve(__dirname,'view','index.html'))
})





http.listen(5200,console.log('Server is working on port 5200'))