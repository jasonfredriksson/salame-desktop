
import { useState } from 'react';
import Header from '@/components/Header';
import ConversationList from '@/components/ConversationList';
import ChatWindow from '@/components/ChatWindow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { mockConversations } from '@/data/mockData';
import { Conversation } from '@/types/marketplace';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState(mockConversations);
  const currentUserId = '1'; // Mock current user

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    // In real app, send to API and update conversation
  };

  const handleMakeOffer = (amount: number) => {
    console.log('Making offer:', amount);
    // In real app, send offer to API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Mensajes
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <ConversationList
                  conversations={conversations}
                  currentUserId={currentUserId}
                  onSelectConversation={handleSelectConversation}
                />
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="h-full">
                <ChatWindow
                  conversation={selectedConversation}
                  currentUserId={currentUserId}
                  onBack={() => setSelectedConversation(null)}
                  onSendMessage={handleSendMessage}
                  onMakeOffer={handleMakeOffer}
                />
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Selecciona una conversación</h3>
                    <p>Elige una conversación de la lista para comenzar a chatear</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
