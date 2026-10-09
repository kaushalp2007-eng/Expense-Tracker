import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]); // today's date

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      alert("Please fill in both fields!");
      return;
    }

    const finalAmount = type === "expense"
      ? -Math.abs(Number(amount))
      : Math.abs(Number(amount));

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: finalAmount,
      date,
    };

    onAdd(newTransaction);
    setTitle("");
    setAmount("");
    setType("income");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="form-box">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>

        <label>Title</label>
        <input
          type="text"
          placeholder="e.g. Salary, Groceries..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />

        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;