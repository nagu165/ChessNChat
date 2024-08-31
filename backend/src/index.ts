import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { CHAT } from './messages';

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);

    ws.on('close', () => gameManager.removeUser(ws));
    
    ws.on('message', (message) => {
      //@ts-ignore
        const data = JSON.parse(message);
        // Handle chat messages
        if (data.type === CHAT) {
            // Broadcast chat message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify({ type: 'chat', payload: { message: data.payload.message } }));
                }
            });
        }
    });
});