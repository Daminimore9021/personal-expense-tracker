import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Category Definitions
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

export default function Dashboard({ transactions, budgetLimit, currentUser, setActiveTab }) {
    const overviewCanvasRef = useRef(null);
    const categoryCanvasRef = useRef(null);
    const overviewChartInst = useRef(null);
    const categoryChartInst = useRef(null);

    // Compute Totals
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        totalBalance += t.amount;
        if (t.amount > 0) {
            totalIncome += t.amount;
        } else {
            totalExpense += Math.abs(t.amount);
        }
    });

    // Budget Calculations
    const actualPercent = budgetLimit > 0 ? ((totalExpense / budgetLimit) * 100).toFixed(0) : 0;
    const progressWidth = Math.min(parseFloat(actualPercent), 100);

    let progressClass = "progress-bar";
    let budgetStatusText = "";
    if (actualPercent >= 100) {
        progressClass += " danger";
        budgetStatusText = `Alert: You have exceeded your monthly budget by ₹ ${(totalExpense - budgetLimit).toLocaleString("en-IN", { minimumFractionDigits: 2 })}!`;
    } else if (actualPercent >= 80) {
        progressClass += " warning";
        budgetStatusText = `Warning: You have utilized over 80% of your budget limit.`;
    } else {
        budgetStatusText = `Budget Limit Status: Safe. You have ₹ ${(budgetLimit - totalExpense).toLocaleString("en-IN", { minimumFractionDigits: 2 })} remaining this month.`;
    }

    // Chart.js render effect
    useEffect(() => {
        // Destroy existing chart instances
        if (overviewChartInst.current) overviewChartInst.current.destroy();
        if (categoryChartInst.current) categoryChartInst.current.destroy();

        // 1. Render Overview Bar Chart
        if (overviewCanvasRef.current) {
            overviewChartInst.current = new Chart(overviewCanvasRef.current, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses'],
                    datasets: [{
                        data: [totalIncome, totalExpense],
                        backgroundColor: ['#00d28a', '#ff5252'],
                        borderColor: ['#17ffb2', '#ff7676'],
                        borderWidth: 1,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: { color: '#a9a6c2' }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { color: '#a9a6c2' }
                        }
                    }
                }
            });
        }

        // 2. Render Expense Category Breakdown
        const categorySums = {};
        transactions.forEach(t => {
            if (t.amount < 0) {
                const cat = t.category || "other";
                categorySums[cat] = (categorySums[cat] || 0) + Math.abs(t.amount);
            }
        });

        const categoryLabels = Object.keys(categorySums).map(key => CATEGORY_MAP[key] ? CATEGORY_MAP[key].name : key);
        const categoryData = Object.values(categorySums);
        const chartColors = ["#fdcb6e", "#0984e3", "#e84393", "#6c5ce7", "#d63031", "#e17055", "#b2bec3", "#ffe066"];

        if (categoryCanvasRef.current) {
            categoryChartInst.current = new Chart(categoryCanvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: categoryLabels.length > 0 ? categoryLabels : ["No Expenses"],
                    datasets: [{
                        data: categoryData.length > 0 ? categoryData : [1],
                        backgroundColor: categoryData.length > 0 ? chartColors.slice(0, categoryLabels.length) : ["rgba(255,255,255,0.05)"],
                        borderWidth: 1,
                        borderColor: '#161226'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#a9a6c2', font: { size: 11 } }
                        }
                    }
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (overviewChartInst.current) overviewChartInst.current.destroy();
            if (categoryChartInst.current) categoryChartInst.current.destroy();
        };
    }, [transactions, totalIncome, totalExpense]);

    // Sorting out top 5 recent records
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <section id="view-dashboard" className="tab-content active">
            <div className="welcome-banner">
                <h2 className="welcome-msg">Welcome Back, {currentUser ? currentUser.firstname : 'Demo'}!</h2>
                <p>Track your money flow and manage your spending habits efficiently.</p>
            </div>

            <div className="box-container">
                <div className="box box1">
                    <div className="text">
                        <h2 className="topic-heading">₹ {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        <h2 className="topic">Total Balance</h2>
                    </div>
                    <i className="bx bx-money box-icon"></i>
                </div>

                <div className="box box2">
                    <div className="text">
                        <h2 className="topic-heading text-success">₹ {totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        <h2 className="topic">Monthly Income</h2>
                    </div>
                    <i className="bx bx-trending-up box-icon text-success"></i>
                </div>

                <div className="box box3">
                    <div className="text">
                        <h2 className="topic-heading text-danger">₹ {totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        <h2 className="topic">Monthly Expense</h2>
                    </div>
                    <i className="bx bx-trending-down box-icon text-danger"></i>
                </div>

                <div className="box box4">
                    <div className="text">
                        <h2 className="topic-heading">₹ {budgetLimit.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h2>
                        <h2 className="topic">Budget Limit</h2>
                    </div>
                    <i className="bx bx-credit-card box-icon"></i>
                </div>
            </div>

            {/* Budget Progress Card */}
            <div className="card budget-card">
                <div className="budget-header">
                    <h3>Monthly Budget Usage</h3>
                    <span className="budget-percentage">{actualPercent}% Used</span>
                </div>
                <div className="progress-bar-container">
                    <div className={progressClass} style={{ width: `${progressWidth}%` }}></div>
                </div>
                <p className="budget-hint" style={{
                    color: actualPercent >= 100 ? 'var(--danger-color)' : actualPercent >= 80 ? 'var(--warning-color)' : 'var(--text-secondary)',
                    fontWeight: actualPercent >= 80 ? '600' : 'normal'
                }}>
                    {actualPercent >= 80 && <i className="bx bx-error-circle" style={{ marginRight: '6px' }}></i>}
                    {budgetStatusText}
                </p>
            </div>

            {/* Chart Grid Panels */}
            <div className="charts-grid">
                <div className="card chart-card">
                    <h3>Income vs Expense Overview</h3>
                    <div className="chart-container">
                        <canvas ref={overviewCanvasRef}></canvas>
                    </div>
                </div>
                <div className="card chart-card">
                    <h3>Expense Categories Distribution</h3>
                    <div className="chart-container">
                        <canvas ref={categoryCanvasRef}></canvas>
                    </div>
                </div>
            </div>

            {/* Recent Ledger items */}
            <div className="card recent-card">
                <div className="recent-header">
                    <h3>Recent Transactions</h3>
                    <button className="btn-text" onClick={() => setActiveTab('tracker')}>View All</button>
                </div>
                <div className="recent-list-container">
                    {recentTransactions.length === 0 ? (
                        <p className="empty-state">No transactions added yet.</p>
                    ) : (
                        <ul className="recent-list">
                            {recentTransactions.map(t => {
                                const sign = t.amount < 0 ? "-" : "+";
                                const amtClass = t.amount < 0 ? "text-danger" : "text-success";
                                const iconType = t.amount < 0 ? "expense-icon" : "income-icon";
                                const catObj = CATEGORY_MAP[t.category] || CATEGORY_MAP["other"];

                                return (
                                    <li className="recent-item" key={t.id}>
                                        <div className="recent-left">
                                            <div className={`cat-icon-wrapper ${iconType}`}>
                                                <i className={`bx ${catObj.icon}`}></i>
                                            </div>
                                            <div className="recent-info">
                                                <h4>{t.description}</h4>
                                                <span>{t.date} &bull; {catObj.name}</span>
                                            </div>
                                        </div>
                                        <div className={`recent-amount ${amtClass}`}>
                                            {sign} ₹ {Math.abs(t.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
