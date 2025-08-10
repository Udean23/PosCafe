import React, { useState, useEffect } from 'react';
import { Plus, Minus, X, ChevronDown } from 'lucide-react';
import { menuCategories, menuItems, orderHistory } from '../dummy/Menu';
import CalculatorCard from '@/views/components/card/CalculatorCard';

export default function RestaurantOrderingSystem() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState({});
  const [showOrderDetail, setShowOrderDetail] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId]) {
        if (newCart[itemId].quantity >= 1) {
          newCart[itemId].quantity -= 1;
        } else {
          delete newCart[itemId];
        }
      }
      return newCart;
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        quantity: quantity
      }
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.1);
  };

  const getDiscount = () => {
    return 50000;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() - getDiscount();
  };

  const getChange = () => {
    const payment = parseFloat(paymentAmount) || 0;
    const total = getTotal();
    return payment - total;
  };

  const formatPrice = (price) => {
    return `Rp. ${price.toLocaleString('id-ID')}`;
  };

  const clearCart = () => {
    setCart({});
  };

  const handlePaymentProcess = () => {
    setShowPaymentModal(true);
  };

  const handleQuickAmount = (amount) => {
    setPaymentAmount(prev => {
      const currentAmount = parseFloat(prev) || 0;
      const newAmount = currentAmount + amount;
      return newAmount.toString();
    });
  };

  const handleNumberInput = (num) => {
    if (num === 'clear') {
      setPaymentAmount('');
    } else if (num === 'delete') {
      setPaymentAmount(prev => prev.slice(0, -1));
    } else {
      setPaymentAmount(prev => prev + num);
    }
  };

  const handlePayNow = () => {
    alert(`Payment processed for ${customerName}. Change: ${formatPrice(getChange())}`);
    setShowPaymentModal(false);
    setCustomerName('');
    setPaymentAmount('');
    clearCart();
  };

  return (
    <div className="flex h-full bg-gray-50 -m-4 relative">
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow-md p-4 lg:p-6 border-b border-gray-200 relative z-10">
          <div className="flex justify-between items-center mb-4 max-w-4xl">
            <h2 className="text-lg font-semibold text-gray-900">Order List</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
              View More
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 max-w-230">
            {orderHistory.map((order, index) => (
              <div key={index} className="min-w-56 bg-white rounded-lg p-3 shadow-md border border-gray-200 flex-shrink-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs text-gray-500">
                    {order.date} {order.time}
                  </div>
                  <div className="text-xs text-gray-500">
                    #{order.id}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items} Item {order.table && `• Tabel ${order.table}`}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Ready to Serve'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                    }`}>
                    {order.status}
                  </span>
                  <div className="text-xs text-gray-500">
                    {order.date} {order.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 lg:p-6 min-h-0 flex flex-col max-w-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">List Menu</h2>
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            {menuCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap flex-shrink-0 ${selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide flex-1 max-w-230">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow h-fit">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="font-semibold text-gray-900 mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300 transition-colors"
                      disabled={!cart[item.id]?.quantity}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {cart[item.id]?.quantity || 0}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showOrderDetail && (
        <div className="fixed right-0 h-full bg-white shadow-md border-l border-gray-200 flex flex-col z-20" style={{ width: '300px' }}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Order Detail</h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            <p className="text-sm text-gray-600">{getTotalItems()} item select</p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 max-h-70">
            {Object.values(cart).length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No items selected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.values(cart).map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.quantity} item</p>
                      <p className="text-xs text-gray-700">Sub Total : <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {Object.values(cart).length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-semibold">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-semibold">{formatPrice(getTax())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-red-500 font-semibold">-{formatPrice(getDiscount())}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total Amount</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>MakanSepuasnya</span>
                <span>Applied</span>
              </div>

              <button
                onClick={handlePaymentProcess}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md transition-colors"
              >
                Payment Process
              </button>
            </div>
          )}
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-[800px] max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex">
              <div className="flex-1 p-4 border-r border-gray-200">
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm text-gray-700">Customer Info</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      Aa
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full font-medium text-sm bg-transparent border-none outline-none focus:bg-gray-50 px-1 py-1 rounded"
                      />
                      <div className="text-xs text-gray-500">{formatDate(currentDate)}</div>
                      <div className="text-xs text-gray-500">{formatTime(currentDate)}</div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm text-gray-700">Select a payment method</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs">
                        💳
                      </div>
                      <span className="text-sm font-medium">Cash</span>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-sm text-gray-700">Transaction Details</h3>
                  <div className="space-y-2">
                    {Object.values(cart).map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1 text-gray-800">{item.name}</span>
                        <span className="w-8 text-center text-gray-600">{item.quantity}x</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Items ({getTotalItems()})</span>
                      <span className="text-gray-800">{formatPrice(getSubtotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="text-gray-800">{formatPrice(getTax())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="text-gray-800">{formatPrice(parseFloat(paymentAmount) || 0)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>{formatPrice(getTotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Change</span>
                      <span className={`text-gray-800 ${getChange() < 0 ? 'text-red-500' : 'text-green-600'}`}>
                        {formatPrice(Math.max(0, getChange()))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CalculatorCard 
                paymentAmount={paymentAmount}
                onQuickAmount={handleQuickAmount}
                onNumberInput={handleNumberInput}
                onPayNow={handlePayNow}
                isPayDisabled={!customerName || !paymentAmount || getChange() < 0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}