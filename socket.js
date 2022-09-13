const io = require('socket.io')
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const socketPort = process.env.REACT_APP_SOCKETPORT || 3008
const server = io(socketPort, {transports: ['websocket', 'polling']})

const serialPort = new SerialPort( {path:"COM5", baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

serialPort.on("open", () => {
  console.log('serial port open');
});

server.on('connection', socket => {
  console.log('socket connected')

  parser.on('data', data =>{
    socket.emit('data', data)
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
})


console.log(`running on localhost:${socketPort}`)