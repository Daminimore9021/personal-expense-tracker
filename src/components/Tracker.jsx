import React, { useState, useEffect } from 'react';

// Categories Configuration
const CATEGORY_MAP = {
    food: { name: "Food & Dining", badge: "badge-food", icon: "bx-restaurant" },
    rent: { name: "Rent & Stay", badge: "badge-rent", icon: "bx-home" },
    shopping: { name: "Shopping", badge: "badge-shopping", icon: "bx-shopping-bag" },
    utilities: { name: "Utilities & Bills", badge: "badge-utilities", icon: "bx-cog" },
    entertainment: { name: "Entertainment", badge: "badge-entertainment", icon: "bx-movie-play" },
    travel: { name: "Travel & Fuel", badge: "badge-travel", icon: "bx-car" },
    salary: { name: "Salary & Income", badge: "badge-salary", icon: "bx-briefcase" },
    savings: { name: "Savings & Investments", badge: "badge-savings", icon: "bx-dollar-circle" },
    other: { name: "Others", badge: "badge-other", icon: "bx-grid-alt" }
};

const CATEGORIES_BY_TYPE = {
    expense: ["food", "rent", "shopping", "utilities", "entertainment", "travel", "other"],
    income: ["salary", "savings", "other"]
};

export default function Tracker({ transactions, setTransactions, searchTerm, setSearchTerm }) {
    // 1. Transaction Form States
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("food");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    // 2. Filter States
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");

    // Dynamic categories based on type
    useEffect(() => {
        const available = CATEGORIES_BY_TYPE[type];
        if (available && available.length > 0) {
            setCategory(available[0]); // default to first option
        }
    }, [type]);

    // Form Add Transaction
    const handleAdd = (e) => {
        e.preventDefault();

        if (!desc.trim() || !amount || parseFloat(amount) <= 0 || !date) {
            alert("Please fill in all transaction fields with valid entries.");
            return;
        }

        const amtVal = parseFloat(amount);
        const signedAmount = type === 'expense' ? -amtVal : amtVal;

        const newTrans = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            description: desc.trim(),
            amount: signedAmount,
            category: category,
            date: date
        };

        const updated = [...transactions, newTrans];
        setTransactions(updated);
        localStorage.setItem("trans", JSON.stringify(updated));

        // Reset inputs
        setDesc("");
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);
        alert("Transaction recorded!");
    };

    // Delete transaction
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this transaction record?")) {
            const updated = transactions.filter(t => t.id !== id);
            setTransactions(updated);
            localStorage.setItem("trans", JSON.stringify(updated));
        }
    };

    // Filter Logic
    const filteredTransactions = transactions.filter(t => {
        const matchesType = filterType === 'all' || 
            (filterType === 'income' && t.amount > 0) || 
            (filterType === 'expense' && t.amount < 0);

        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;

        const query = searchTerm.toLowerCase();
        const matchesSearch = t.description.toLowerCase().includes(query) || 
            (CATEGORY_MAP[t.category] && CATEGORY_MAP[t.category].name.toLowerCase().includes(query));

        return matchesType && matchesCategory && matchesSearch;
    });

    // Sort by date descending
    const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Get unique categories currently represented in transactions
    const presentCategories = [...new Set(transactions.map(t => t.category))];

    return (
        <section id="view-tracker" className="tab-content active">
            <div className="tracker-layout">
                {/* Left Form */}
                <div className="card form-card">
                    <h3>Add New Transaction</h3>
                    <form onSubmit={handleAdd}>
                        <div className="form-control">
                            <label htmlFor="desc">Description</label>
                            <input 
                                type="text" 
                                id="desc" 
                                placeholder="e.g., Grocery, Rent, Salary" 
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="amount">Amount (₹)</label>
                            <input 
                                type="number" 
                                id="amount" 
                                min="0.01" 
                                step="any"
                                placeholder="e.g., 500" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="type">Transaction Type</label>
                            <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="category">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {CATEGORIES_BY_TYPE[type].map(key => (
                                    <option key={key} value={key}>{CATEGORY_MAP[key].name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Transaction</button>
                    </form>
                </div>

                {/* Right Ledger */}
                <div className="card history-card">
                    <div className="history-header">
                        <h3>Transaction Ledger</h3>
                        <div className="filter-controls">
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                <option value="all">All Categories</option>
                                {presentCategories.map(catKey => {
                                    const catObj = CATEGORY_MAP[catKey];
                                    return catObj ? (
                                        <option key={catKey} value={catKey}>{catObj.name}</option>
                                    ) : null;
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="ledger-search">
                        <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="ledger-container">
                        <table className="ledger-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="empty-state">No transaction records found.</td>
                                    </tr>
                                ) : (
                                    sortedTransactions.map(t => {
                                        const sign = t.amount < 0 ? "-" : "+";
                                        const amtClass = t.amount < 0 ? "text-danger" : "text-success";
                                        const catObj = CATEGORY_MAP[t.category] || CATEGORY_MAP["other"];

                                        return (
                                            <tr key={t.id}>
                                                <td>{t.date}</td>
                                                <td><strong>{t.description}</strong></td>
                                                <td><span className={`badge ${catObj.badge}`}>{catObj.name}</span></td>
                                                <td className={amtClass}><strong>{sign} ₹ {Math.abs(t.amount).toFixed(2)}</strong></td>
                                                <td>
                                                    <button 
                                                        className="btn-delete" 
                                                        onClick={() => handleDelete(t.id)} 
                                                        title="Delete Transaction"
                                                    >
                                                        <i className="bx bx-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
