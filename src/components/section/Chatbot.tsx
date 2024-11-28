import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hi! I'm your virtual assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const lowerCaseMessage = inputMessage.toLowerCase();
    let botMessageText = '';

    if (
      lowerCaseMessage.includes('gatepass') ||
      lowerCaseMessage.includes('entry pass') ||
      lowerCaseMessage.includes('authorization')
    ) {
      botMessageText = `
        A Gatepass is a document or digital authorization that allows an individual to enter or leave a restricted area.
        Here are some FAQs:
        - How can I get a gatepass? Request it through your department or security.
        - What should I do if I lose my gatepass? Report it immediately and request a replacement.
        🔍 Need more info? Ask me!
      `;
    } else {
      botMessageText = "Thanks for reaching out! You can ask me about gatepasses or anything else.";
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botMessageText,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const messageContainerClass = `max-w-[80%] p-3 rounded-lg`;
  const botMessageClass = `bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`;
  const userMessageClass = `bg-[#24FE41] text-gray-900`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 bg-[#24FE41] p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 md:bottom-8 md:right-8"
      >
        <MessageSquare className="w-6 h-6 text-gray-900" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden md:bottom-32 md:right-8">
          <div className="bg-[#24FE41] p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-gray-900 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`${messageContainerClass} ${message.isBot ? botMessageClass : userMessageClass}`}>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-[#24FE41]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#24FE41]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="bg-[#24FE41] p-2 rounded-lg hover:bg-[#1ee539] transition-colors"
              >
                <Send className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
