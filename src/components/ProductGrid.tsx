
import { mockProducts } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  title?: string;
  products?: typeof mockProducts;
  onProductClick?: (productId: string) => void;
}

const ProductGrid = ({ 
  title = "Productos Destacados", 
  products = mockProducts,
  onProductClick 
}: ProductGridProps) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick?.(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
