import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, SlidersHorizontal } from 'lucide-react';
import { Category } from '@/types/marketplace';

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange: (filters: {
    categories: string[];
    maxDistance: number;
  }) => void;
}

const ProductFilters = ({
  categories,
  onFilterChange
}: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState<number>(25);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(c => c !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };
  
  const handleDistanceChange = (value: number[]) => {
    setMaxDistance(value[0]);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxDistance(25);
    onFilterChange({ categories: [], maxDistance: 25 });
  };
  
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      maxDistance: maxDistance
    });
    
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
        <Button 
          variant="outline" 
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtros
          {selectedCategories.length > 0 && (
            <span className="ml-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {selectedCategories.length}
            </span>
          )}
        </Button>
      </div>
      
      <div className={`bg-white rounded-lg shadow p-4 transition-all ${isOpen || 'hidden md:block'}`}>
        {/* Distance Filter */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">Distancia máxima</h3>
            <span className="text-sm text-gray-600">{maxDistance} km</span>
          </div>
          <Slider
            value={[maxDistance]}
            min={1}
            max={50}
            step={1}
            onValueChange={handleDistanceChange}
            className="py-4"
          />
        </div>
        
        {/* Category Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                className={`cursor-pointer text-sm py-2 px-3 ${
                  selectedCategories.includes(category.name) 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
                {selectedCategories.includes(category.name) && (
                  <Check className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
          <Button 
            variant="ghost"
            onClick={clearFilters}
            disabled={selectedCategories.length === 0 && maxDistance === 25}
            className="text-gray-500"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
          <Button 
            onClick={applyFilters}
          >
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
