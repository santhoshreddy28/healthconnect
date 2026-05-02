import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const stats = [
  { value: '200+', label: 'Expert Doctors' },
  { value: '50K+', label: 'Happy Patients' },
  { value: '25+', label: 'Clinics Nationwide' },
  { value: '4.9★', label: 'Average Rating' },
];

const specialties = [
  { icon: '🫀', name: 'Cardiology' },
  { icon: '🧠', name: 'Neurology' },
  { icon: '🦷', name: 'Dentistry' },
  { icon: '👁️', name: 'Ophthalmology' },
  { icon: '🩺', name: 'General Medicine' },
  { icon: '🧬', name: 'Dermatology' },
  { icon: '🦴', name: 'Orthopedics' },
  { icon: '🧘', name: 'Mental Health' },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/doctors');
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={`${styles.badge} fade-up`}>🇮🇳 India's Trusted Health Platform</div>
          <h1 className={`${styles.heroTitle} fade-up`} style={{ animationDelay: '80ms' }}>
            Healthcare that <br />
            <em>actually cares</em>
          </h1>
          <p className={`${styles.heroSub} fade-up`} style={{ animationDelay: '160ms' }}>
            Book consultations with top doctors across India — online or in-clinic.
            Affordable, accessible, and always confidential.
          </p>

          <form
            className={`${styles.searchBox} fade-up`}
            style={{ animationDelay: '240ms' }}
            onSubmit={handleSearch}
          >
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search by doctor, speciality, or symptom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Find Doctors</button>
          </form>

          <div className={`${styles.statsRow} fade-up`} style={{ animationDelay: '320ms' }}>
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Browse by Speciality</h2>
            <p>Find the right specialist for your healthcare needs</p>
          </div>
          <div className={styles.specialtyGrid}>
            {specialties.map((s, i) => (
              <button
                key={s.name}
                className={`${styles.specialtyCard} fade-up`}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => navigate('/doctors')}
              >
                <span className={styles.specIcon}>{s.icon}</span>
                <span className={styles.specName}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>How HealthConnect Works</h2>
            <p>Three simple steps to better healthcare</p>
          </div>
          <div className={styles.steps}>
            {[
              { num: '01', title: 'Find a Doctor', desc: 'Browse verified specialists by speciality, location, or rating.' },
              { num: '02', title: 'Book an Appointment', desc: 'Pick your preferred date, time, and consultation mode — online or in-clinic.' },
              { num: '03', title: 'Get Consultation', desc: 'Connect with your doctor and receive personalised care from home.' },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`${styles.step} fade-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Your health journey starts today</h2>
          <p>Join thousands of patients who trust HealthConnect for their care.</p>
          <button className={styles.ctaBtn} onClick={() => navigate('/book')}>
            Book Your First Consultation →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
