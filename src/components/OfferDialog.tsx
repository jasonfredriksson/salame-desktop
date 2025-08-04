import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/marketplace';

interface OfferDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitOffer: (offerData: { amount: number; message: string }) => void;
  minOfferPrice?: number;
  autoResponseEnabled?: boolean;
}

const OfferDialog = ({ product, open, onOpenChange, onSubmitOffer, minOfferPrice, autoResponseEnabled }: OfferDialogProps) => {
  const minOfferAmount = minOfferPrice !== undefined ? minOfferPrice : Math.round(product.price * 0.7); // Min offer is 70% of price
  const [offerAmount, setOfferAmount] = useState(minOfferAmount);
  const [offerMessage, setOfferMessage] = useState('');
  const [error, setError] = useState('');
  const [showAutoResponse, setShowAutoResponse] = useState(false);
  const [autoResponseMessage, setAutoResponseMessage] = useState('');

  const handleSubmit = () => {
    if (offerAmount < minOfferAmount) {
      setError(`La oferta mínima es de $${formatPrice(minOfferAmount)}`);
      return;
    }
    
    if (offerAmount >= product.price) {
      setError(`La oferta debe ser menor al precio original de $${formatPrice(product.price)}`);
      return;
    }
    
    // Check if auto-response is enabled and offer is below minimum price
    if (autoResponseEnabled && minOfferPrice !== undefined && offerAmount < minOfferPrice) {
      setShowAutoResponse(true);
      setAutoResponseMessage('Lo sentimos, tu oferta está por debajo del mínimo aceptable para este producto.');
      return;
    }
    
    onSubmitOffer({ amount: offerAmount, message: offerMessage });
    onOpenChange(false);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/\D/g, ''), 10);
    setOfferAmount(isNaN(value) ? 0 : value);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hacer una oferta</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 mt-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h4 className="font-medium">{product.title}</h4>
            <p className="text-sm text-gray-500">Precio: ${formatPrice(product.price)}</p>
          </div>
        </div>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="offerAmount">Tu oferta</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="offerAmount"
                type="text"
                value={formatPrice(offerAmount)}
                onChange={handleInputChange}
                className="pl-8"
              />
            </div>
            
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-2">
              Oferta mínima: ${formatPrice(minOfferAmount)}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerMessage">Mensaje (opcional)</Label>
            <textarea
              id="offerMessage"
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              placeholder="Escribe un mensaje para el vendedor..."
              className="w-full min-h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          
          {showAutoResponse && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <p className="font-medium text-amber-700 mb-1">Respuesta automática del vendedor:</p>
              <p className="text-sm text-amber-800">{autoResponseMessage}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
            Enviar oferta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
