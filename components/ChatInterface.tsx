import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { getAIResponse } from '../lib/gemini';
import { Button } from './Button';
import { Input } from './Input';
import { Avatar } from './Avatar';
import { ScrollArea } from './ScrollArea';
import { useAuth } from '../hooks/useAuth';
import { Send, Bot, User, Loader2, Lock } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender_type: 'user' | 'ai';
    created_at: string;
    user_id?: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { user } = useAuth();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch initial history for current user
    useEffect(() => {
        if (!user) return;

        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching chat history:', error);
            } else if (data) {
                setMessages(data);
            }
        };

        fetchHistory();
    }, [user]);

    // Set up Realtime subscription for current user's messages
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel(`user-messages-${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `user_id=eq.${user.id}`
                },
                (payload) => {
                    const newMessage = payload.new as Message;
                    setMessages((prev) => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, newMessage];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessageContent = inputValue.trim();
        setInputValue('');

        // 1. Insert User Message
        const { data: userData, error: userError } = await supabase
            .from('messages')
            .insert([
                {
                    content: userMessageContent,
                    sender_type: 'user',
                    user_id: user?.id
                }
            ])
            .select();

        if (userError) {
            console.error('Error sending message:', userError);
            return;
        }

        // 2. Trigger AI Processing
        setIsTyping(true);
        console.log("Starting AI interaction for message:", userMessageContent);

        try {
            const aiResponse = await getAIResponse(userMessageContent);
            console.log("AI execution complete. Response length:", aiResponse.length);

            // 3. Insert AI Answer
            const { error: aiError } = await supabase
                .from('messages')
                .insert([
                    {
                        content: aiResponse,
                        sender_type: 'ai',
                        user_id: user?.id
                    }
                ]);

            if (aiError) {
                console.error('Supabase error saving AI response:', aiError);
            }
        } catch (err: any) {
            console.error('Critical failure in AI processing flow:', err);
            // Optionally insert an error message for the user to see in chat
            await supabase.from('messages').insert([{
                content: `Xin lỗi, hệ thống gặp lỗi: ${err.message || 'Không thể kết nối với AI'}. Vui lòng kiểm tra Console (F12) để biết chi tiết.`,
                sender_type: 'ai',
                user_id: user?.id
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] w-full max-w-2xl mx-auto border border-dashed border-slate-300 rounded-xl bg-slate-50 mt-8 gap-4 px-6 text-center">
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    <Lock size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Yêu cầu đăng nhập</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Vui lòng đăng nhập để bắt đầu trò chuyện với trợ lý AI và xem lịch sử tin nhắn của bạn.
                    </p>
                </div>
                <Button onClick={() => window.location.hash = '#/login'} variant="primary">
                    Đăng nhập ngay
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden mt-8">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                <Avatar
                    fallback={<Bot size={18} />}
                    className="bg-slate-900 text-white h-9 w-9"
                />
                <div>
                    <h2 className="font-semibold text-slate-800 leading-tight">Trợ lý Nexus AI</h2>
                    <p className="text-[10px] text-green-600 font-medium flex items-center gap-1 mt-0.5 uppercase tracking-wider">
                        <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></span>
                        Trực tuyến
                    </p>
                </div>
            </div>

            {/* Chat Area - Using ScrollArea component */}
            <ScrollArea className="flex-grow">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.sender_type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <Avatar
                            fallback={message.sender_type === 'user' ? <User size={18} /> : <Bot size={18} />}
                            className={`h-8 w-8 ${message.sender_type === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}
                        />

                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${message.sender_type === 'user'
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-slate-100 text-slate-800 rounded-tl-none'
                            }`}>
                            {message.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-3">
                        <Avatar fallback={<Bot size={18} />} className="bg-slate-100 text-slate-600 h-8 w-8" />
                        <div className="bg-slate-100 text-slate-500 p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-2 shadow-sm">
                            <Loader2 size={14} className="animate-spin" />
                            AI đang trả lời...
                        </div>
                    </div>
                )}
            </ScrollArea>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white">
                <div className="flex gap-2">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Hỏi về sản phẩm..."
                        disabled={isTyping}
                        className="flex-grow border-slate-200 focus:ring-indigo-500"
                    />
                    <Button type="submit" disabled={isTyping || !inputValue.trim()} size="icon" className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </div>
    );
};
