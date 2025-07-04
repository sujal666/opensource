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

export default function AskAIPage() {
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
      .replace(/^#+\s?/gm, '') // Remove headings
      .replace(/`{3,}[\s\S]*?`{3,}/g, '') // Remove code blocks
      .replace(/`([^`]+)`/g, '$1') // Inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links → text
      .replace(/!\[.*?\]\(.*?\)/g, '') // Images
      .trim();
  };

  useEffect(() => {
  const fetchIssueAndChatHistory = async () => {
    if (!user?.id || !issueId) {
      console.log('User or issueId not available yet', { userId: user?.id, issueId });
      setInitialLoading(false); // Make sure we don’t get stuck forever
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

    setInitialLoading(false); // 🔥 This must always be reached
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
    <div className="flex flex-col h-screen bg-black text-white ">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-center">Solve your issues and doubts with AI Assistance</h1>
        {issue && (
          <div className="mt-2">
            <h2 className="text-lg font-semibold">{issue.title}</h2>
            <p className="text-sm text-gray-400 truncate">{issue.body || 'No description'}</p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {initialLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {messages.length === 0 && !loading ? (
              <div className="flex justify-center items-center h-full text-gray-500 text-lg font-medium">
    👋 Welcome! Please ask a question to begin.
  </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'}`}
                  >
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
                                <pre className="bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                                  <code className="text-green-300">{children}</code>
                                </pre>
                              ) : (
                                <code className="bg-gray-800 p-1 rounded text-sm text-green-300">{children}</code>
                              )
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{cleanPromptMarkdown(message.text)}</p>
                    )}
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about this issue..."
            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={loading || !inputMessage.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
