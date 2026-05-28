import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4F86F7', '#00C49F', '#FFBB28']

const CategoryPieChart = ({ pieData }) => {
    if (!pieData || pieData.length === 0) {
        return (
            <div className="card flex items-center justify-center h-48">
                <p className="text-gray-400 text-sm">No expense data this month</p>
            </div>
        )
    }

    return (
        <div className="card">
            <h5 className="text-lg mb-4">Spending by Category</h5>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`₹${value}`, "Spent"]}
                        contentStyle={{
                            borderRadius: "8px",
                            fontSize: "13px",
                        }}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => (
                            <span className="text-xs text-gray-600">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CategoryPieChart