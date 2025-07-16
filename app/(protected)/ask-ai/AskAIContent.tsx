'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AskAIContent() {
  const searchParams = useSearchParams();
  const issueId = searchParams.get('issueId');
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [issue, setIssue] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const cleanPromptMarkdown = (input: string): string => {
    return input
      .replace(/^#+\s?/gm, '')
      .replace(/`{3,}[\s\S]*?`{3,}/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .trim();
  };

  useEffect(() => {
    const fetchIssueAndChatHistory = async () => {
      if (!user?.id || !issueId) {
        console.log('User or issueId not available yet', { userId: user?.id, issueId });
        setInitialLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'users', user.id, 'savedIssues', issueId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const issueData = docSnap.data();
          setIssue(issueData);

          if (!issueData.chatHistory || issueData.chatHistory.length === 0) {
            const initialPrompt = `Explain this GitHub issue:\n\nTitle: ${issueData.title}\n\nDescription: ${issueData.body || 'No description'}\n\nWhat should I do to resolve this?`;
            await askGemini(initialPrompt);
          } else {
            const chatHistory = issueData.chatHistory.map((chat: any) => [
              {
                id: crypto.randomUUID(),
                text: chat.prompt,
                sender: 'user' as const,
                timestamp: new Date(chat.timestamp)
              },
              {
                id: crypto.randomUUID(),
                text: chat.response,
                sender: 'ai' as const,
                timestamp: new Date(chat.timestamp)
              }
            ]).flat();
            setMessages(chatHistory);
          }
        } else {
          console.warn('Issue not found in Firestore for ID:', issueId);
        }
      } catch (error) {
        console.error('Failed to fetch issue or chat history:', error);
      }

      setInitialLoading(false);
    };

    fetchIssueAndChatHistory();
  }, [user, issueId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const askGemini = async (prompt: string) => {
    try {
      setLoading(true);

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: prompt.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      const existingChatHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
        .reduce((acc: any[], msg, index, array) => {
          if (msg.sender === 'user') {
            const aiResponse = array[index + 1];
            if (aiResponse && aiResponse.sender === 'ai') {
              acc.push({
                prompt: msg.text,
                response: aiResponse.text,
                timestamp: msg.timestamp.toISOString()
              });
            }
          }
          return acc;
        }, []);

      const response = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          userId: user?.id,
          issueId,
          chatHistory: existingChatHistory
        }),
      });

      const result = await response.json();

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: result.text,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error asking Gemini:", error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !loading) {
      askGemini(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen  text-white font-sans">
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-center">AI Assistant</h1>
        {issue && (
          <div className="mt-2 text-center">
            <h2 className="text-md font-semibold text-gray-700">Issue: {issue.title}</h2>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {initialLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {messages.length === 0 && !loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-gray-600">
                  <p className="text-lg font-medium">👋 Welcome!</p>
                  <p>Ask me anything about the issue.</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">AI</div>
                  )}
                  <div
                    className={`max-w-3/4 rounded-xl px-4 py-3 ${message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    {message.sender === 'ai' ? (
                      <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            img: ({ node, ...props }) => (
                              <img {...props} className="rounded-md my-2 max-w-full" alt="AI image" />
                            ),
                            a: ({ node, ...props }) => (
                              <a {...props} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer" />
                            ),
                            code: ({ node, inline, className, children, ...props }) =>
                              !inline ? (
                                <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm font-mono">
                                  <code className="text-green-300">{children}</code>
                                </pre>
                              ) : (
                                <code className="bg-gray-100 px-1 py-0.5 rounded-sm text-sm text-green-300 font-mono">{children}</code>
                              )
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{cleanPromptMarkdown(message.text)}</p>
                    )}
                    <p className="text-xs mt-2 opacity-60 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">You</div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </main>

      <footer className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-gray-100 rounded-full px-5 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-12 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 active:scale-95 flex items-center justify-center"
            disabled={loading || !inputMessage.trim()}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </form>
      </footer>
    </div>
  );
}