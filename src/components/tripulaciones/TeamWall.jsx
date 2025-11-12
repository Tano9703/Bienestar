import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockUsers = {
  currentUser: { name: 'Tú', avatarSeed: 'you' },
  user2: { name: 'Ana', avatarSeed: 'ana' },
  user3: { name: 'Carlos', avatarSeed: 'carlos' },
};

const TeamWall = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    try {
        const savedMessages = JSON.parse(localStorage.getItem('teamWallMessages') || '[]');
        if (Array.isArray(savedMessages)) {
            setMessages(savedMessages);
        } else {
            setMessages([]);
        }
    } catch (e) {
        setMessages([]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      userId: 'currentUser',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('teamWallMessages', JSON.stringify(updatedMessages));
    setNewMessage('');
    
    setTimeout(() => {
        const botUsers = ['user2', 'user3'];
        const randomUserKey = botUsers[Math.floor(Math.random() * botUsers.length)];
        const randomUser = mockUsers[randomUserKey];
        const botMessage = {
            id: Date.now() + 1,
            userId: randomUserKey,
            text: `¡Buena idea, ${mockUsers.currentUser.name}! Lo reviso y te comento.`,
            timestamp: new Date().toISOString(),
        };
        const finalMessages = [...updatedMessages, botMessage];
        setMessages(finalMessages);
        localStorage.setItem('teamWallMessages', JSON.stringify(finalMessages));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[500px] bg-background rounded-lg border">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => {
            const user = msg.userId ? mockUsers[msg.userId] : { name: '?', avatarSeed: 'unknown' };
            const isCurrentUser = msg.userId === 'currentUser';
            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${isCurrentUser ? 'justify-end' : ''}`}
              >
                {!isCurrentUser && (
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/jsx?seed=${user.avatarSeed}`} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-xs md:max-w-md p-3 rounded-xl ${isCurrentUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                    {!isCurrentUser && <p className="text-xs font-semibold mb-1 text-primary">{user.name}</p>}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {isCurrentUser && (
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/jsx?seed=${user.avatarSeed}`} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-background/95 sticky bottom-0">
        <div className="flex items-center gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-grow resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamWall;