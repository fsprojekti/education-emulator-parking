const config = require('../config.json').brokerConfig
const aedes = require('aedes')()
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = config.port

// authentication handler
aedes.authenticate = function (client, username, password, callback) {
	if (username === config.username & password.toString() === config.password) {
		callback(null, true)
	} else {
		var error = new Error('Auth error')
	  error.returnCode = 4
	  callback(error, null)
	}
  
}
// create webserver
ws.createServer({ server: httpServer }, aedes.handle)

// start listeneing
httpServer.listen(port, function () {
  console.log('websocket server listening on port ', port)
})	