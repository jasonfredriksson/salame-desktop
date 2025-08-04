
import { User, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Conversation } from '@/types/marketplace';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList = ({ 
  conversations, 
  currentUserId, 
  onSelectConversation 
}: ConversationListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('es-AR');
    }
  };

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherUser = conversation.participants.find(p => p.id !== currentUserId);
        const lastMessage = conversation.lastMessage;
        
        return (
          <Card 
            key={conversation.id} 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onSelectConversation(conversation)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={otherUser?.avatar} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{otherUser?.name}</h3>
                    <div className="flex items-center space-x-2">
                      {!conversation.isRead && (
                        <Badge className="bg-primary text-white">Nuevo</Badge>
                      )}
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(lastMessage.timestamp)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 truncate">
                    {conversation.product.title}
                  </div>
                  
                  <div className="text-sm text-gray-900 truncate mt-1">
                    {lastMessage.type === 'offer' && lastMessage.offer ? (
                      <span className={`font-medium ${lastMessage.offer.status === 'rejected' ? 'text-red-500' : lastMessage.offer.status === 'accepted' ? 'text-green-600' : 'text-primary'}`}>
                        Oferta: {formatPrice(lastMessage.offer.amount)} 
                        {lastMessage.offer.status === 'accepted' && '✓'}
                        {lastMessage.offer.status === 'rejected' && '✗'}
                        {lastMessage.offer.status === 'pending' && '(pendiente)'}
                      </span>
                    ) : (
                      lastMessage.content
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <img
                    src={conversation.product.images[0]}
                    alt={conversation.product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="text-xs font-medium text-primary mt-1">
                    {formatPrice(conversation.product.price)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ConversationList;
