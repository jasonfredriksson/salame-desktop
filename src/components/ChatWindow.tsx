
import { useState } from 'react';
import { Send, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Conversation, Message } from '@/types/marketplace';

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
  onBack: () => void;
  onSendMessage: (content: string) => void;
  onMakeOffer: (offerData: { amount: number; message: string }) => void;
}

const ChatWindow = ({ 
  conversation, 
  currentUserId, 
  onBack, 
  onSendMessage, 
  onMakeOffer 
}: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [showOfferInput, setShowOfferInput] = useState(false);

  const otherUser = conversation.participants.find(p => p.id !== currentUserId);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleSendOffer = () => {
    const amount = parseInt(offerAmount);
    if (amount > 0) {
      onMakeOffer({ amount, message: `Te ofrezco $${amount} por este producto.` });
      setOfferAmount('');
      setShowOfferInput(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser?.avatar} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{otherUser?.name}</h3>
            <div className="text-sm text-gray-600">{conversation.product.title}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary">
              {formatPrice(conversation.product.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Card className="m-4">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <img
              src={conversation.product.images[0]}
              alt={conversation.product.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium">{conversation.product.title}</h4>
              <div className="text-sm text-gray-600">{conversation.product.condition}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary">
                {formatPrice(conversation.product.price)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg) => {
          const isSentByMe = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className="flex flex-col w-full mb-2">
              <div className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'} w-full`}>
                {!isSentByMe && (
                  <div className="flex-shrink-0 mr-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={otherUser?.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                    isSentByMe
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.type === 'offer' && msg.offer ? (
                    <div className="space-y-2">
                      <div className="font-medium">Oferta: {formatPrice(msg.offer.amount)}</div>
                      <div className="text-sm opacity-90">
                        Estado: {msg.offer.status === 'pending' ? 'Pendiente' : 
                                msg.offer.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                      </div>
                      {msg.offer.status === 'pending' && msg.senderId !== currentUserId && (
                        <div className="flex space-x-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => onMakeOffer({ amount: msg.offer?.amount || 0, message: 'He aceptado tu oferta.' })}
                          >
                            Aceptar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => console.log('Rejected offer:', msg.offer?.id)}
                          >
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
                
                {isSentByMe && (
                  <div className="flex-shrink-0 ml-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=user1" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
              
              <div
                className={`text-xs text-gray-500 mt-1 px-2 ${
                  isSentByMe ? 'text-right' : 'ml-10'
                }`}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        {showOfferInput && (
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Monto de la oferta"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendOffer} className="salame-gradient text-white">
              Enviar Oferta
            </Button>
            <Button variant="outline" onClick={() => setShowOfferInput(false)}>
              Cancelar
            </Button>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Input
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setShowOfferInput(true)}>
            Oferta
          </Button>
          <Button onClick={handleSendMessage} className="salame-gradient text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
