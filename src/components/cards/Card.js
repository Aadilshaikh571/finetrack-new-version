import React from "react";
import "./style.css";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  expenses,
  totalBalance,
  income,
}) => {
  return (
    <div className="kpi-container">
      {/* BALANCE */}
      <div className="kpi-card neutral">
        <div className="kpi-header">
          <span className="kpi-dot blue"></span>
          <p>Current Balance</p>
        </div>
        <h2>₹ {totalBalance}</h2>
        <span className="kpi-sub">Available balance</span>
      </div>

      {/* INCOME */}
      <div className="kpi-card success">
        <div className="kpi-header">
          <span className="kpi-dot green"></span>
          <p>Total Income</p>
        </div>
        <h2>₹ {income}</h2>
        <button className="kpi-btn" onClick={showIncomeModal}>
          Add Income
        </button>
      </div>

      {/* EXPENSE */}
      <div className="kpi-card danger">
        <div className="kpi-header">
          <span className="kpi-dot red"></span>
          <p>Total Expense</p>
        </div>
        <h2>₹ {expenses}</h2>
        <button className="kpi-btn outline" onClick={showExpenseModal}>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default Cards;
