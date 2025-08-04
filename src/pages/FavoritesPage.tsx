import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { mockFavorites, mockProducts, mockUsers } from '@/data/mockData';
import { Favorite, Product } from '@/types/marketplace';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<(Favorite & { product: Product })[]>([]);
  
  // Current user ID (in a real app, this would come from authentication)
  const currentUserId = '1';
  
  // Load user favorites with complete product data
  useEffect(() => {
    // Filter favorites by current user
    const userFavorites = mockFavorites.filter(fav => fav.userId === currentUserId);
    
    // Attach complete product data to each favorite
    const favoritesWithProducts = userFavorites.map(favorite => {
      const product = mockProducts.find(p => p.id === favorite.productId);
      return {
        ...favorite,
        product: product!
      };
    });
    
    // Sort by most recently added
    const sortedFavorites = favoritesWithProducts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setFavorites(sortedFavorites);
  }, [currentUserId]);
  
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  const handleRemoveFavorite = (favoriteId: string) => {
    // In a real app, you would call an API to remove the favorite
    // Here we just update the local state
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mis Favoritos</h1>
        </div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(favorite => (
              <div key={favorite.id} className="relative">
                <ProductCard
                  product={favorite.product}
                  onClick={() => handleProductClick(favorite.product.id)}
                />
                <button
                  className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(favorite.id);
                  }}
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">No tienes favoritos guardados</h2>
            <p className="text-gray-500">
              Explora productos y agrega tus favoritos para verlos aquí
            </p>
            <button
              className="mt-6 px-5 py-3 bg-primary text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => navigate('/')}
            >
              Explorar Productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
