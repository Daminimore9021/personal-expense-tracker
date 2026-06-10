import React, { useState } from 'react';

const FEEDBACKS = [
    {
        badge: "Frugal Planner & Budgeter",
        text: "You are highly disciplined with your money. You don't shop very often, and when you do, you know exactly what you want and where to find it. You are highly conscious of your spending limits, and usually avoid buying what you don't need unless it represents a clear investment or value."
    },
    {
        badge: "Balanced & Bargain Shopper",
        text: "You strive to maintain balance, but occasionally give in to impulse. Start by taking control of your smaller impulse expenses. This might mean occasionally stepping back from discount offers you really want but don't need, and focusing on automating savings."
    },
    {
        badge: "Impulsive / Emotional Spender",
        text: "You need to commit to the process of improving your financial situation. Consistent tracking, establishing hard budgets (using our Settings pane), and pausing before luxury transactions will help you avoid debt, accumulate savings, and succeed financially."
    }
];

export default function Quiz() {
    const [priority, setPriority] = useState("");
    const [activity, setActivity] = useState("");
    const [genre, setGenre] = useState("");
    const [choice, setChoice] = useState("");
    const [action, setAction] = useState("");
    const [question, setQuestion] = useState("");
    const [done, setDone] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!priority || !activity || !genre || !choice || !action || !question || !done) {
            alert("Please answer all multiple-choice questions before submitting.");
            return;
        }

        // Initialize tallies
        let quiet = 0;
        let spoon = 0;
        let willie = 0;

        const answers = [priority, activity, genre, choice, action, question, done];
        answers.forEach(val => {
            if (val === "quiet") quiet++;
            if (val === "spoon") spoon++;
            if (val === "willie") willie++;
        });

        // Find highest score
        const scores = [quiet, spoon, willie];
        const maxScore = Math.max(...scores);

        let selectIndex = 0;
        for (let i = 0; i < scores.length; i++) {
            if (scores[i] === maxScore) {
                selectIndex = i; // tie-breaker picks last encountered
            }
        }

        setResult(FEEDBACKS[selectIndex]);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setPriority("");
        setActivity("");
        setGenre("");
        setChoice("");
        setAction("");
        setQuestion("");
        setDone("");
        setIsSubmitted(false);
        setResult(null);
    };

    return (
        <section id="view-quiz" className="tab-content active">
            <div className="card quiz-card">
                <div className="quiz-header">
                    <h1>Financial Intelligence Quiz</h1>
                    <p>Evaluate your spending behaviors, saving habits, and general financial mindset.</p>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        {/* Question 1 */}
                        <div className="quiz-question">
                            <p className="question-title">1. Which of the following should you prioritize putting your money toward first?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="priority" 
                                        value="quiet" 
                                        checked={priority === 'quiet'}
                                        onChange={() => setPriority('quiet')}
                                        required 
                                    /> 
                                    <span>Emergency Savings (Building a safety net)</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="priority" 
                                        value="spoon" 
                                        checked={priority === 'spoon'}
                                        onChange={() => setPriority('spoon')}
                                    /> 
                                    <span>Paying Off High-Interest Debt</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="priority" 
                                        value="willie" 
                                        checked={priority === 'willie'}
                                        onChange={() => setPriority('willie')}
                                    /> 
                                    <span>Luxury Shopping & Dining Out</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 2 */}
                        <div className="quiz-question">
                            <p className="question-title">2. How do you track or manage your shopping activities?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="activity" 
                                        value="quiet" 
                                        checked={activity === 'quiet'}
                                        onChange={() => setActivity('quiet')}
                                        required 
                                    /> 
                                    <span>Strictly as needed, buying only what's on my list (0-3 times a month)</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="activity" 
                                        value="spoon" 
                                        checked={activity === 'spoon'}
                                        onChange={() => setActivity('spoon')}
                                    /> 
                                    <span>Occasional shopping, sometimes going through splurge phases (4-6 times a month)</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="activity" 
                                        value="willie" 
                                        checked={activity === 'willie'}
                                        onChange={() => setActivity('willie')}
                                    /> 
                                    <span>Frequently, shopping is a way of life or therapy (7+ times a month)</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 3 */}
                        <div className="quiz-question">
                            <p className="question-title">3. Under what circumstances do you usually buy new clothes?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="genre" 
                                        value="quiet" 
                                        checked={genre === 'quiet'}
                                        onChange={() => setGenre('quiet')}
                                        required 
                                    /> 
                                    <span>Only when I need something specific or old clothes wear out</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="genre" 
                                        value="spoon" 
                                        checked={genre === 'spoon'}
                                        onChange={() => setGenre('spoon')}
                                    /> 
                                    <span>Whenever there is a good discount sale happening</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="genre" 
                                        value="willie" 
                                        checked={genre === 'willie'}
                                        onChange={() => setGenre('willie')}
                                    /> 
                                    <span>Whenever I see something I like, regardless of need</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 4 */}
                        <div className="quiz-question">
                            <p className="question-title">4. How do you react to "Buy One, Get One Free" deals?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="choice" 
                                        value="quiet" 
                                        checked={choice === 'quiet'}
                                        onChange={() => setChoice('quiet')}
                                        required 
                                    /> 
                                    <span>I ignore it unless it's a product I already buy regularly</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="choice" 
                                        value="spoon" 
                                        checked={choice === 'spoon'}
                                        onChange={() => setChoice('spoon')}
                                    /> 
                                    <span>I check it out and might buy if it looks like a reasonable bargain</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="choice" 
                                        value="willie" 
                                        checked={choice === 'willie'}
                                        onChange={() => setChoice('willie')}
                                    /> 
                                    <span>I almost always feel compelled to buy to avoid missing out</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 5 */}
                        <div className="quiz-question">
                            <p className="question-title">5. What is your style when going grocery shopping?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="action" 
                                        value="quiet" 
                                        checked={action === 'quiet'}
                                        onChange={() => setAction('quiet')}
                                        required 
                                    /> 
                                    <span>I shop strictly from a prepared list and stick to it</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="action" 
                                        value="spoon" 
                                        checked={action === 'spoon'}
                                        onChange={() => setAction('spoon')}
                                    /> 
                                    <span>I look for active sales and stock up on discount items</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="action" 
                                        value="willie" 
                                        checked={action === 'willie'}
                                        onChange={() => setAction('willie')}
                                    /> 
                                    <span>I buy whatever catches my attention, often leaving with double the items</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 6 */}
                        <div className="quiz-question">
                            <p className="question-title">6. Do you consistently set aside savings every month?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="question" 
                                        value="quiet" 
                                        checked={question === 'quiet'}
                                        onChange={() => setQuestion('quiet')}
                                        required 
                                    /> 
                                    <span>Yes, I save a fixed portion of my income automatically every month</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="question" 
                                        value="spoon" 
                                        checked={question === 'spoon'}
                                        onChange={() => setQuestion('spoon')}
                                    /> 
                                    <span>Sometimes, if I have money left over at the end of the month</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="question" 
                                        value="willie" 
                                        checked={question === 'willie'}
                                        onChange={() => setQuestion('willie')}
                                    /> 
                                    <span>Rarely, I find it difficult to save anything substantial</span>
                                </label>
                            </div>
                        </div>

                        {/* Question 7 */}
                        <div className="quiz-question">
                            <p className="question-title">7. When you are on a vacation, you typically...?</p>
                            <div className="quiz-options">
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="done" 
                                        value="quiet" 
                                        checked={done === 'quiet'}
                                        onChange={() => setDone('quiet')}
                                        required 
                                    /> 
                                    <span>Focus on experiences/sightseeing and spend very little on shopping</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="done" 
                                        value="spoon" 
                                        checked={done === 'spoon'}
                                        onChange={() => setDone('spoon')}
                                    /> 
                                    <span>Hit up local outlet stores looking for good deals and souvenirs</span>
                                </label>
                                <label className="radio-label">
                                    <input 
                                        type="radio" 
                                        name="done" 
                                        value="willie" 
                                        checked={done === 'willie'}
                                        onChange={() => setDone('willie')}
                                    /> 
                                    <span>Spend heavily on high-end items, souvenirs, and dining out</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Submit Quiz</button>
                    </form>
                ) : (
                    /* Results Container */
                    <div id="quiz-result" className="quiz-result-container" style={{ display: 'block' }}>
                        <h3>Your Financial Mindset Result</h3>
                        <div className="badge-feedback" id="quiz-result-badge">{result ? result.badge : ''}</div>
                        <p id="quiz-result-text">{result ? result.text : ''}</p>
                        <button className="btn btn-secondary" onClick={handleReset}>Retake Quiz</button>
                    </div>
                )}
            </div>
        </section>
    );
}
