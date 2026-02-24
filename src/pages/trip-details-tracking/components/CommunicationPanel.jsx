import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationPanel = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('driver');

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage, activeTab);
      setNewMessage('');
    }
  };

  const getMessageIcon = (type) => {
    const icons = {
      'driver': 'User',
      'customer': 'Building2',
      'internal': 'Users'
    };
    return icons?.[type] || 'MessageSquare';
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 h-full flex flex-col">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-3">Communication</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('driver')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'driver' ?'bg-blue-600 text-white' :'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Driver Messages
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'customer' ?'bg-blue-600 text-white' :'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Customer Updates
          </button>
          <button
            onClick={() => setActiveTab('internal')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'internal' ?'bg-blue-600 text-white' :'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Internal Notes
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages?.filter((msg) => msg?.type === activeTab)?.map((message) => (
            <div
              key={message?.id}
              className={`flex gap-3 ${
                message?.sender === 'You' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <Icon name={getMessageIcon(message?.type)} size="1rem" className="text-slate-600" />
              </div>
              <div
                className={`flex-1 max-w-[80%] ${
                  message?.sender === 'You' ? 'text-right' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-900">
                    {message?.sender}
                  </span>
                  <span className="text-xs text-slate-500">
                    {message?.timestamp}
                  </span>
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message?.sender === 'You' ?'bg-blue-600 text-white' :'bg-slate-100 text-slate-900'
                  }`}
                >
                  <p className="text-sm">{message?.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={`Message ${activeTab}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="default"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={!newMessage?.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;