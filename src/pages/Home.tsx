
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import SpecialOffersBanner from '@/components/SpecialOffersBanner';
import ProductFilters from '@/components/ProductFilters';
import RecommendationSection from '@/components/RecommendationSection';
import { mockProducts, mockCategories } from '@/data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    categories: [] as string[],
    maxDistance: 25
  });
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  // Process URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [location.search]);
  
  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
    navigate(`/product/${productId}`);
  };

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

  // Get all products grouped by categories for different sections
  
  // Get featured products (at least 8)
  const featuredProducts = filteredProducts
    .filter(p => p.favorites >= 15 || p.specialOffer)
    .slice(0, 8);
    
  // Get recent products sorted by date
  const recentProducts = [...filteredProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
    
  // Get recommended products based on favorites
  const recommendedProducts = filteredProducts
    .filter(p => p.favorites > 10 || p.views > 150)
    .slice(0, 8);
    
  // Get technology products
  const techProducts = filteredProducts
    .filter(p => p.category === 'Tecnología')
    .slice(0, 4);
    
  // Get fashion products
  const fashionProducts = filteredProducts
    .filter(p => p.category === 'Ropa')
    .slice(0, 4);
    
  // Get home products
  const homeProducts = filteredProducts
    .filter(p => p.category === 'Hogar')
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SpecialOffersBanner 
          products={mockProducts.filter(p => p.specialOffer)} 
          onProductClick={handleProductClick}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Display category grid */}
        <CategoryGrid />
        
        {/* Display personalized recommendations */}
        <RecommendationSection 
          title="Recomendaciones para vos" 
          description="Basado en tus intereses y navegación reciente"
          products={recommendedProducts}
          onProductClick={handleProductClick}
          variant="gradient"
          onViewAllClick={() => navigate('/')}
        />
        
        {/* Main content with filters and products */}
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-1/4">
            <ProductFilters 
              categories={mockCategories} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          <div className="w-full md:w-3/4">
            {filters.categories.length > 0 || filters.maxDistance < 25 ? (
              <ProductGrid 
                title="Resultados" 
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            ) : (
              <>
                <ProductGrid 
                  title="Productos Destacados" 
                  products={featuredProducts}
                  onProductClick={handleProductClick}
                />
                <ProductGrid 
                  title="Publicados Recientemente" 
                  products={recentProducts}
                  onProductClick={handleProductClick}
                />
              </>
            )}
          </div>
        </div>
        
        {/* Category based recommendations */}
        <div className="mt-12">
          <RecommendationSection 
            title="Según tus últimas visitas" 
            description="Lo más buscado en Tecnología"
            products={techProducts}
            onProductClick={handleProductClick}
            variant="gradient"
            onViewAllClick={() => navigate('/?category=Tecnología')}
          />
          
          <RecommendationSection 
            title="Recomendados para vos" 
            description="Basado en tus preferencias en Ropa"
            products={fashionProducts}
            onProductClick={handleProductClick}
            variant="highlight"
            onViewAllClick={() => navigate('/?category=Ropa')}
          />
          
          <RecommendationSection 
            title="Para tu Hogar" 
            description="Las mejores ofertas para renovar tu casa"
            products={homeProducts}
            onProductClick={handleProductClick}
            variant="gradient"
            onViewAllClick={() => navigate('/?category=Hogar')}
          />
        </div>
      </div>
      
      {/* Stats Section */}
      <section className="py-16 salame-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir SALAME?</h2>
            <p className="text-xl text-purple-100">La plataforma más confiable de Argentina</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-purple-100">Protección al comprador y vendedores verificados</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat Directo</h3>
              <p className="text-purple-100">Negocia directamente con los vendedores</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-purple-100">Entrega a todo el país en tiempo récord</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="salame-gradient text-white font-bold text-2xl px-4 py-2 rounded-lg mb-4 inline-block">
                SALAME
              </div>
              <p className="text-gray-400">
                El marketplace argentino donde comprar y vender es fácil, seguro y divertido.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comprar</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Explorar Productos</li>
                <li>Categorías</li>
                <li>Ofertas</li>
                <li>Favoritos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Vender</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Publicar Producto</li>
                <li>Consejos de Venta</li>
                <li>Tarifas</li>
                <li>Estadísticas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centro de Ayuda</li>
                <li>Contacto</li>
                <li>Términos y Condiciones</li>
                <li>Privacidad</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SALAME. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
