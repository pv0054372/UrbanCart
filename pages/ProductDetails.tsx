import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, MessageSquare, Sparkles, Send } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { MOCK_PRICE_HISTORY } from '../constants';
import PriceHistory from '../components/Product/PriceHistory';
import { askProductAI } from '../services/geminiService';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product.image);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const priceHistory = MOCK_PRICE_HISTORY[product.id] || MOCK_PRICE_HISTORY['default'];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiAnswer(null);
    const answer = await askProductAI(product, aiQuestion);
    setAiAnswer(answer);
    setIsAiLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-indigo-600 mb-4 flex items-center">
        ← Back to results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-8 bg-white p-6 rounded-xl shadow-sm">
        {/* Left Column: Images */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center h-96 relative group overflow-hidden">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[product.image, `https://picsum.photos/400/400?random=${parseInt(product.id)+10}`, `https://picsum.photos/400/400?random=${parseInt(product.id)+20}`].map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 border rounded-md p-1 flex-shrink-0 ${activeImage === img ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column: Details */}
        <div className="lg:col-span-3 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="text-sm text-indigo-600 ml-2 font-medium">{product.reviewCount.toLocaleString()} ratings</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-red-600 font-light text-2xl">-{discount}%</span>
              <span className="text-4xl font-bold text-gray-900"><sup className="text-lg">$</sup>{Math.floor(product.price)}<sup className="text-lg">{(product.price % 1).toFixed(2).substring(2)}</sup></span>
            </div>
            <span className="text-gray-500 text-sm line-through">M.R.P.: ${product.originalPrice}</span>
            <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Specifications Table */}
          <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <React.Fragment key={key}>
                <span className="font-semibold text-gray-700">{key}</span>
                <span className="text-gray-600">{value}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Services */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-gray-600">
            <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded">
              <ShieldCheck className="w-6 h-6 text-indigo-500 mb-1" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded">
              <RotateCcw className="w-6 h-6 text-indigo-500 mb-1" />
              <span>7 Day Replacement</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded">
              <Truck className="w-6 h-6 text-indigo-500 mb-1" />
              <span>Fast Delivery</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">About this item</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Right Column: Buy Box & Actions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <div className="text-2xl font-bold text-gray-900 mb-2">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-600 mb-4">
              Free delivery <span className="font-bold text-gray-800">Tomorrow, Sep 15</span>. Order within <span className="text-green-600">4 hrs 20 mins</span>.
            </div>
            <div className="text-lg text-green-700 font-medium mb-4">In Stock.</div>
            
            <div className="space-y-3">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2.5 rounded-full shadow-sm transition-colors"
              >
                Add to Cart
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-full shadow-sm transition-colors">
                Buy Now
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>Ships from</span>
                <span>UrbanCart</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span>
                <span className="text-indigo-600 cursor-pointer">UrbanRetail</span>
              </div>
            </div>
          </div>

          {/* AI Feature Box */}
          <div className="border border-indigo-100 bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-indigo-800 font-semibold text-sm">
              <Sparkles className="w-4 h-4" /> Ask AI about this product
            </div>
            <div className="relative">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Is this good for gaming?"
                className="w-full border border-indigo-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8"
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <button 
                onClick={handleAskAI}
                className="absolute right-2 top-2 text-indigo-600 hover:text-indigo-800"
                disabled={isAiLoading}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {isAiLoading && (
               <div className="mt-2 text-xs text-gray-500 animate-pulse">Analyzing product details...</div>
            )}
            {aiAnswer && (
              <div className="mt-3 bg-white p-3 rounded border border-indigo-100 text-sm text-gray-700 shadow-sm">
                <span className="font-semibold text-indigo-600 block mb-1 text-xs">AI Response:</span>
                {aiAnswer}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      <div className="mt-8 max-w-4xl">
        <PriceHistory data={priceHistory} />
      </div>
    </div>
  );
};

export default ProductDetails;