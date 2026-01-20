import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PricePoint } from '../../types';

interface PriceHistoryProps {
  data: PricePoint[];
}

const PriceHistory: React.FC<PriceHistoryProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Price History</h3>
      <div className="h-64 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{fill: '#6b7280'}} />
            <YAxis tick={{fill: '#6b7280'}} domain={['auto', 'auto']} prefix="$" />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#4f46e5" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#4f46e5' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Lowest price in 30 days: <span className="text-green-600 font-bold">${Math.min(...data.map(d => d.price)).toFixed(2)}</span>
      </p>
    </div>
  );
};

export default PriceHistory;