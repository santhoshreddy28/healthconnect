import React, { useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import styles from './Doctors.module.css';

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    initials: 'PS',
    color: '#0a6e6e',
    specialization: 'General Physician',
    rating: 4.9,
    patients: 2800,
    experience: 12,
    fee: 499,
    bio: 'MBBS, MD (Internal Medicine). Specialises in preventive care, chronic disease management, and general health consultations.',
    availableModes: ['Online', 'In-Clinic'],
    slots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
  },
  {
    id: 2,
    name: 'Dr. Rahul Mehta',
    initials: 'RM',
    color: '#0d9488',
    specialization: 'Dermatologist',
    rating: 4.8,
    patients: 1900,
    experience: 9,
    fee: 699,
    bio: 'MBBS, MD (Dermatology). Expert in skin conditions, acne, hair loss, and cosmetic dermatology.',
    availableModes: ['Online', 'In-Clinic'],
    slots: ['10:30 AM', '12:00 PM', '02:30 PM', '05:00 PM'],
  },
  {
    id: 3,
    name: 'Dr. Ananya Krishnan',
    initials: 'AK',
    color: '#f97316',
    specialization: 'Psychiatrist',
    rating: 4.95,
    patients: 1200,
    experience: 15,
    fee: 999,
    bio: 'MBBS, MD (Psychiatry). Provides confidential mental health care including anxiety, depression, and stress management.',
    availableModes: ['Online'],
    slots: ['11:00 AM', '01:00 PM', '03:00 PM', '06:00 PM'],
  },
  {
    id: 4,
    name: 'Dr. Vikram Nair',
    initials: 'VN',
    color: '#7c3aed',
    specialization: 'Urologist',
    rating: 4.7,
    patients: 3200,
    experience: 18,
    fee: 899,
    bio: 'MBBS, MS, MCh (Urology). Specialises in urological disorders, kidney stones, and mens health issues.',
    availableModes: ['Online', 'In-Clinic'],
    slots: ['09:30 AM', '11:00 AM', '03:30 PM', '05:30 PM'],
  },
  {
    id: 5,
    name: 'Dr. Sneha Patel',
    initials: 'SP',
    color: '#db2777',
    specialization: 'Gynaecologist',
    rating: 4.9,
    patients: 4100,
    experience: 14,
    fee: 799,
    bio: 'MBBS, MS (Obs & Gynae). Expert in womens health, reproductive care, and hormonal disorders.',
    availableModes: ['Online', 'In-Clinic'],
    slots: ['10:00 AM', '12:30 PM', '02:00 PM', '04:30 PM'],
  },
  {
    id: 6,
    name: 'Dr. Arjun Das',
    initials: 'AD',
    color: '#059669',
    specialization: 'Cardiologist',
    rating: 4.85,
    patients: 2400,
    experience: 20,
    fee: 1199,
    bio: 'MBBS, MD, DM (Cardiology). Specialises in heart disease prevention, hypertension, and cardiac rehabilitation.',
    availableModes: ['In-Clinic'],
    slots: ['08:30 AM', '10:30 AM', '01:30 PM', '04:00 PM'],
  },
];

const specializations = ['All', 'General Physician', 'Dermatologist', 'Psychiatrist', 'Urologist', 'Gynaecologist', 'Cardiologist'];

const Doctors = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('All');

  const filtered = DOCTORS.filter((d) => {
    const matchesSpec = filter === 'All' || d.specialization === filter;
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesMode = modeFilter === 'All' || d.availableModes.includes(modeFilter);
    return matchesSpec && matchesSearch && matchesMode;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className="fade-up">Find Your Doctor</h1>
        <p className="fade-up" style={{ animationDelay: '80ms' }}>
          {DOCTORS.length} verified specialists available across India
        </p>
      </div>

      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.filters}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="🔍  Search doctors or specialities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={styles.filterRow}>
            <div className={styles.chipGroup}>
              {specializations.map((s) => (
                <button
                  key={s}
                  className={`${styles.chip} ${filter === s ? styles.activeChip : ''}`}
                  onClick={() => setFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className={styles.modeGroup}>
              {['All', 'Online', 'In-Clinic'].map((m) => (
                <button
                  key={m}
                  className={`${styles.modeBtn} ${modeFilter === m ? styles.activeModeBtn : ''}`}
                  onClick={() => setModeFilter(m)}
                >
                  {m === 'Online' ? '💻 ' : m === 'In-Clinic' ? '🏥 ' : ''}
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <p className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? 's' : ''}
        </p>

        <div className={styles.list}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span>🔍</span>
              <p>No doctors found matching your search.</p>
              <button onClick={() => { setSearch(''); setFilter('All'); setModeFilter('All'); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            filtered.map((doc, i) => (
              <DoctorCard key={doc.id} doctor={doc} delay={i * 80} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
