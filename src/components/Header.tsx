
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would navigate to search results
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="salame-gradient text-white font-bold text-2xl px-4 py-2 rounded-lg">
              SALAME
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-primary focus:ring-primary"
              />
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/nearby')}
              title="Ver mapa de productos cercanos"
            >
              <MapPin className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/favorites')}
            >
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs">3</Badge>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/messages')}
            >
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs">2</Badge>
            </Button>

            <Button 
              className="salame-gradient text-white"
              onClick={() => navigate('/publish')}
            >
              Vender
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem onClick={() => navigate('/profile')}>Mi Perfil</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>Mis Productos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/favorites')}>Favoritos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/')}>Configuración</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => navigate('/')}>Cerrar Sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
