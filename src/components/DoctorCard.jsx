import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ doctor, delay = 0 }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.card} fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.avatar} style={{ background: doctor.color }}>
        {doctor.initials}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.spec}>{doctor.specialization}</p>

        <div className={styles.tags}>
          <span className={styles.tag}>⭐ {doctor.rating}</span>
          <span className={styles.tag}>👥 {doctor.patients}+ patients</span>
          <span className={styles.tag}>🏥 {doctor.experience} yrs</span>
        </div>

        <p className={styles.bio}>{doctor.bio}</p>

        <div className={styles.footer}>
          <div>
            <span className={styles.feeLabel}>Consultation Fee</span>
            <span className={styles.fee}>₹{doctor.fee}</span>
          </div>
          <button
            className={styles.bookBtn}
            onClick={() => navigate('/book', { state: { doctor } })}
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
