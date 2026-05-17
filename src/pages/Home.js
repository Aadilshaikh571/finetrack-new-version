import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../components/header/Header";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (loading) return null;

  return (
    <>
      <Header />

      <div className="home-container">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="badge">Personal Finance Tracker</span>
            <h1>Take Control of Your Finances</h1>
            <p>
              Track income, manage expenses, and visualize your money with
              powerful insights — all in one secure place.
            </p>

            {user ? (
              <button
                className="primary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard →
              </button>
            ) : (
              <button
                className="primary-btn"
                onClick={() => navigate("/signup")}
              >
                Get Started Free →
              </button>
            )}
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="stat-card">
            <h2>100%</h2>
            <p>Secure Data</p>
          </div>
          <div className="stat-card">
            <h2>10+</h2>
            <p>Categories</p>
          </div>
          <div className="stat-card">
            <h2>Real-Time</h2>
            <p>Analytics</p>
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose Finetrack?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <span>💰</span>
              <h3>Income Tracking</h3>
              <p>Track salary, freelancing, business income easily.</p>
            </div>

            <div className="feature-card">
              <span>📉</span>
              <h3>Expense Management</h3>
              <p>Understand and control your spending habits.</p>
            </div>

            <div className="feature-card">
              <span>📊</span>
              <h3>Visual Analytics</h3>
              <p>Beautiful charts for better financial decisions.</p>
            </div>

            <div className="feature-card">
              <span>🕒</span>
              <h3>History Overview</h3>
              <p>Access your complete transaction history.</p>
            </div>

            <div className="feature-card">
              <span>🥧</span>
              <h3>Category Insights</h3>
              <p>See where your money goes at a glance.</p>
            </div>

            <div className="feature-card">
              <span>🔐</span>
              <h3>Secure & Private</h3>
              <p>Your data is protected with Firebase security.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <p>Create Account</p>
            </div>
            <div className="step">
              <span>2</span>
              <p>Add Income & Expenses</p>
            </div>
            <div className="step">
              <span>3</span>
              <p>Track & Analyze</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Start Managing Your Money Smarter</h2>
          <p>
            Join Finetrack today and gain complete clarity over your finances.
          </p>
          <button className="primary-btn" onClick={() => navigate("/signup")}>
            Get Started Now
          </button>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Finetrack. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Home;
