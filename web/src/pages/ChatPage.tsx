import { useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';

interface LocalMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatPage = () => {
  const [chatId, setChatId] = useState<string | undefined>();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = prompt.trim();
    if (!text) return;

    setPrompt('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await api.post('/api/chat/message', { prompt: text, chatId });
      setChatId(res.data.chatId);
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>AI Chat</h2>
      <div className="chat-box">
        {messages.map((message, index) => (
          <p key={`${message.role}-${index}`} className={message.role}>
            <strong>{message.role === 'user' ? 'You' : 'Mahin'}:</strong> {message.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything..." />
        <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
      </form>
    </section>
  );
};
