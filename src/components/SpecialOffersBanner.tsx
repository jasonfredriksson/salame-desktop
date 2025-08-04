import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Product } from '@/types/marketplace';
import { Button } from '@/components/ui/button';

interface SpecialOffersBannerProps {
  title?: string;
  products: Product[];
  onProductClick?: (productId: string) => void;
}

const SpecialOffersBanner = ({
  title = "Ofertas especiales cerca tuyo!",
  products = [],
  onProductClick
}: SpecialOffersBannerProps) => {
  const navigate = useNavigate();
  
  // Filter products that are special offers and sort by proximity
  const specialOffers = products
    .filter(product => product.specialOffer === true)
    .sort((a, b) => (a.proximityKm || 100) - (b.proximityKm || 100));

  if (specialOffers.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg shadow-lg my-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-64 h-64 bg-pink-500 rounded-full opacity-20"></div>
      
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-purple-200">Las mejores ofertas disponibles en tu zona</p>
          </div>
          <Button 
            variant="link" 
            className="text-yellow-300 hover:text-yellow-100 p-0 h-auto flex items-center"
            onClick={() => navigate('/')}
          >
            Ver todas <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialOffers.slice(0, 3).map(product => (
            <div 
              key={product.id}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 border border-white border-opacity-20 cursor-pointer hover:bg-opacity-20 transition"
              onClick={() => onProductClick?.(product.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{product.title}</h3>
                  <div className="flex items-center text-yellow-300 font-semibold mt-1">
                    ${product.price.toLocaleString('es-AR')}
                    {product.originalPrice && (
                      <span className="text-purple-200 text-sm line-through ml-2">
                        ${product.originalPrice.toLocaleString('es-AR')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-purple-200 text-xs mt-1">
                    <MapPin className="h-3 w-3 mr-1" /> 
                    A {product.proximityKm?.toFixed(1)} km - {product.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersBanner;
