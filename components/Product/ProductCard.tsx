import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex flex-col h-full relative"
    >
       <button className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10">
        <Heart className="w-4 h-4 fill-current" />
      </button>

      <div className="h-48 flex items-center justify-center mb-4 overflow-hidden" onClick={() => onClick(product)}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-grow" onClick={() => onClick(product)}>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600">
          {product.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded gap-1">
            <span className="font-bold">{product.rating}</span> <Star className="w-3 h-3 fill-white" />
          </div>
          <span className="text-xs text-gray-500 ml-2">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
             <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
             <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
             <span className="text-xs font-semibold text-green-600">{discount}% off</span>
          </div>
          
          {product.isBestSeller && (
            <span className="inline-block mt-1 text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
              Best Seller
            </span>
          )}
          
          <div className="text-xs text-green-700 font-medium mt-1">
            Free delivery
          </div>
        </div>
      </div>
      
      <button 
        onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
        }}
        className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-full text-sm transition-colors opacity-0 group-hover:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 block md:hidden"
      >
        Add to Cart
      </button>
      {/* Desktop hover button effect can be tricky without layout shift, keeping it simpler for now */}
    </div>
  );
};

export default ProductCard;