import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Chat } from '../types';

export const DashboardPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    api.get('/api/chat/history').then((res) => setChats(res.data.chats));
  }, []);

  return (
    <section className="card">
      <h2>Your chat history</h2>
      {chats.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat._id}>
              <strong>{chat.title}</strong> ({chat.messages.length} messages)
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
