
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="salame-gradient text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Compra y vende todo<br />
          <span className="text-secondary">en Argentina</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100">
          El marketplace más confiable para dar nueva vida a tus productos
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold"
            onClick={() => navigate('/')}
          >
            <Search className="mr-2 h-5 w-5" />
            Explorar Productos
          </Button>
          <Button 
            size="lg" 
            className="bg-white/20 border border-white text-white hover:bg-white hover:text-purple-900"
            onClick={() => navigate('/publish')}  
          >
            Comenzar a Vender
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">+50k</div>
            <div className="text-purple-200">Productos</div>
          </div>
          <div>
            <div className="text-3xl font-bold">+25k</div>
            <div className="text-purple-200">Usuarios</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.8★</div>
            <div className="text-purple-200">Calificación</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
