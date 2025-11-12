import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ChatNormativa = () => {
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hello! I'm your virtual assistant for internal regulations. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const { toast } = useToast();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage = { from: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        toast({
            title: "🚧 Virtual Assistant is learning!",
            description: "This feature is not fully implemented yet. The assistant will be able to answer your questions soon.",
        });
    };

    return (
        <div className="bg-white rounded-2xl soft-shadow border border-gray-100 flex flex-col h-[600px]">
            <div className="p-4 border-b flex items-center bg-gray-50/50 rounded-t-2xl">
                <Bot className="h-7 w-7 text-brand-primary-blue mr-3" />
                <h3 className="text-xl font-bold text-brand-deep-indigo">Internal Regulations Chat</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.from === 'bot' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-brand-primary-blue text-white"><Bot size={18} /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.from === 'user' ? 'bg-brand-primary-blue text-white rounded-br-none' : 'bg-gray-100 text-brand-charcoal rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-2xl">
                <div className="relative">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about regulations..."
                        className="pr-12"
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatNormativa;