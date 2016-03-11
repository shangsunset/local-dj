'use strict'

const spawn = require('child_process').spawn
const net = require('net')
const dns = require('dns')
const fs = require('fs')
const register = require('register-multicast-dns')

const port = 4042
const station = 'local-dj.local'


function connect(host) {

  const socket = net.connect(port, host)
  const child = spawn('mpg123', ['-'], { stdio: [null, 'inherit', 'inherit'] })

  socket.pipe(child.stdin)

  socket.on('error', error => {
    console.error(`client socket error: ${error}`)
  })
  child.on('error', error => {
    console.log(`music player error: ${error}`)
    process.exit(1)
  });
}


function main() {

  const song = process.argv.slice(2)[0]
  if (song) {

    const server = net.createServer(socket => {
      const source = fs.createReadStream(song);
      source.pipe(socket)

      socket.on('error', error => {
        console.log(`server socket error: ${error}`)
        socket.destroy()
      })
    })

    server.on('error', error => {
      console.log(`server error: ${error}`)
    })

    server.listen(port)
    register(station)
    connect('localhost')

  } else {
  
    dns.lookup(station, (err, host) => {
      connect(host)
    })
  }
}

main()
