import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import "./App.css";

function App() {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

 
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);


  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };


  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <Balance transactions={transactions} />
      <ExpenseChart transactions={transactions} />
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </div>
  );
}

export default App;