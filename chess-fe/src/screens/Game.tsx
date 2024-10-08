import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { ChessChat } from "../components/ChessChat";
import { Link } from "react-router-dom";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log("Game initialized");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    setChess(chess);
                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        };
    }, [socket, chess]);

    if (!socket) return <div>Connecting...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-slate-950 p-4">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/Logo.jpeg" alt="Chess Logo" className="h-24 w-24 mr-2" />
                    </Link>
                </div>
            </header>
            <div className="flex justify-center flex-grow">
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
                        <div className="col-span-4 w-full flex justify-center">
                            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
                        </div>
                        <div className="col-span-2 bg-slate-900 p-4 flex flex-col justify-between rounded-lg shadow-lg h-full">
                            <ChessChat socket={socket} />
                            {!started && (
                                <Button onClick={() => {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME,
                                    }));
                                }}>
                                    Play
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};