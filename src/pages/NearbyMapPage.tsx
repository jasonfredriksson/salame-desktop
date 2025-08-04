import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NearbyProductsMap from '@/components/NearbyProductsMap';
import ProductFilters from '@/components/ProductFilters';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Sliders } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const NearbyMapPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    maxDistance: 25
  });
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Apply filters when they change
  useEffect(() => {
    let filtered = mockProducts;
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply distance filter
    filtered = filtered.filter(product => 
      (product.proximityKm || 100) <= filters.maxDistance
    );
    
    setFilteredProducts(filtered);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <MapPin className="mr-2" />
          Productos Cercanos
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <ProductFilters 
              categories={mockCategories} 
              onFilterChange={handleFilterChange} 
            />
            
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Estadísticas de búsqueda</h3>
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Productos encontrados:</span>
                    <span className="font-medium">{filteredProducts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distancia máxima:</span>
                    <span className="font-medium">{filters.maxDistance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categorías:</span>
                    <span className="font-medium">
                      {filters.categories.length ? filters.categories.join(', ') : 'Todas'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-3/4">
            <NearbyProductsMap 
              products={filteredProducts} 
              maxDistance={filters.maxDistance} 
            />
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Mostrando {filteredProducts.length} productos dentro de {filters.maxDistance} km de tu ubicación.</p>
              <p className="mt-1">Haz clic en un marcador para ver detalles del producto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyMapPage;
