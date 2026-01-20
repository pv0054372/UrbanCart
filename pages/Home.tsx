import React, { useState } from 'react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeProps {
  onProductClick: (product: Product) => void;
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ onProductClick, searchTerm }) => {
  const { addToCart } = useCart();
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    { id: 1, bg: 'bg-gradient-to-r from-gray-900 to-indigo-900', title: 'Summer Sale is Live', subtitle: 'Up to 70% off on premium brands' },
    { id: 2, bg: 'bg-gradient-to-r from-purple-900 to-pink-800', title: 'New Tech Arrivals', subtitle: 'Upgrade your lifestyle today' },
    { id: 3, bg: 'bg-gradient-to-r from-emerald-800 to-teal-900', title: 'Eco-Friendly Home', subtitle: 'Sustainable living made affordable' },
  ];

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-10">
      {/* Hero Carousel */}
      {!searchTerm && (
        <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden bg-gray-100">
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center text-white ${index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${banner.bg}`}
            >
              <div className="text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h1>
                <p className="text-lg md:text-xl font-light mb-6 drop-shadow-md">{banner.subtitle}</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
          <button onClick={prevBanner} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white backdrop-blur-sm transition">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextBanner} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white backdrop-blur-sm transition">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Categories Row */}
      {!searchTerm && (
        <div className="container mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all group">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-100 transition-colors text-indigo-600">
                   {/* Icon placeholders via text for now as we don't have dynamic icon components mapped perfectly yet */}
                   <span className="font-bold text-xs uppercase">{cat.name.slice(0,3)}</span>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-indigo-600">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {searchTerm ? `Results for "${searchTerm}"` : "Recommended For You"}
        </h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found matching your search. Try "Electronics" or "Fashion".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

       {/* Banner Ad */}
       {!searchTerm && (
        <div className="container mx-auto px-4 mt-12">
          <div className="bg-indigo-900 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center">
             <div className="p-8 md:w-1/2 text-white">
                <h3 className="text-3xl font-bold mb-2">Prime Deal Days</h3>
                <p className="mb-6 text-indigo-200">Exclusive savings for members. Don't miss out on the biggest sale of the year.</p>
                <button className="bg-yellow-400 text-indigo-900 font-bold px-6 py-2 rounded shadow hover:bg-yellow-300 transition">View Deals</button>
             </div>
             <div className="md:w-1/2 h-48 md:h-full bg-cover bg-center w-full" style={{backgroundImage: 'url(https://picsum.photos/800/400?grayscale)'}}></div>
          </div>
        </div>
       )}
    </div>
  );
};

export default Home;