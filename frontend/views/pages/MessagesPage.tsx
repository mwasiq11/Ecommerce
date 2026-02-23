
import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../../constants';
import Button from '../../components/ui/Button';

const MessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [inputText, setInputText] = useState('');

  return (
    <main className="container mx-auto px-4 py-8 h-[calc(100vh-180px)] min-h-[600px]">
      <div className="bg-white border border-border-color rounded-lg shadow-sm h-full flex overflow-hidden">
        {/* Contacts Sidebar */}
        <aside className="w-1/3 border-r border-border-color flex flex-col">
          <div className="p-4 border-b border-border-color">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input type="text" placeholder="Search chats" className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-md outline-none text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { name: 'Support Team', last: 'How can we help you?', time: '10:32 AM', avatar: 'https://i.pravatar.cc/150?u=support', online: true },
              { name: 'Electronics Store', last: 'The item is back in stock', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=tech', online: false },
              { name: 'Fashion Hub', last: 'Your refund was processed', time: '2 days ago', avatar: 'https://i.pravatar.cc/150?u=fashion', online: false }
            ].map((contact, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveChat(idx)}
                className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition border-b border-gray-50 ${activeChat === idx ? 'bg-blue-50' : ''}`}
              >
                <div className="relative">
                  <img src={contact.avatar} className="w-12 h-12 rounded-full" alt="" />
                  {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm truncate">{contact.name}</h4>
                    <span className="text-[10px] text-gray-400 uppercase">{contact.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.last}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className="flex-1 flex flex-col bg-gray-50/30">
          <div className="p-4 bg-white border-b border-border-color flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=support" className="w-10 h-10 rounded-full" alt="" />
              <div>
                <h3 className="font-bold">Support Team</h3>
                <p className="text-xs text-success font-medium">Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Archive</Button>
              <Button variant="outline" size="sm" className="text-danger border-danger">Report</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
            {MOCK_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[70%] ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                  {!msg.isMine && <img src={msg.avatar} className="w-8 h-8 rounded-full self-end" alt="" />}
                  <div>
                    <div className={`p-4 rounded-2xl text-sm ${
                      msg.isMine ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-border-color rounded-tl-none text-gray-800'
                    }`}>
                      {msg.text}
                    </div>
                    <p className={`text-[10px] text-gray-400 mt-1 ${msg.isMine ? 'text-right' : ''}`}>{msg.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-border-color">
            <div className="flex gap-4">
              <button className="p-2 text-gray-400 hover:text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-primary" 
              />
              <Button onClick={() => setInputText('')} disabled={!inputText.trim()}>Send</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MessagesPage;
