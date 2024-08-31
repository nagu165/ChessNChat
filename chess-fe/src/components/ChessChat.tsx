import React, { useEffect, useState } from 'react';

export const ChessChat = ({ socket }: any) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'chat':
                    setMessages((prevMessages) => [...prevMessages, data.payload.message]);
                    break;
                default:
                    console.error('Unknown message type:', data.type);
            }
        };

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return; // Prevent sending empty messages

        const chatMessage = {
            type: 'chat',
            payload: {
                message: inputMessage,
            },
        };
        socket.send(JSON.stringify(chatMessage));
        setInputMessage(''); // Clear the input field after sending
    };

    return (
        <div className="bg-slate-800 p-4 rounded-md mb-4">
            <h2 className="text-lg font-bold mb-2">Chat</h2>
            <ul className="h-40 overflow-y-auto">
                {messages.map((msg, index) => (
                    <li key={index} className="mb-1 text-white">
                        {msg}
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage} className="flex mt-2">
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 bg-slate-700 text-white p-2 rounded-l-md focus:outline-none"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">
                    Send
                </button>
            </form>
        </div>
    );
};