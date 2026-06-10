import React, { useState } from 'react';

export default function Profile({ 
    transactions, 
    setTransactions, 
    budgetLimit, 
    setBudgetLimit, 
    currentUser, 
    setCurrentUser, 
    setCurrentPage 
}) {
    const [localBudgetInput, setLocalBudgetInput] = useState(budgetLimit);

    // Calculate Highest Expense
    let maxExpense = 0;
    transactions.forEach(t => {
        if (t.amount < 0) {
            const abs = Math.abs(t.amount);
            if (abs > maxExpense) {
                maxExpense = abs;
            }
        }
    });

    const handleSaveBudget = () => {
        const val = parseFloat(localBudgetInput);
        if (isNaN(val) || val < 0) {
            alert("Please enter a valid positive number for your monthly budget.");
            return;
        }

        setBudgetLimit(val);
        localStorage.setItem("budgetLimit", val);
        alert("Budget limit updated successfully!");
    };

    const handleResetAll = () => {
        if (window.confirm("WARNING: This will permanently wipe all transactions, statistics, and budget limits. Are you sure you want to proceed?")) {
            // Clear React states
            setTransactions([]);
            setBudgetLimit(10000);
            setLocalBudgetInput(10000);

            // Clear localStorage
            localStorage.removeItem("trans");
            localStorage.removeItem("budgetLimit");
            
            alert("All ledger data has been reset to defaults.");
        }
    };

    return (
        <section id="view-profile" className="tab-content active">
            <div className="profile-layout">
                {/* Left Card: Avatar & Stats */}
                <div className="card user-details-card">
                    <div className="profile-header-avatar">
                        <img 
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" 
                            alt="Profile avatar" 
                        />
                        <h3>{currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : 'Demo User'}</h3>
                        <p>{currentUser ? currentUser.email : 'demo@example.com'}</p>
                    </div>
                    <div className="profile-stats">
                        <div className="stat-box">
                            <span className="stat-val" id="stats-total-trans">{transactions.length}</span>
                            <span className="stat-label">Transactions</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-val" id="stats-highest-exp">₹ {maxExpense.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                            <span className="stat-label">Highest Expense</span>
                        </div>
                    </div>
                </div>

                {/* Right Column Configurations */}
                <div className="profile-configs">
                    <div className="card config-card">
                        <h3>Monthly Budget Settings</h3>
                        <p>Define your monthly spending limit to receive warnings when exceeding it.</p>
                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label htmlFor="budgetLimitInput" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Monthly Budget (₹)</label>
                            <div className="input-with-button">
                                <input 
                                    type="number" 
                                    id="budgetLimitInput" 
                                    placeholder="Enter budget limit, e.g., 15000" 
                                    value={localBudgetInput}
                                    onChange={(e) => setLocalBudgetInput(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleSaveBudget}>Save Limit</button>
                            </div>
                        </div>
                    </div>

                    <div className="card config-card danger-card">
                        <h3>Danger Zone</h3>
                        <p>Clearing data will remove all transactions and restore settings to their default values.</p>
                        <button className="btn btn-danger" onClick={handleResetAll}>Reset All Ledger Data</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
