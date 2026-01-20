import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, CreditCard, MapPin, Truck } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, items } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2500);
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8">Thank you for shopping with Urban Cart. Your order #{Math.floor(Math.random() * 1000000)} is on its way.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Steps */}
          <div className="lg:w-3/4 space-y-4">
            
            {/* Step 1: Address */}
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${step === 1 ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4" onClick={() => setStep(1)}>
                <h3 className={`font-bold text-lg flex items-center gap-2 ${step === 1 ? 'text-indigo-600' : 'text-gray-700'}`}>
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">1</span>
                  Delivery Address
                </h3>
                {step > 1 && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              
              {step === 1 && (
                <div className="pl-8">
                  <div className="border border-indigo-100 bg-indigo-50 p-4 rounded-md mb-4 flex items-start gap-3">
                    <input type="radio" name="address" defaultChecked className="mt-1" />
                    <div>
                      <p className="font-bold text-gray-800">John Doe</p>
                      <p className="text-sm text-gray-600">123 Market Street, Apt 4B</p>
                      <p className="text-sm text-gray-600">New York, NY 10001</p>
                      <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded shadow-sm"
                  >
                    Use this address
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${step === 2 ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4" onClick={() => step > 1 && setStep(2)}>
                 <h3 className={`font-bold text-lg flex items-center gap-2 ${step === 2 ? 'text-indigo-600' : 'text-gray-700'}`}>
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h3>
                {step > 2 && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>

              {step === 2 && (
                <div className="pl-8">
                  <div className="space-y-3 mb-4">
                    <label className="flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" defaultChecked />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Credit or Debit Card</span>
                      <div className="ml-auto flex gap-1">
                         <div className="w-8 h-5 bg-blue-600 rounded"></div>
                         <div className="w-8 h-5 bg-red-500 rounded"></div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" />
                      <span className="font-medium">Net Banking</span>
                    </label>
                    <label className="flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="payment" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                  <button 
                     onClick={() => setStep(3)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded shadow-sm"
                  >
                    Use this payment method
                  </button>
                </div>
              )}
            </div>

             {/* Step 3: Review */}
             <div className={`bg-white p-6 rounded-lg shadow-sm border ${step === 3 ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                 <h3 className={`font-bold text-lg flex items-center gap-2 ${step === 3 ? 'text-indigo-600' : 'text-gray-700'}`}>
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">3</span>
                  Review items and shipping
                </h3>
              </div>

              {step === 3 && (
                <div className="pl-8">
                  <div className="border border-gray-200 rounded p-4 mb-4">
                     <h4 className="font-bold text-green-700 mb-2">Arriving Tomorrow</h4>
                     <div className="space-y-4">
                       {items.map(item => (
                         <div key={item.id} className="flex gap-4">
                            <img src={item.image} className="w-16 h-16 object-contain border p-1" />
                            <div>
                               <p className="font-medium text-sm">{item.title}</p>
                               <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                               <p className="text-sm font-bold text-red-700">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                         </div>
                       ))}
                     </div>
                  </div>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded shadow-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing...' : 'Place your order'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:w-1/4">
             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                <button 
                   onClick={step === 3 ? handlePlaceOrder : () => {}}
                   className={`w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded shadow-sm mb-4 ${step === 3 ? 'hover:bg-yellow-500' : 'opacity-50 cursor-not-allowed'}`}
                >
                   {step === 3 ? 'Place Order' : 'Complete Steps'}
                </button>
                
                <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
                <div className="text-sm space-y-1 text-gray-600 pb-2 border-b border-gray-200">
                   <div className="flex justify-between">
                     <span>Items:</span>
                     <span>${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Delivery:</span>
                     <span>$0.00</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Total:</span>
                     <span>${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Promotion:</span>
                     <span>-$0.00</span>
                   </div>
                </div>
                <div className="flex justify-between font-bold text-xl text-red-700 pt-2">
                   <span>Order Total:</span>
                   <span>${cartTotal.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;