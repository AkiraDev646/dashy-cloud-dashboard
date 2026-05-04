import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

Amplify.configure(awsconfig);

const navItems = [
  { to: '/', label: 'Today', end: true },
  { to: '/analytics', label: 'Daily Trends' },
  { to: '/settings', label: 'Preferences' },
];

function Layout({ user, signOut }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">D</div>
          <div>
            <h1>Dashy</h1>
            <p>Personal dashboard</p>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>Authenticated with Amazon Cognito</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">Daily dashboard</span>
            <h2>Dashy Control Center</h2>
          </div>
          <div className="user-area">
            <span>{user?.signInDetails?.loginId || user?.username}</span>
            <button type="button" onClick={signOut}>Sign out</button>
          </div>
        </header>

        <section className="content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <Layout user={user} signOut={signOut} />
        </Router>
      )}
    </Authenticator>
  );
}
