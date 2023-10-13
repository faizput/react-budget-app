import React, { useContext } from 'react';
import { PieChart, Pie, Label, Cell } from 'recharts';
import { AppContext } from '../context/AppContext';

const Chart = () => {
  const { expenses } = useContext(AppContext);

  // Generate an array of distinct colors for each expense
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#0088FE'];

  const data = expenses.map((expense, index) => ({
    id: expense.id,
    name: expense.name,
    cost: expense.cost,
    fill: COLORS[index % COLORS.length], // Assign a unique color to each expense
  }));

  return (
    <span> {/* Wrap everything in a span */}
      <div style={{ display: 'flex' }}>
        <PieChart width={700} height={700}>
          <Pie data={data} dataKey="cost" outerRadius={250} fill="green">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            {data.map((entry, index) => (
              <Label
                key={`label-${index}`}
                position="inside"
                content={({ cx, cy, midAngle }) => {
                  const radius = 150; // Adjust this value to control the distance from the center
                  const x = cx + Math.cos(-midAngle) * radius;
                  const y = cy + Math.sin(-midAngle) * radius;
                  return (
                    <text x={x} y={y} textAnchor="middle" fill="white" fontWeight="bold">
                      {`[${entry.name} - £${entry.cost}]`}
                    </text>
                  );
                }}
              />
            ))}
          </Pie>
        </PieChart>

        <div style={{ marginLeft: '20px' }}>
          {data.map((entry, index) => (
            <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: entry.fill,
                  marginRight: '5px',
                }}
              ></div>
              <span>{`${entry.name} - £${entry.cost}`}</span>
            </div>
          ))}
        </div>
      </div>
    </span>
  );
};

export default Chart;
