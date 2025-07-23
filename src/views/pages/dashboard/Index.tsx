import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Heart } from 'lucide-react';

const weeklyRevenueData = {
  series: [{
    name: 'Revenue',
    data: [30, 55, 28, 62, 48, 85, 154]
  }],
  options: {
    chart: {
      type: 'area',
      height: 160,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#6B7280', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: true },
    colors: ['#3B82F6']
  }
};

const customerFlowData = {
  series: [
    {
      name: 'Old Customers',
      data: [18, 45, 50, 60, 70, 66, 55, 30, 25, 60, 45, 32, 68, 39, 40]
    },
    {
      name: 'New Customers',
      data: [10, 50, 55, 58, 65, 59, 60, 25, 30, 40, 50, 48, 40, 40, 38]
    }
  ],
  options: {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: Array.from({ length: 15 }, (_, i) => (i + 1).toString()),
      labels: { style: { colors: '#6B7280', fontSize: '12px' } },
    },
    yaxis: {
      labels: { style: { colors: '#6B7280', fontSize: '12px' } },
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: val => `${val} people`
      }
    },
    colors: ['#F59E0B', '#3B82F6'],
    legend: {
      position: 'top',
    }
  }
};

const CircularProgress = ({ percentage, size = 70, strokeWidth = 6, color = "#FB923C" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-orange-500 text-lg font-bold">
          {percentage < 30 ? '$' : percentage < 50 ? '🍽️' : percentage < 75 ? '👥' : '🧾'}
        </div>
      </div>
    </div>
  );
};

const CardStat = ({ icon, label, value, percentage = 75 }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm w-full">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">{label}</div>
        <div className="text-xl font-semibold text-gray-900">{value}</div>
      </div>
      <div className="ml-3">
        <CircularProgress percentage={percentage} />
      </div>
    </div>
  </div>
);

const FavouriteItem = ({ img, name }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <img src={img} alt={name} className="w-full h-40 object-cover" />
    <div className="p-3 text-center">
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">(Review 150) ⭐⭐⭐⭐⭐</div>
      <button className="mt-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full flex items-center justify-center mx-auto space-x-1">
        <Heart size={14} fill="currentColor" className="text-purple-600" />
        <span>12k Like it</span>
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">154K $</h3>
              <p className="text-sm text-gray-500">
                than last week <span className="text-green-500">1.5% ↗</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Daily Revenue</p>
              <p className="text-xs text-gray-400">Lorem ipsum dolor</p>
            </div>
          </div>
          <div className="h-32">
            <ApexCharts
              options={weeklyRevenueData.options}
              series={weeklyRevenueData.series}
              type="area"
              height={130}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 col-span-1 lg:col-span-2">
          <CardStat icon={<span className="text-orange-600">$</span>} label="Total Revenue" value="$425k" />
          <CardStat icon={<span className="text-orange-600">🍽️</span>} label="Total Menu" value="325" />
          <CardStat icon={<span className="text-orange-600">👥</span>} label="Total Customers" value="985" />
          <CardStat icon={<span className="text-orange-600">🧾</span>} label="Total Orders" value="415" />
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Favourite Items</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FavouriteItem name="Vegetable Jalfrezi" img="https://source.unsplash.com/400x300/?salmon" />
          <FavouriteItem name="Aloo Tamatar Ki Sabzi" img="https://source.unsplash.com/400x300/?curry" />
          <FavouriteItem name="Biryanis Pulav" img="https://source.unsplash.com/400x300/?rice" />
          <FavouriteItem name="King Burgers" img="https://source.unsplash.com/400x300/?burger" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Overview</h2>
          <ApexCharts
            options={weeklyRevenueData.options}
            series={weeklyRevenueData.series}
            type="area"
            height={240}
          />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Customer Flow</h2>
          <ApexCharts
            options={customerFlowData.options}
            series={customerFlowData.series}
            type="bar"
            height={240}
          />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;