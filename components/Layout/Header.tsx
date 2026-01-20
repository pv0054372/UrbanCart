import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User, MapPin, Mic, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Page } from '../../types';

interface HeaderProps {
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage, onSearch }) => {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Brand & Actions */}
      <div className="bg-indigo-900 text-white py-2 text-xs text-center hidden sm:block">
        Free Shipping on Orders Over $50 | Join Urban Cart Plus for Exclusive Deals
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div 
            className="text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-1"
            onClick={() => setPage(Page.HOME)}
          >
            Urban<span className="text-gray-900">Cart</span>
          </div>
        </div>

        {/* Location (Desktop) */}
        <div className="hidden lg:flex flex-col text-sm text-gray-600 leading-tight cursor-pointer hover:text-indigo-600">
          <span className="text-xs text-gray-400">Deliver to</span>
          <div className="flex items-center font-semibold">
            <MapPin className="w-3 h-3 mr-1" /> New York 10001
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative hidden md:block">
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full px-4 py-2.5 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-r-md transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-start cursor-pointer group">
            <span className="text-xs text-gray-500">Hello, Sign in</span>
            <span className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 flex items-center">
              Account <User className="w-4 h-4 ml-1" />
            </span>
          </div>

          <div 
            className="relative cursor-pointer group"
            onClick={() => setPage(Page.CART)}
          >
            <ShoppingCart className="w-7 h-7 text-gray-700 group-hover:text-indigo-600 transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
            <span className="hidden md:inline text-sm font-bold ml-1 text-gray-800">Cart</span>
          </div>
        </div>
      </div>

      {/* Mobile Search (Below Header) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="flex relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Urban Cart"
            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-500">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Categories Bar */}
      <div className="bg-gray-800 text-white text-sm py-2 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex gap-6 whitespace-nowrap">
          <span className="cursor-pointer hover:text-indigo-300 font-medium">All</span>
          <span className="cursor-pointer hover:text-indigo-300">Fresh</span>
          <span className="cursor-pointer hover:text-indigo-300">Mobiles</span>
          <span className="cursor-pointer hover:text-indigo-300">Fashion</span>
          <span className="cursor-pointer hover:text-indigo-300">Electronics</span>
          <span className="cursor-pointer hover:text-indigo-300">Home & Kitchen</span>
          <span className="cursor-pointer hover:text-indigo-300">Prime</span>
          <span className="cursor-pointer hover:text-indigo-300">New Releases</span>
        </div>
      </div>

       {/* Mobile Menu Overlay */}
       {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="bg-white w-4/5 h-full p-5 shadow-lg relative">
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
              {['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys'].map((cat) => (
                <div key={cat} className="py-2 border-b border-gray-100 text-gray-700 hover:text-indigo-600 cursor-pointer">
                  {cat}
                </div>
              ))}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-700 mb-4">
                  <User className="w-5 h-5" /> Your Account
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-5 h-5" /> Track Order
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;