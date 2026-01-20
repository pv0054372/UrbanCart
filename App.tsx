import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ChatAssistant from './components/Layout/ChatAssistant';
import { Page, Product } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage(Page.PRODUCT_DETAILS);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(Page.HOME);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <Home 
            onProductClick={handleProductClick} 
            searchTerm={searchQuery}
          />
        );
      case Page.PRODUCT_DETAILS:
        return selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setCurrentPage(Page.HOME)}
          />
        ) : (
          <Home onProductClick={handleProductClick} searchTerm="" />
        );
      case Page.CART:
        return (
          <Cart 
            onCheckout={() => setCurrentPage(Page.CHECKOUT)} 
            onContinueShopping={() => setCurrentPage(Page.HOME)}
          />
        );
      case Page.CHECKOUT:
        return <Checkout />;
      default:
        return <Home onProductClick={handleProductClick} searchTerm="" />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header 
          setPage={(page) => {
            setCurrentPage(page);
            if (page === Page.HOME) setSearchQuery('');
          }} 
          onSearch={handleSearch}
        />
        
        <main className="flex-grow">
          {renderPage()}
        </main>
        
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:underline cursor-pointer">About Us</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">Press Releases</li>
                <li className="hover:underline cursor-pointer">Urban Cart Science</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect with Us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:underline cursor-pointer">Facebook</li>
                <li className="hover:underline cursor-pointer">Twitter</li>
                <li className="hover:underline cursor-pointer">Instagram</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:underline cursor-pointer">Sell on Urban Cart</li>
                <li className="hover:underline cursor-pointer">Protect and Build Your Brand</li>
                <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:underline cursor-pointer">Your Account</li>
                <li className="hover:underline cursor-pointer">Returns Centre</li>
                <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
                <li className="hover:underline cursor-pointer">Help</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
            &copy; 2024 Urban Cart, Inc. or its affiliates
          </div>
        </footer>

        <ChatAssistant />
      </div>
    </CartProvider>
  );
};

export default App;