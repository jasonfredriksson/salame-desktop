
import { mockCategories } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const CategoryGrid = () => {
  const navigate = useNavigate();
  
  // Function to get color based on category
  const getCategoryColor = (name: string) => {
    const colorMap: {[key: string]: string} = {
      'Ropa': 'text-blue-500',
      'Tecnología': 'text-purple-500',
      'Hogar': 'text-green-500',
      'Deportes': 'text-orange-500',
      'Libros': 'text-red-500',
      'Automóviles': 'text-gray-700',
      'Electro': 'text-cyan-500',
      'Juguetes': 'text-pink-500',
      'Instrumentos Musicales': 'text-amber-500',
      'Jardinería': 'text-lime-500',
      'Mascotas': 'text-indigo-500',
      'Salud y Belleza': 'text-rose-500'
    };
    
    return colorMap[name] || 'text-gray-500';
  };
  
  // Function to handle category click
  const handleCategoryClick = (categoryName: string) => {
    // Navigate to home with category filter
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };
  
  // Function to render the Lucide icon
  const renderIcon = (iconName: string) => {
    // Convert from kebab-case to PascalCase
    const pascalCase = iconName.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Get the icon component from Lucide
    const IconComponent = (LucideIcons as any)[pascalCase];
    
    if (IconComponent) {
      return <IconComponent size={32} className="mx-auto" />
    }
    
    // Fallback if icon doesn't exist
    return iconName;
  };
  
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explorar Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockCategories.map((category) => (
            <Card 
              key={category.id} 
              className="salame-hover cursor-pointer group overflow-hidden transition-all duration-300"
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                <div className={`flex justify-center items-center text-3xl mb-4 ${getCategoryColor(category.name)}`}>
                  {renderIcon(category.icon)}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
