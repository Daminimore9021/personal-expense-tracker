import React, { useState } from 'react';

export default function Auth({ type, setCurrentPage, setCurrentUser }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Submit Registration
    const handleRegister = (e) => {
        e.preventDefault();
        
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
            alert("Please fill in all registration fields.");
            return;
        }

        const newUser = {
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password: password
        };

        // Save registration and start active session
        localStorage.setItem("registeredUser", JSON.stringify(newUser));
        setCurrentUser(newUser);
        setCurrentPage('dashboard');
    };

    // Submit Login
    const handleLogin = (e) => {
        e.preventDefault();

        if (!loginUser.trim() || !loginPass) {
            alert("Please fill in all login fields.");
            return;
        }

        const registeredUserStr = localStorage.getItem("registeredUser");
        if (registeredUserStr) {
            const registeredUser = JSON.parse(registeredUserStr);
            if (
                (loginUser.toLowerCase() === registeredUser.email.toLowerCase() || 
                 loginUser.toLowerCase() === registeredUser.firstname.toLowerCase()) && 
                loginPass === registeredUser.password
            ) {
                setCurrentUser(registeredUser);
                setCurrentPage('dashboard');
                return;
            } else {
                alert("Invalid username/email or password.");
                return;
            }
        } else {
            // Seeding mock credentials if no user is registered
            const defaultDemo = {
                firstname: "Demo",
                lastname: "User",
                email: "demo@example.com"
            };
            setCurrentUser(defaultDemo);
            setCurrentPage('dashboard');
        }
    };

    return (
        <div className="auth-wrapper">
            <nav className="auth-nav">
                <div 
                    className="auth-logo" 
                    onClick={() => setCurrentPage('landing')}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <i className="bx bx-trending-up" style={{ fontSize: '28px', color: 'var(--primary-color)' }}></i>
                    <span>My FinSense</span>
                </div>
                <div className="auth-nav-button">
                    <button 
                        className={`btn-nav ${type === 'login' ? 'white-btn' : ''}`} 
                        onClick={() => { setShowPassword(false); setCurrentPage('login'); }}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`btn-nav ${type === 'register' ? 'white-btn' : ''}`} 
                        onClick={() => { setShowPassword(false); setCurrentPage('register'); }}
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            <div className="auth-form-box">
                {type === 'login' ? (
                    /* Login Form Container */
                    <div className="auth-container" id="login">
                        <div className="auth-top">
                            <span>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('register'); }}>Sign Up</a></span>
                            <h2 className="auth-header">Sign In</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="auth-input-box">
                                <input 
                                    type="text" 
                                    className="auth-input-field" 
                                    placeholder="Username or Email" 
                                    value={loginUser}
                                    onChange={(e) => setLoginUser(e.target.value)}
                                    required
                                />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="auth-input-box">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="auth-input-field" 
                                    placeholder="Password" 
                                    value={loginPass}
                                    onChange={(e) => setLoginPass(e.target.value)}
                                    required
                                />
                                <i className="bx bx-lock-alt"></i>
                                <i 
                                    className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} password-toggle-icon`}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: 'var(--text-secondary)',
                                        fontSize: '18px',
                                        zIndex: 10
                                    }}
                                ></i>
                            </div>
                            <button type="submit" className="auth-submit">Sign In</button>
                        </form>
                        <div className="auth-two-col">
                            <div className="one">
                                <input type="checkbox" id="login-check" />
                                <label htmlFor="login-check"> Remember Me</label>
                            </div>
                            <div className="two">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Registration Form Container */
                    <div className="auth-container" id="register">
                        <div className="auth-top">
                            <span>Have an account? <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}>Sign In</a></span>
                            <h2 className="auth-header">Sign Up</h2>
                        </div>
                        <form onSubmit={handleRegister}>
                            <div className="auth-two-forms">
                                <div className="auth-input-box">
                                    <input 
                                        type="text" 
                                        className="auth-input-field" 
                                        placeholder="Firstname" 
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                    />
                                    <i className="bx bx-user"></i>
                                </div>
                                <div className="auth-input-box">
                                    <input 
                                        type="text" 
                                        className="auth-input-field" 
                                        placeholder="Lastname" 
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                    <i className="bx bx-user"></i>
                                </div>
                            </div>
                            <div className="auth-input-box">
                                <input 
                                    type="email" 
                                    className="auth-input-field" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <i className="bx bx-envelope"></i>
                            </div>
                             <div className="auth-input-box">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="auth-input-field" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i className="bx bx-lock-alt"></i>
                                <i 
                                    className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} password-toggle-icon`}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: 'var(--text-secondary)',
                                        fontSize: '18px',
                                        zIndex: 10
                                    }}
                                ></i>
                            </div>
                            <button type="submit" className="auth-submit">Register</button>
                        </form>
                        <div className="auth-two-col">
                            <div className="one">
                                <input type="checkbox" id="register-check" />
                                <label htmlFor="register-check"> Remember Me</label>
                            </div>
                            <div className="two">
                                <a href="#">Terms & conditions</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
