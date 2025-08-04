import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PublishProductForm from '@/components/PublishProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PublishProductPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Published product data:', data);
      setIsSubmitting(false);
      
      toast({
        title: 'Publicación exitosa',
        description: 'Tu producto ha sido publicado correctamente.',
        variant: 'default',
        className: 'bg-green-50 border-green-200 text-green-800',
      });
      
      // Navigate to home page after successful publish
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        
        <PublishProductForm 
          onSubmit={handleSubmit}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default PublishProductPage;
