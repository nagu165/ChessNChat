import { WebSocket } from "ws";
import { INIT_GAME, MOVE, CHAT } from "./messages"; // Add CHAT to your imports
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        // Optionally, stop the game here if necessary
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }

            if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }

            if (message.type === CHAT) {
                // Broadcast chat message to all users in the game
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    const chatMessage = {
                        type: CHAT,
                        payload: {
                            user: socket, // You might want to send user info instead
                            message: message.payload.message,
                        },
                    };
                    game.broadcastMessage(chatMessage);
                }
            }
        });
    }
}