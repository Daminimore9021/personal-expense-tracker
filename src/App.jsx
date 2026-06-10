import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import Quiz from './components/Quiz';
import Playlist from './components/Playlist';
import Profile from './components/Profile';

export default function App() {
    // 1. Core States
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'login', 'register', 'dashboard'
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'tracker', 'quiz', 'videos', 'profile'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [budgetLimit, setBudgetLimit] = useState(10000);
    const [searchTerm, setSearchTerm] = useState("");

    // 2. Load Init Session and Local Storage Data
    useEffect(() => {
        // Authenticate Session Check
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
            setCurrentPage('dashboard');
        }

        // Budget Limit Check
        const storedBudget = localStorage.getItem("budgetLimit");
        if (storedBudget) {
            setBudgetLimit(parseFloat(storedBudget));
        } else {
            localStorage.setItem("budgetLimit", 10000);
        }

        // Ledger List Check
        const storedTrans = localStorage.getItem("trans");
        if (storedTrans) {
            setTransactions(JSON.parse(storedTrans));
        } else {
            // Default seeding data
            const today = new Date().toISOString().split("T")[0];
            const getRelativeDate = (offset) => {
                const d = new Date();
                d.setDate(d.getDate() + offset);
                return d.toISOString().split("T")[0];
            };
            const defaultSeed = [
                { id: 1, description: "Salary", amount: 45000, category: "salary", date: getRelativeDate(0) },
                { id: 2, description: "Rent Payment", amount: -12000, category: "rent", date: getRelativeDate(-2) },
                { id: 3, description: "Grocery Store", amount: -1500, category: "food", date: getRelativeDate(-1) },
                { id: 4, description: "Electricity Bill", amount: -2200, category: "utilities", date: getRelativeDate(0) },
                { id: 5, description: "Mutual Fund Investment", amount: 5000, category: "savings", date: getRelativeDate(0) }
            ];
            setTransactions(defaultSeed);
            localStorage.setItem("trans", JSON.stringify(defaultSeed));
        }
    }, []);

    // 3. Write updates back to local storage
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("budgetLimit", budgetLimit);
    }, [budgetLimit]);

    useEffect(() => {
        if (transactions.length > 0) {
            localStorage.setItem("trans", JSON.stringify(transactions));
        }
    }, [transactions]);

    // 4. Logout Action
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            setCurrentUser(null);
            setCurrentPage('landing');
            setActiveTab('dashboard');
        }
    };

    // Global Search redirect
    const handleGlobalSearch = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        setActiveTab('tracker');
    };

    // --- Onboarding Landing Page ---
    if (currentPage === 'landing') {
        return (
            <div className="landing-body">
                <div className="landing-overlay"></div>
                <div className="landing-container">
                    <div className="landing-logo">My FinSense</div>
                    <h1>Take Control <br />of your Expenses</h1>
                    <div className="landing-divider"></div>
                    <h2>A modern space to keep your daily expenses in check with real-time analytics, budgets, and insights.</h2>
                    <div className="btn-group">
                        <button className="landing-btn landing-btn-signin" onClick={() => setCurrentPage('login')}>Sign In</button>
                        <button className="landing-btn landing-btn-signup" onClick={() => setCurrentPage('register')}>Register</button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Authentication Pages ---
    if (currentPage === 'login' || currentPage === 'register') {
        return (
            <Auth 
                type={currentPage} 
                setCurrentPage={setCurrentPage} 
                setCurrentUser={setCurrentUser} 
            />
        );
    }

    // --- Logged-In App Dashboard Shell ---
    return (
        <div className="app-shell-root">
            {/* Header navbar */}
            <header>
                <div className="logosec">
                    <div 
                        className="logo" 
                        onClick={() => setActiveTab('dashboard')} 
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <i className="bx bx-trending-up" style={{ fontSize: '28px', color: 'var(--primary-color)' }}></i>
                        <span>My FinSense</span>
                    </div>
                </div>

                <div className="searchbar">
                    <input 
                        type="text" 
                        placeholder="Search transactions..." 
                        value={searchTerm} 
                        onChange={handleGlobalSearch} 
                    />
                    <div className="searchbtn">
                        <i className="bx bx-search icn srchicn" style={{ color: 'white', fontSize: '20px' }}></i>
                    </div>
                </div>

                <div className="message">
                    <div className="circle"></div>
                    <i className="bx bx-bell icn" style={{ fontSize: '24px', color: '#4b49ac' }}></i>
                    <div className="dp" onClick={() => setActiveTab('profile')}>
                        <img 
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" 
                            className="dpicn" 
                            alt="dp" 
                        />
                    </div>
                </div>
            </header>

            <div className="main-container">
                {/* Navigation Sidebar */}
                <div className={`navcontainer ${isSidebarOpen ? '' : 'navclose'}`}>
                    <nav className="nav">
                        <div className="nav-upper-options">
                            <div 
                                className={`nav-option option-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <i className="bx bx-pie-chart-alt-2 nav-icon"></i>
                                <h3>Dashboard</h3>
                            </div>
                            
                            <div 
                                className={`nav-option option-tab ${activeTab === 'tracker' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tracker')}
                            >
                                <i className="bx bx-receipt nav-icon"></i>
                                <h3>Expense Tracker</h3>
                            </div>

                            <div 
                                className={`nav-option option-tab ${activeTab === 'quiz' ? 'active' : ''}`}
                                onClick={() => setActiveTab('quiz')}
                            >
                                <i className="bx bx-brain nav-icon"></i>
                                <h3>Financial Quiz</h3>
                            </div>

                            <div 
                                className={`nav-option option-tab ${activeTab === 'videos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('videos')}
                            >
                                <i className="bx bx-play-circle nav-icon"></i>
                                <h3>Videos Playlist</h3>
                            </div>

                            <div 
                                className={`nav-option option-tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <i className="bx bx-user-circle nav-icon"></i>
                                <h3>Profile Settings</h3>
                            </div>
                        </div>

                        <div 
                            className="nav-option collapse-tab" 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{ marginTop: 'auto' }}
                        >
                            <i className={`bx ${isSidebarOpen ? 'bx-chevron-left' : 'bx-chevron-right'} nav-icon`}></i>
                            <h3>Collapse Menu</h3>
                        </div>

                        <div className="nav-option logout" onClick={handleLogout} style={{ marginTop: '10px' }}>
                            <i className="bx bx-power-off nav-icon"></i>
                            <h3>Logout</h3>
                        </div>
                    </nav>
                </div>

                {/* Main Content viewport */}
                <main className="main">
                    {activeTab === 'dashboard' && (
                        <Dashboard 
                            transactions={transactions} 
                            budgetLimit={budgetLimit} 
                            currentUser={currentUser}
                            setActiveTab={setActiveTab} 
                        />
                    )}

                    {activeTab === 'tracker' && (
                        <Tracker 
                            transactions={transactions} 
                            setTransactions={setTransactions} 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    )}

                    {activeTab === 'quiz' && (
                        <Quiz />
                    )}

                    {activeTab === 'videos' && (
                        <Playlist />
                    )}

                    {activeTab === 'profile' && (
                        <Profile 
                            transactions={transactions}
                            setTransactions={setTransactions}
                            budgetLimit={budgetLimit}
                            setBudgetLimit={setBudgetLimit}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
