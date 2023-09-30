require('dotenv').config();
const express = require('express');
const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const client_token = process.env.client_token;
const ssl_direction = 'ws://irc-ws.chat.twitch.tv:80';
const irc = require('irc');
// Import required modules

// Create an Express application
const app = express();
const port = 3000; // Choose any available port you prefer
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();

client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
});
async function wsockOpenConnection(){
    client.connect(ssl_direction);
    wsockListener(client);
}

async function wsockListener(client){
    client.on('connect', function(connection) {
        connection.sendUTF('CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands');
        connection.sendUTF('PASS ' + client_token);
        connection.sendUTF('NICK sylviapoyito');
        connection.sendUTF('JOIN #sylviapoyito');
    });
    console.log(client);
    debugger;
    client.on('message', (message) => {
        console.log(message);
    });

}
wsockOpenConnection();