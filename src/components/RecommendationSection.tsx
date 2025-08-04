import { Product } from '@/types/marketplace';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface RecommendationSectionProps {
  title: string;
  description?: string;
  products: Product[];
  onProductClick: (productId: string) => void;
  variant?: 'default' | 'highlight' | 'simple' | 'gradient';
  onViewAllClick?: () => void;
}

const RecommendationSection = ({ 
  title, 
  description, 
  products, 
  onProductClick,
  variant = 'default',
  onViewAllClick
}: RecommendationSectionProps) => {
  // Get section style based on variant
  const getSectionStyle = () => {
    switch (variant) {
      case 'gradient':
        return 'relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg shadow-lg py-6 px-6 sm:px-8';
      case 'highlight':
        return 'bg-purple-50 py-8 rounded-xl px-6';
      case 'simple':
        return '';
      default:
        return '';
    }
  };
  
  // Get text colors based on variant
  const getTitleClass = () => {
    return variant === 'gradient' ? 'text-white' : 'text-gray-900';
  };
  
  const getDescriptionClass = () => {
    return variant === 'gradient' ? 'text-purple-200' : 'text-gray-600';
  };
  
  return (
    <section className={`mb-12 ${getSectionStyle()}`}>
      {variant === 'gradient' && (
        <>
          {/* Decorative elements for gradient variant */}
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-64 h-64 bg-pink-500 rounded-full opacity-20"></div>
        </>
      )}
      
      <div className="relative mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${getTitleClass()}`}>{title}</h2>
          {description && <p className={`mt-1 ${getDescriptionClass()}`}>{description}</p>}
        </div>
        
        {onViewAllClick && (
          <Button 
            variant="link" 
            className={variant === 'gradient' ? "text-yellow-300 hover:text-yellow-100 p-0 h-auto flex items-center" : "text-primary p-0 h-auto flex items-center"}
            onClick={onViewAllClick}
          >
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card 
            key={product.id}
            className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => onProductClick(product.id)}
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product.specialOffer && (
                <Badge className="absolute top-2 right-2 bg-red-500">Oferta</Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">{product.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{product.location}</span>
                {product.proximityKm && (
                  <span className="text-xs text-gray-500">
                    {product.proximityKm} km
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendationSection;
