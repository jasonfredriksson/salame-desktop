
import { useState } from 'react';
import { Heart, Star, MessageSquare, User, Calendar, Truck, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/marketplace';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProductDetailProps {
  product: Product;
  onMakeOffer: () => void;
  onStartChat: () => void;
  onViewProfile?: () => void;
  onBuyNow?: () => void;
}

const ProductDetail = ({ product, onMakeOffer, onStartChat, onViewProfile, onBuyNow }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const isFirstPurchase = true; // This would come from user data in a real app

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{product.category}</Badge>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-1" />
                {product.favorites}
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
              <Badge className="bg-green-100 text-green-800">
                {product.condition}
              </Badge>
            </div>
          </div>

          {/* Product Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Detalles del producto</h3>
              <div className="space-y-2">
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marca:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Talle:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="font-medium">{product.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ubicación:</span>
                  <span className="font-medium">{product.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publicado:</span>
                  <span className="font-medium">{formatDate(product.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Descripción</h3>
              <p className="text-gray-700">{product.description}</p>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Vendedor</h3>
                {onViewProfile && (
                  <Button 
                    variant="link" 
                    onClick={onViewProfile} 
                    className="text-primary p-0 h-auto"
                  >
                    Ver perfil
                  </Button>
                )}
              </div>
              <div 
                className="flex items-center space-x-4 cursor-pointer" 
                onClick={onViewProfile}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={product.seller.avatar} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{product.seller.name}</h4>
                    {product.seller.isVerified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Verificado</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>{product.seller.rating}</span>
                    <span>({product.seller.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    Miembro desde {formatDate(product.seller.joinedDate)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free Shipping Message */}
          {isFirstPurchase && (
            <div className="flex items-center p-3 bg-green-50 text-green-800 rounded-lg">
              <Truck className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium">Envío gratis con tu primera compra</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {onBuyNow && (
              <Button 
                size="lg" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={onBuyNow}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Comprar ahora
              </Button>
            )}
            <Button 
              size="lg" 
              className="w-full salame-gradient text-white"
              onClick={onMakeOffer}
            >
              Hacer Oferta
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full"
              onClick={onStartChat}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contactar Vendedor
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            {product.views} personas vieron este producto
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
