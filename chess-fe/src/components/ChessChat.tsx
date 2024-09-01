import React, { useEffect, useState } from 'react';

interface ChatMessage {
    sender: string;
    message: string;
}

export const ChessChat = ({ socket }: { socket: WebSocket }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat') {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: data.payload.sender, message: data.payload.message }
                ]);
            }
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const chatMessage = {
            type: 'chat',
            payload: {
                message: inputMessage,
            },
        };
        socket.send(JSON.stringify(chatMessage));
        setInputMessage('');
    };

    return (
        <div className="bg-slate-800 p-6 rounded-md mb-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2 text-white text-center">Chat</h2>
            <ul className="h-64 overflow-y-auto mb-4 border border-slate-600 rounded-md p-2">
                {messages.map((msg, index) => (
                    <li key={index} className="mb-1 text-white">
                        <strong>{msg.sender}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage} className="flex">
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 bg-slate-700 text-white p-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-md">
                    Send
                </button>
            </form>
        </div>
    );
};