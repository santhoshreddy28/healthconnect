import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styles from './Dashboard.module.css';

const statusConfig = {
  confirmed: { label: 'Confirmed', color: '#0a6e6e', bg: '#ccfbf1' },
  pending:   { label: 'Pending',   color: '#b45309', bg: '#fef3c7' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: '#fee2e2' },
};

const Dashboard = () => {
  const { appointments, cancelAppointment, user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcoming = appointments.filter((a) => a.status !== 'cancelled');
  const cancelled = appointments.filter((a) => a.status === 'cancelled');
  const list = activeTab === 'upcoming' ? upcoming : cancelled;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.welcomeBlock}>
            <div className={styles.avatar}>{user.avatar}</div>
            <div>
              <h1 className="fade-up">Hi, {user.name.split(' ')[0]} 👋</h1>
              <p className="fade-up" style={{ animationDelay: '80ms' }}>
                Manage your consultations and health records
              </p>
            </div>
          </div>

          <div className={styles.statsRow}>
            {[
              { label: 'Total Bookings', value: appointments.length },
              { label: 'Upcoming',       value: upcoming.length },
              { label: 'Cancelled',      value: cancelled.length },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`${styles.statCard} fade-up`}
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming ({upcoming.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'cancelled' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled ({cancelled.length})
            </button>
          </div>

          <button className={styles.newBtn} onClick={() => navigate('/book')}>
            + New Appointment
          </button>
        </div>

        {list.length === 0 ? (
          <div className={styles.empty}>
            <span>📋</span>
            <p>No {activeTab} appointments.</p>
            <button onClick={() => navigate('/book')}>Book Now →</button>
          </div>
        ) : (
          <div className={styles.cardList}>
            {list.map((apt, i) => {
              const s = statusConfig[apt.status] || statusConfig.pending;
              return (
                <div
                  key={apt.id}
                  className={`${styles.aptCard} fade-up`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={styles.aptLeft}>
                    <div className={styles.aptDate}>
                      <span className={styles.aptDay}>
                        {new Date(apt.date).toLocaleDateString('en-IN', { day: 'numeric' })}
                      </span>
                      <span className={styles.aptMonth}>
                        {new Date(apt.date).toLocaleDateString('en-IN', { month: 'short' })}
                      </span>
                    </div>
                  </div>

                  <div className={styles.aptMain}>
                    <div className={styles.aptTopRow}>
                      <h3 className={styles.aptDoctor}>{apt.doctorName}</h3>
                      <span
                        className={styles.aptStatus}
                        style={{ color: s.color, background: s.bg }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className={styles.aptSpec}>{apt.specialization}</p>
                    <div className={styles.aptMeta}>
                      <span>🕐 {apt.time}</span>
                      <span>{apt.mode === 'Online' ? '💻' : '🏥'} {apt.mode}</span>
                    </div>
                  </div>

                  {apt.status !== 'cancelled' && (
                    <div className={styles.aptActions}>
                      {apt.mode === 'Online' && apt.status === 'confirmed' && (
                        <button className={styles.joinBtn}>Join Call</button>
                      )}
                      <button
                        className={styles.cancelBtn}
                        onClick={() => cancelAppointment(apt.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
