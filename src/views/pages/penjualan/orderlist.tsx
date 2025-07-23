import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { menuCategories, menuItems, orderHistory } from '../dummy/Menu';

interface Order {
  id: string;
  customer: string;
  items: number;
  table: string;
  time: string;
  status: string;
  date: string;
  orderItems?: any[];
  total?: number;
  customerColor?: string;
  customerInitials?: string;
}

const OrderList = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filters = [
    { label: 'ALL', count: null, color: 'bg-gray-100 text-gray-700' },
    { label: 'NEW', count: 3, color: 'bg-red-100 text-red-700' },
    { label: 'PAID', count: null, color: 'bg-green-100 text-green-700' },
    { label: 'PREP', count: null, color: 'bg-blue-100 text-blue-700' },
    { label: 'READY', count: null, color: 'bg-purple-100 text-purple-700' },
    { label: 'DONE', count: null, color: 'bg-orange-100 text-orange-700' },
    { label: 'REFUND', count: null, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'CANCEL', count: null, color: 'bg-teal-100 text-teal-700' },
    { label: 'VOID', count: null, color: 'bg-indigo-100 text-indigo-700' },
    { label: 'COMP', count: null, color: 'bg-pink-100 text-pink-700' },
  ];

  const getRandomMenuItems = (count: number) => {
    const shuffled = [...menuItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(item => ({
      ...item,
      quantity: Math.floor(Math.random() * 3) + 1
    }));
  };

  const detailedOrders: Order[] = orderHistory.map((order, index) => {
    const orderItems = getRandomMenuItems(order.items);
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const customerColors = [
      'bg-red-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500',
      'bg-blue-500', 'bg-green-500', 'bg-indigo-500'
    ];

    return {
      ...order,
      orderItems,
      total,
      customerColor: customerColors[index % customerColors.length],
      customerInitials: order.customer.split(' ').map(n => n[0]).join('').toUpperCase()
    };
  });

  const filteredOrders = activeFilter === 'ALL'
    ? detailedOrders
    : detailedOrders.filter(order => order.status.toUpperCase() === activeFilter);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready to serve':
        return 'text-green-600 bg-green-100';
      case 'cooking':
        return 'text-orange-600 bg-orange-100';
      case 'pending':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ORDER LIST</h1>

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => {
                  setActiveFilter(filter.label);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeFilter === filter.label
                    ? filter.color
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                } ${filter.count ? 'relative' : ''}`}
              >
                {filter.label}
                {filter.count && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentOrders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">
                    {order.date} {order.time && `, ${order.time}`}
                  </p>
                  {order.table && (
                    <p className="text-xs text-gray-400">Table: {order.table}</p>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-full ${order.customerColor} flex items-center justify-center text-white font-medium text-sm`}>
                  {order.customerInitials}
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-800">{order.customer}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {order.orderItems.slice(0, 2).map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold text-gray-800">{formatPrice(item.price)}</span>
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {order.orderItems.length > 2 && (
                  <p className="text-xs text-gray-500 text-center">
                    +{order.orderItems.length - 2} more items
                  </p>
                )}
                {order.orderItems.length < 3 && (
                  <p className="text-xs text-gray-500 text-center invisible">asd</p>
                )}
              </div>

              <div className="border-gray-300 border-t pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg text-gray-800">{formatPrice(order.total)}</span>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-red-100 text-red-600 rounded-md flex items-center justify-center hover:bg-red-200 transition-colors">
                      <X size={16} />
                    </button>
                    <button className="w-8 h-8 bg-green-100 text-green-600 rounded-md flex items-center justify-center hover:bg-green-200 transition-colors">
                      <Check size={16} />
                    </button>
                    <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                      PRINT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{startIndex + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredOrders.length)}</span>
                  {' '}of{' '}
                  <span className="font-medium">{filteredOrders.length}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
