
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SDG } from '../types';

interface RadarChartComponentProps {
  companyAlignment: number[];
  userSdgs: SDG[];
  darkMode?: boolean;
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ companyAlignment, userSdgs, darkMode = false }) => {
  // Use only the selected SDGs for the chart
  const chartData = userSdgs.map(sdg => ({
    subject: sdg.title.split(' ')[0], // Keep labels short
    company: companyAlignment[sdg.id - 1],
    user: 5, // User's preference is always max for the selected items
    fullMark: 5,
  }));

  const textColor = darkMode ? '#e2e8f0' : '#374151'; // slate-200 : gray-700
  const gridColor = darkMode ? '#475569' : '#e5e7eb'; // slate-600 : gray-200

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 6]} tick={false} axisLine={false} />
        
        <Radar 
            name="기업 부합도" 
            dataKey="company" 
            stroke="#8b5cf6" 
            fill="#8b5cf6" 
            fillOpacity={0.5} 
        />
        <Radar 
            name="나의 가치" 
            dataKey="user" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={0.3} 
        />
        
        <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: textColor }}>{value}</span>} 
        />
        <Tooltip 
            contentStyle={{ 
                backgroundColor: darkMode ? '#1e293b' : '#fff', 
                borderColor: gridColor,
                color: textColor,
                borderRadius: '8px'
            }}
            itemStyle={{ color: darkMode ? '#e2e8f0' : '#374151' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartComponent;
