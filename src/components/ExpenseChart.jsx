import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#38a169", "#e53e3e"];

function ExpenseChart({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ];

  if (income === 0 && expenses === 0) {
    return (
      <div className="chart-box">
        <h3>Spending Overview</h3>
        <p className="empty-msg">Add transactions to see your chart!</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h3>Spending Overview</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;