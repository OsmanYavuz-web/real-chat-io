import React, { useState, useEffect, FormEvent, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { PaperAirplaneIcon, UserCircleIcon, UsersIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

interface Message {
  username: string;
  message: string;
  type?: 'user' | 'system';
  createdAt?: string;
}

interface User {
  username: string;
  lastActive: string;
  connectedAt: string;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(true);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeSocket = useCallback(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      transports: ['websocket']
    });

    newSocket.on('connect', () => {
      console.log('Socket bağlandı');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket bağlantısı kesildi');
      setMessages([]);
      setTypingUsers([]);
    });

    newSocket.on('chat message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    newSocket.on('user joined', (joinedUsername: string) => {
      setActiveUsers(prev => {
        const existingUser = prev.find(u => u.username === joinedUsername);
        if (existingUser) {
          return prev;
        }
        return [...prev, {
          username: joinedUsername,
          lastActive: new Date().toISOString(),
          connectedAt: new Date().toISOString()
        }];
      });
    });

    newSocket.on('user left', (leftUsername: string) => {
      setActiveUsers(prev => prev.filter(user => user.username !== leftUsername));
    });

    newSocket.on('active users', (users: User[]) => {
      setActiveUsers(users);
    });

    newSocket.on('user typing', (typingUsername: string) => {
      if (typingUsername !== username) {
        setTypingUsers(prev => {
          if (prev.includes(typingUsername)) return prev;
          return [...prev, typingUsername];
        });
      }
    });

    newSocket.on('user stop typing', (typingUsername: string) => {
      setTypingUsers(prev => prev.filter(u => u !== typingUsername));
    });

    setSocket(newSocket);
    return newSocket;
  }, [username]);

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (trimmedUsername && trimmedUsername.length >= Number(import.meta.env.VITE_MIN_USERNAME_LENGTH)) {
      sessionStorage.setItem('username', trimmedUsername);
      const newSocket = initializeSocket();
      newSocket.emit('user joined', trimmedUsername);
      setIsUsernameModalOpen(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.close();
      }
    };
  }, [socket]);

  const handleTyping = useCallback(() => {
    if (socket && username) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.emit('user typing', username);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('user stop typing', username);
      }, 1000);
    }
  }, [socket, username]);

  const handleLeaveChat = useCallback(() => {
    if (socket && username) {
      socket.emit('user left', username);
      socket.disconnect();
      sessionStorage.removeItem('username');
      setUsername('');
      setMessages([]);
      setActiveUsers([]);
      setTypingUsers([]);
      setIsUsernameModalOpen(true);
    }
  }, [socket, username]);

  const handleMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedMessage = messageInput.trim();
    if (trimmedMessage && socket && username) {
      socket.emit('chat message', {
        username,
        message: trimmedMessage
      });
      setMessageInput('');
    }
  };

  if (!username || isUsernameModalOpen) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {import.meta.env.VITE_APP_NAME}
          </h2>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kullanıcı Adı
              </label>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="w-6 h-6 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const trimmedUsername = username.trim();
                      if (trimmedUsername && trimmedUsername.length >= Number(import.meta.env.VITE_MIN_USERNAME_LENGTH) && socket) {
                        handleUsernameSubmit(e as any);
                      }
                    }
                  }}
                  placeholder="Kullanıcı adınızı girin..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  minLength={Number(import.meta.env.VITE_MIN_USERNAME_LENGTH)}
                  maxLength={Number(import.meta.env.VITE_MAX_USERNAME_LENGTH)}
                  autoComplete="off"
                />
              </div>
              {username.trim().length > 0 && username.trim().length < Number(import.meta.env.VITE_MIN_USERNAME_LENGTH) && (
                <p className="mt-1 text-sm text-red-500">
                  Kullanıcı adı en az {import.meta.env.VITE_MIN_USERNAME_LENGTH} karakter olmalıdır
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={username.trim().length < Number(import.meta.env.VITE_MIN_USERNAME_LENGTH)}
              className="w-full px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sohbete Katıl
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex-1 flex flex-col overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{import.meta.env.VITE_APP_NAME}</span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>({activeUsers.length} aktif)</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <UserCircleIcon className="w-4 h-4" />
                  {username}
                </span>
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsUserListOpen(!isUserListOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                title="Kullanıcı Listesi"
              >
                <UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={handleLeaveChat}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-red-500 hover:text-red-600"
                title="Sohbetten Ayrıl"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex min-h-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`animate-slide-in ${
                    msg.type === 'system'
                      ? 'flex justify-center'
                      : msg.username === username
                      ? 'flex justify-end'
                      : 'flex justify-start'
                  }`}
                >
                  {msg.type === 'system' ? (
                    <div className="flex items-center justify-center space-x-2 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 py-1 px-4 rounded-full text-xs animate-fade-in">
                      <div className="w-16 h-[1px] bg-gray-300 dark:bg-gray-600" />
                      <span>{msg.message}</span>
                      <div className="w-16 h-[1px] bg-gray-300 dark:bg-gray-600" />
                    </div>
                  ) : (
                    <div className="flex flex-col max-w-[70%] space-y-1">
                      {msg.username !== username && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {msg.username}
                        </span>
                      )}
                      <div className="flex items-end gap-2">
                        <div
                          className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                            msg.username === username
                              ? 'bg-primary text-white rounded-br-none'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                        </div>
                        {msg.createdAt && (
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 min-w-[40px] flex-shrink-0">
                            {new Date(msg.createdAt).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 animate-pulse">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>{typingUsers.join(', ')} yazıyor</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {isUserListOpen && (
              <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto animate-slide-in">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Kullanıcılar
                </h2>
                <div className="space-y-2">
                  {activeUsers.map((user) => (
                    <div
                      key={user.username}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full bg-green-500"
                          title="Çevrimiçi"
                        />
                        <span className="text-gray-900 dark:text-white">
                          {user.username === username ? 'Sen' : user.username}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0 z-10">
            <form onSubmit={handleMessageSubmit} className="p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 