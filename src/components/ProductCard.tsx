
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types/marketplace';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="salame-hover cursor-pointer group overflow-hidden" onClick={onClick}>
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite toggle
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
        {product.originalPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {product.condition}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span>{product.seller.rating}</span>
            <span className="mx-1">•</span>
            <span>{product.location}</span>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          {product.views} vistas • {product.favorites} favoritos
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
