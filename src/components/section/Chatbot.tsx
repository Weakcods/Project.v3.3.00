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

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Handle gatepass-related messages
    const lowerCaseMessage = inputMessage.toLowerCase();
    let botMessageText = '';

    if (lowerCaseMessage.includes('gatepass') || lowerCaseMessage.includes('entry pass') || lowerCaseMessage.includes('authorization')) {
      botMessageText = `
        A Gatepass is a document or digital authorization that allows an individual to enter or leave a restricted area, such as a building, office, or construction site. 
        It usually includes details like the person's name, purpose of visit, entry and exit times, and approval signatures.

        Here are some frequently asked questions about gatepasses:

        1. **How can I get a gatepass?**
           You will need to request a gatepass through your department or security team. Provide details such as your name, visit purpose, and any required documents.

        2. **How long is a gatepass valid for?**
           The validity typically depends on the purpose of your visit. It could range from a few hours to several days, based on the type of access you need.

        3. **What should I do if I lose my gatepass?**
           If you lose your gatepass, immediately report it to security and request a replacement.

        4. **Can a guest get a gatepass?**
           Yes, guests can typically receive a gatepass if invited by an employee. The employee needs to arrange for the guest's access with the security team in advance.

        5. **Do I need approval for a gatepass?**
           Yes, gatepasses generally require approval from the relevant department or security personnel before they are issued.

        🔍 **Need more information?** Feel free to ask about the process, documents required, or how to request one!
      `;
    } else {
      botMessageText = "Thanks for your message! Our team will get back to you soon. You can also ask about our gatepass system or any other topic!";
    }

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: botMessageText,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#24FE41] p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 z-50"
      >
        <MessageSquare className="w-6 h-6 text-gray-900" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#24FE41] p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-900 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-[#24FE41] text-gray-900'}`}
                >
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

          {/* Input Form */}
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
