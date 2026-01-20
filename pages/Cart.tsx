import React from 'react';
import { Minus, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';

interface CartProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckout, onContinueShopping }) => {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-indigo-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-6xl">🛒</div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Urban Cart is empty</h2>
        <p className="text-gray-500 mb-8">It looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart ({itemCount} items)</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-3/4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md p-2 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 hover:text-indigo-600 cursor-pointer">{item.title}</h3>
                  <div className="text-green-600 text-sm font-medium mt-1">In Stock</div>
                  <div className="text-gray-500 text-xs mt-1">Eligible for FREE Shipping</div>
                  <div className="flex items-center gap-2 mt-2">
                    <img src="https://via.placeholder.com/50x15?text=Prime" alt="Prime" className="h-4 opacity-50" />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <span className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  
                  <div className="flex items-center border border-gray-300 rounded-md bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="px-4 py-1 text-sm font-semibold bg-white border-x border-gray-300 min-w-[3rem] text-center">
                      {item.quantity}
                    </div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span>Your order is eligible for FREE Delivery.</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Subtotal ({itemCount} items):</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                 <input type="checkbox" id="gift" className="mt-1" />
                 <label htmlFor="gift" className="text-sm text-gray-700">This order contains a gift</label>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Secure transaction allowed by Urban Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;