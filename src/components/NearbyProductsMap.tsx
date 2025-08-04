import React, { useState } from 'react';
import { Product } from '@/types/marketplace';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers } from '@/data/mockData';

interface NearbyProductsMapProps {
  products: Product[];
  maxDistance?: number;
}

const NearbyProductsMap: React.FC<NearbyProductsMapProps> = ({ 
  products, 
  maxDistance = 25 // Default max distance in km
}) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  // Filter products by maxDistance if proximityKm is available
  const nearbyProducts = products.filter(
    product => !product.proximityKm || product.proximityKm <= maxDistance
  );
  
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Generate product positions in the visual grid
  const getVisualPosition = (index: number, totalProducts: number) => {
    // Calculate grid position (roughly circular arrangement)
    const gridSize = Math.ceil(Math.sqrt(totalProducts));
    const angle = (index / totalProducts) * 2 * Math.PI;
    const radius = 40 + (index % 3) * 20; // Vary radius to create distance variations
    
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    
    return { x, y };
  };
  
  return (
    <div className="relative bg-slate-50 shadow-inner rounded-xl overflow-hidden" style={{ height: '600px', width: '100%' }}>
      {/* Background map gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
      
      {/* Map "streets" */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-slate-200"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-slate-200"></div>
        <div className="absolute left-1/4 top-0 h-full w-[0.5px] bg-slate-200"></div>
        <div className="absolute left-3/4 top-0 h-full w-[0.5px] bg-slate-200"></div>
        <div className="absolute left-0 top-1/4 w-full h-[0.5px] bg-slate-200"></div>
        <div className="absolute left-0 top-3/4 w-full h-[0.5px] bg-slate-200"></div>
      </div>

      {/* Your location marker (center) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          {/* Pulse animation */}
          <div className="absolute -inset-4 rounded-full bg-blue-500 opacity-20 animate-ping"></div>
          <div className="absolute -inset-8 rounded-full border border-blue-400 opacity-20"></div>
          <div className="p-1 rounded-full bg-blue-600 border-4 border-white shadow-lg">
            <Navigation className="h-5 w-5 text-white" />
          </div>
          <div className="mt-2 px-2 py-1 -ml-6 bg-white text-xs font-medium shadow-md rounded-full">
            Tu ubicación
          </div>
        </div>
      </div>

      {/* Distance radius indicator */}
      <div className="absolute left-1/2 top-1/2 w-[70%] h-[70%] border-2 border-dashed border-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      
      {/* Products */}
      {nearbyProducts.map((product, index) => {
        const position = getVisualPosition(index, nearbyProducts.length);
        const distance = product.proximityKm || Math.floor(Math.random() * maxDistance) + 1;
        
        return (
          <div 
            key={product.id}
            className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selectedProduct === product.id ? 'scale-110' : ''}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onMouseEnter={() => setSelectedProduct(product.id)}
            onMouseLeave={() => setSelectedProduct(null)}
            onClick={() => handleProductClick(product.id)}
          >
            <div className="relative cursor-pointer group">
              {/* Product marker */}
              <div className="bg-white p-1 rounded-full border shadow-md group-hover:border-purple-500 transition-colors duration-200">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Price tag */}
              <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
                ${product.price.toLocaleString('es-AR')}
              </div>
              
              {/* Distance indicator */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> {distance} km
              </div>

              {/* Product info card - visible on hover/selection */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48 transition-opacity duration-300 ${selectedProduct === product.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                <Card className="overflow-hidden">
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h5 className="font-medium text-sm line-clamp-1">{product.title}</h5>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-green-600 font-medium">${product.price.toLocaleString('es-AR')}</span>
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    </div>
                    <div className="flex items-center mt-2">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src={product.seller?.avatar} />
                        <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">{product.seller?.name}</span>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => handleProductClick(product.id)}
                    >
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md opacity-90">
        <h4 className="font-medium text-sm mb-2">Información</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center">
            <div className="p-1 rounded-full bg-blue-600 mr-2">
              <Navigation className="h-3 w-3 text-white" />
            </div>
            <span>Tu ubicación</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-white border border-gray-300 mr-2"></div>
            <span>Producto disponible</span>
          </div>
          <div className="flex items-center">
            <div className="h-[1px] w-8 bg-blue-300 mr-2"></div>
            <span>Radio de {maxDistance} km</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {nearbyProducts.length} productos cercanos
        </div>
      </div>
    </div>
  );
};

export default NearbyProductsMap;
