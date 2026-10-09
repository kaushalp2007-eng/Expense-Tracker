function Balance({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  return (
    <div className="balance-box">
      <p className="balance-label">Total Balance</p>  
      <h2>₹{balance.toFixed(2)}</h2>
      <div className="income-expense">
        <div className="income">
          <p>Income</p>
          <h3>₹{income.toFixed(2)}</h3>
        </div>
        <div className="expense">
          <p>Expenses</p>
          <h3>₹{Math.abs(expenses).toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}
export default Balance;