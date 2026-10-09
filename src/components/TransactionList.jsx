import { useState } from "react";

function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all"); 

  const filtered = transactions.filter((t) => {
    if (filter === "income") return t.amount > 0;
    if (filter === "expense") return t.amount < 0;
    return true; 
  });

  return (
    <div className="list-box">
      <div className="list-header">
        <h3>Transaction History</h3>

        <div className="filter-buttons">
          {["all", "income", "expense"].map((f) => (
            <button
              key={f}
              className={filter === f ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">No transactions found.</p>
      ) : (
        <ul>
          {filtered.map((t) => (
            <li key={t.id} className={t.amount > 0 ? "income-item" : "expense-item"}>
              <div className="t-info">
                <span className="t-title">{t.title}</span>
                {t.date && <span className="t-date">{t.date}</span>}
              </div>
              <span className="t-amount">
                {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toFixed(2)}
              </span>
              <button className="delete-btn" onClick={() => onDelete(t.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;