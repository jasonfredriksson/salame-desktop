
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import ProductDetail from '@/components/ProductDetail';
import ChatWindow from '@/components/ChatWindow';
import OfferDialog from '@/components/OfferDialog';
import CheckoutDialog from '@/components/CheckoutDialog';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, mockConversations } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  
  // Find product by ID from URL params, default to first product if not found
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  
  // Find conversation related to this product or use the first one
  const conversation = mockConversations.find(c => c.product.id === product.id) || mockConversations[0];
  
  // Current user is different from product seller
  const currentUserId = '1'; // This is the buyer in our mock

  const handleMakeOffer = () => {
    setShowOfferDialog(true);
  };

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleSendMessage = (content: string) => {
    console.log('Sending message:', content);
    toast({
      title: 'Mensaje enviado',
      description: 'Tu mensaje ha sido enviado al vendedor.',
    });
    // In a real app, would send to API and update conversation state
  };

  const handleSendOffer = (offerData: { amount: number; message: string }) => {
    console.log('Sending offer:', offerData);
    toast({
      title: 'Oferta enviada',
      description: `Has enviado una oferta de $${offerData.amount.toLocaleString('es-AR')} al vendedor.`,
    });
    // Close chat after delay to simulate acceptance
    setTimeout(() => {
      setShowChat(false);
    }, 1500);
  };
  
  const handleCloseOfferDialog = () => {
    setShowOfferDialog(false);
  };
  
  const handleBuyNow = () => {
    setShowCheckoutDialog(true);
  };
  
  const handleCheckoutComplete = () => {
    setShowCheckoutDialog(false);
    toast({
      title: 'Compra exitosa',
      description: 'Tu compra ha sido procesada correctamente.',
      variant: 'default',
      className: 'bg-green-50 border-green-200 text-green-800',
    });
    // In a real app, we would navigate to a confirmation page or orders history
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  const handleViewProfile = () => {
    navigate(`/profile/${product.seller.id}`);
  };

  if (showChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1">
          <ChatWindow
            conversation={conversation}
            currentUserId={currentUserId}
            onBack={() => setShowChat(false)}
            onSendMessage={handleSendMessage}
            onMakeOffer={handleSendOffer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>
      <ProductDetail
        product={product}
        onMakeOffer={handleMakeOffer}
        onStartChat={handleStartChat}
        onViewProfile={handleViewProfile}
        onBuyNow={handleBuyNow}
      />
      
      {/* Offer Dialog */}
      <OfferDialog 
        product={product}
        open={showOfferDialog}
        onOpenChange={setShowOfferDialog}
        onSubmitOffer={handleSendOffer}
        autoResponseEnabled={true}
        minOfferPrice={Math.round(product.price * 0.8)}
      />
      
      {/* Checkout Dialog */}
      <CheckoutDialog
        product={product}
        isOpen={showCheckoutDialog}
        onClose={() => setShowCheckoutDialog(false)}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
};

export default ProductDetailPage;
