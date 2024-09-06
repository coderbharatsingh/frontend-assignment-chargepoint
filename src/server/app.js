const express       = require("express")
const http          = require("http")
const WebSocket     = require("ws")
const path			= require('path');
require('dotenv').config();

// Broadcaster is a class that emit event when a new datapoint arrive
// This is just an emulation of real life situation where datapoint came in randomly
const Broadcaster   = require ("./Broadcaster")

const app        = express()

// Create own HTTP server instead of using app.listen() in order to share the same port with WS
const httpServer = http.createServer(app)

// Initating all middleware for express
app
	.set("views", `${process.cwd()}/src/server/views`)
	.set("view engine", "pug")
	.use(express.static(`${process.cwd()}/dist`))

// Render index.pug from views for root URL
app
	.get("/", (req, res) => {
		res.render("index")
	})

if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
	});
}

// Initiate websocket server with the same server as express
const wss = new WebSocket.Server({ server: httpServer })

// Create new Broadcaster
// Maybe you can add multiple broadcaster for multiple bus using the same data to make it a little interesting
const broadcaster = new Broadcaster()

broadcaster.start()
broadcaster.on("data", (data) => {
	// Send data to all connected clients on websocket
	wss.clients.forEach((socket) => {
		socket.send(JSON.stringify(data))
	})
})

// Start listening on same port for both express app and WS server
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
	console.log("HTTP server listening on port " + port)
})


