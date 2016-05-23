"use strict";

const app = require('express')();
const http = require('http').Server(app);
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const io = require('socket.io')(http);

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
 // socket.on('notification', msg => {
    //console.log('message: ' + msg);
    //io.emit('notification', msg);
  //});
});

app.post('/api/notify', (req, res) => {
  //console.log(req.body);
  res.send(req.body);
  io.emit('notification', req.body.notification);
})

app.get('/', (request, response) => {  
  response.send('Hello from Express!');
});

http.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})