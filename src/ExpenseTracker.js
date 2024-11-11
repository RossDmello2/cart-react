import React, { useState } from 'react';

const styles = `
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .header h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .header p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
    font-weight: 500;
  }

  .form-control {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }

  .btn:hover {
    background: #2980b9;
  }

  .btn-block {
    width: 100%;
  }

  .btn-danger {
    background: #e74c3c;
  }

  .btn-danger:hover {
    background: #c0392b;
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #2c3e50;
  }

  .text-success {
    color: #27ae60;
  }

  .text-danger {
    color: #e74c3c;
  }

  .stat-label {
    color: #7f8c8d;
    margin-top: 0.5rem;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f8f9fa;
    font-weight: 500;
  }

  .delete-btn {
    color: #e74c3c;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .delete-btn:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(2500);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: 'utilities',
      amount: 200.00,
      date: '2024-11-15'
    }
  ]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleSetBudget = (e) => {
    e.preventDefault();
    const budgetInput = document.getElementById('budget').value;
    setBudget(Number(budgetInput));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      category,
      amount: Number(amount),
      date,
    };

    setExpenses([...expenses, newExpense]);
    setCategory('');
    setAmount('');
    setDate('');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <header className="header">
          <h1>Expense Tracker By Ross</h1>
          <p>Manage your finances with ease</p>
        </header>

        <div className="grid">
          <div className="card">
            <h2>Set Monthly Budget</h2>
            <form onSubmit={handleSetBudget}>
              <div className="form-group">
                <label htmlFor="budget">Budget Amount</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="number"
                    id="budget"
                    className="form-control"
                    placeholder="Enter budget amount"
                    defaultValue={budget}
                  />
                  <button type="submit" className="btn">Set Budget</button>
                </div>
              </div>
            </form>
          </div>

          <div className="card">
            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="utilities">Utilities</option>
                  <option value="rent">Rent</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  className="form-control"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-block">Add Expense</button>
            </form>
          </div>

          <div className="card">
            <h2>Expenses Overview</h2>
            <div className="stats">
              <div className="stat-card">
                <div className="stat-value">₹{totalExpenses.toFixed(2)}</div>
                <div className="stat-label">Total Expenses</div>
              </div>
              <div className="stat-card">
                <div className={`stat-value ${remainingBudget < 0 ? 'text-danger' : 'text-success'}`}>
                  ₹{remainingBudget.toFixed(2)}
                </div>
                <div className="stat-label">Remaining Budget</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Expense List</h2>
          <div className="form-group">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map(expense => (
                  <tr key={expense.id}>
                    <td style={{ textTransform: 'capitalize' }}>{expense.category}</td>
                    <td>₹{expense.amount.toFixed(2)}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;