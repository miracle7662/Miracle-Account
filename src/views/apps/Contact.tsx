import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { ShoppingCart, Users, CreditCard, Tag, Package,  Clock, FileText, Truck, X } from 'lucide-react';

export default function SalesDashboard() {
  const [dateRange, setDateRange] = useState('Daily');

  // Sample data for charts
  const barData = [
    { name: '1', value: 12000 },
    { name: '2', value: 19000 },
    { name: '3', value: 10000 },
    { name: '4', value: 22000 },
    { name: '5', value: 15000 },
    { name: '6', value: 18000 },
    { name: '7', value: 24000 },
    { name: '8', value: 16000 },
    { name: '9', value: 12000 },
    { name: '10', value: 19000 },
    { name: '11', value: 14000 },
    { name: '12', value: 25000 },
    { name: '13', value: 17000 },
    { name: '14', value: 22000 },
    { name: '15', value: 20000 },
  ];

  const pieData = [
    { name: 'Online Sales', value: 1420252, color: '#FFD700' },
    { name: 'Digital Sales', value: 60300, color: '#0080FF' }
  ];

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="text-xl font-bold mb-4 text-gray-700">Sales Dashboard</div>
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Today's Sales</p>
            <p className="text-lg font-bold">Rs 8,400</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-lg font-bold">Rs 1420252.00 (3459)</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-lg font-bold">Rs 60300.00 (134)</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">IP Address</p>
            <p className="text-lg font-bold">192.168.29.9</p>
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2">
            {/* Stats cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <ShoppingCart size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Online Sales</p>
                <p className="text-sm font-bold">Rs 1420252.00</p>
                <p className="text-xs text-gray-500">(3459)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <CreditCard size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Digital Sales</p>
                <p className="text-sm font-bold">Rs 0.00</p>
                <p className="text-xs text-gray-500">(0)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <Tag size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Total Discount</p>
                <p className="text-sm font-bold">Rs 23275.50</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <Users size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Dine In</p>
                <p className="text-sm font-bold">Rs 1088684.00</p>
                <p className="text-xs text-gray-500">(2247)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <Clock size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Quick Bill</p>
                <p className="text-sm font-bold">Rs 220.00</p>
                <p className="text-xs text-gray-500">(1)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <Package size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Pickup</p>
                <p className="text-sm font-bold">Rs 14751.00</p>
                <p className="text-xs text-gray-500">(53)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <Truck size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Delivery</p>
                <p className="text-sm font-bold">Rs 25681.00</p>
                <p className="text-xs text-gray-500">(67)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <X size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Cancelled Bill</p>
                <p className="text-sm font-bold">Rs 3400.00</p>
                <p className="text-xs text-gray-500">(14)</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3 shadow-sm flex flex-col items-center">
                <div className="bg-gray-200 p-2 rounded-full mb-2">
                  <FileText size={20} className="text-gray-700" />
                </div>
                <p className="text-xs text-gray-500">Free Bill</p>
                <p className="text-sm font-bold">Rs 0.00</p>
                <p className="text-xs text-gray-500">(0)</p>
              </div>
            </div>
            
            {/* Date Range Filter */}
            <div className="flex mb-4 gap-2">
              <div className="text-xs text-gray-500 flex items-center">07 Mar 2025 - 07 May 2025</div>
              <button 
                className={`text-xs px-3 py-1 rounded ${dateRange === 'Daily' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setDateRange('Daily')}
              >
                Daily
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded ${dateRange === 'Weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setDateRange('Weekly')}
              >
                Weekly
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded ${dateRange === 'Monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setDateRange('Monthly')}
              >
                Monthly
              </button>
            </div>
            
            {/* Legend */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500"></div>
                <span className="text-xs text-gray-500">Dine In</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500"></div>
                <span className="text-xs text-gray-500">Digital</span>
              </div>
            </div>
            
            {/* Semi Circle Chart */}
            <div className="h-64 mb-4">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="80%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF4560" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}