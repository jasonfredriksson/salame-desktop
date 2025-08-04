import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Truck } from 'lucide-react';
import { Product } from '@/types/marketplace';

interface CheckoutDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CheckoutDialog = ({ product, isOpen, onClose, onComplete }: CheckoutDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState('salamePay');
  const [shippingMethod, setShippingMethod] = useState('dhl');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 1500);
  };

  const isFirstPurchase = true; // This would come from user data in a real app

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar compra</DialogTitle>
          <DialogDescription>
            Selecciona tu método de pago y envío
          </DialogDescription>
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
        
        <Separator className="my-4" />
        
        <div className="space-y-6">
          {/* Payment Method */}
          <div>
            <h3 className="text-sm font-medium mb-3">Método de pago</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="salamePay" id="salamePay" />
                <Label htmlFor="salamePay" className="flex items-center">
                  <div className="bg-purple-600 text-white p-1 rounded mr-2">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Salame Pay</span>
                  <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Recomendado</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creditCard" id="creditCard" />
                <Label htmlFor="creditCard">Tarjeta de crédito</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Shipping Method */}
          <div>
            <h3 className="text-sm font-medium mb-3">Método de envío</h3>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dhl" id="dhl" />
                <Label htmlFor="dhl" className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>DHL Express</span>
                  {isFirstPurchase && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Envío gratis con tu primera compra
                    </span>
                  )}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="local" id="local" />
                <Label htmlFor="local">Retiro en persona</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Order Summary */}
          <Card className="p-4">
            <h3 className="font-medium mb-2">Resumen de la compra</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Producto:</span>
                <span>${formatPrice(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span>{isFirstPurchase ? 'Gratis' : '$1,200'}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${formatPrice(isFirstPurchase ? product.price : product.price + 1200)}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-purple-600 hover:bg-purple-700" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar compra'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
