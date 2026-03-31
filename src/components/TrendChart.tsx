import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTrendData } from '@/utils/fuelData';

const TrendChart = () => {
  const data = useMemo(() => getTrendData(), []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-2">7-Day National Average Price Trend</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="day" stroke="hsl(220 9% 46%)" tick={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} />
            <YAxis domain={['auto', 'auto']} stroke="hsl(220 9% 46%)" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }} tickFormatter={(v) => `${v}¢`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                fontFamily: "'DM Sans', sans-serif",
                color: 'hsl(230 25% 15%)',
              }}
              formatter={(value: number) => [`${value}¢/L`]}
              labelStyle={{ color: 'hsl(220 9% 46%)' }}
            />
            <Legend wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }} />
            <Line type="monotone" dataKey="ulp91" name="ULP 91" stroke="hsl(16 82% 54%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="diesel" name="Diesel" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ulp95" name="ULP 95" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TrendChart;
