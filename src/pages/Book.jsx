import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DOCTORS } from './Doctors';
import styles from './Book.module.css';

const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return {
    label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
    value: d.toISOString().split('T')[0],
  };
});

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addAppointment } = useApp();

  const preselected = location.state?.doctor || null;

  const [selectedDoctor, setSelectedDoctor] = useState(preselected);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(preselected ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);

  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
    setSelectedDate('');
    setSelectedSlot('');
    setSelectedMode('');
    setStep(2);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot || !selectedMode) return;
    addAppointment({
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      date: selectedDate,
      time: selectedSlot,
      mode: selectedMode,
      reason,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2>Appointment Confirmed!</h2>
          <p>Your appointment with <strong>{selectedDoctor.name}</strong> is booked.</p>
          <div className={styles.successDetails}>
            <div className={styles.detailRow}><span>📅 Date</span><span>{selectedDate}</span></div>
            <div className={styles.detailRow}><span>🕐 Time</span><span>{selectedSlot}</span></div>
            <div className={styles.detailRow}><span>📍 Mode</span><span>{selectedMode}</span></div>
          </div>
          <div className={styles.successActions}>
            <button className={styles.primaryBtn} onClick={() => navigate('/dashboard')}>
              View My Appointments
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className="fade-up">Book an Appointment</h1>
        <p className="fade-up" style={{ animationDelay: '80ms' }}>
          Find a doctor and pick a time that works for you
        </p>
        <div className={styles.stepBar}>
          {['Choose Doctor', 'Pick Schedule', 'Confirm'].map((s, i) => (
            <div key={s} className={`${styles.stepItem} ${step >= i + 1 ? styles.activeStep : ''}`}>
              <div className={styles.stepCircle}>{step > i + 1 ? '✓' : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Step 1: Choose Doctor */}
        {step === 1 && (
          <div className={`${styles.stepContent} fade-up`}>
            <h2 className={styles.stepTitle}>Select a Doctor</h2>
            <div className={styles.doctorList}>
              {DOCTORS.map((doc) => (
                <button
                  key={doc.id}
                  className={styles.doctorOption}
                  onClick={() => handleDoctorSelect(doc)}
                >
                  <div className={styles.docAvatar} style={{ background: doc.color }}>
                    {doc.initials}
                  </div>
                  <div className={styles.docInfo}>
                    <strong>{doc.name}</strong>
                    <span>{doc.specialization}</span>
                    <span className={styles.docFee}>₹{doc.fee}</span>
                  </div>
                  <span className={styles.arrow}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Pick Schedule */}
        {step === 2 && selectedDoctor && (
          <div className={`${styles.stepContent} fade-up`}>
            <div className={styles.selectedDoc}>
              <div className={styles.docAvatarSm} style={{ background: selectedDoctor.color }}>
                {selectedDoctor.initials}
              </div>
              <div>
                <strong>{selectedDoctor.name}</strong>
                <span>{selectedDoctor.specialization} • ₹{selectedDoctor.fee}</span>
              </div>
              <button className={styles.changeBtn} onClick={() => setStep(1)}>Change</button>
            </div>

            <h3 className={styles.sectionLabel}>Select Date</h3>
            <div className={styles.dateGrid}>
              {DATES.map((d) => (
                <button
                  key={d.value}
                  className={`${styles.dateBtn} ${selectedDate === d.value ? styles.selectedDate : ''}`}
                  onClick={() => { setSelectedDate(d.value); setSelectedSlot(''); }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h3 className={styles.sectionLabel}>Available Slots</h3>
                <div className={styles.slotGrid}>
                  {selectedDoctor.slots.map((slot) => (
                    <button
                      key={slot}
                      className={`${styles.slotBtn} ${selectedSlot === slot ? styles.selectedSlot : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      🕐 {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            <h3 className={styles.sectionLabel}>Consultation Mode</h3>
            <div className={styles.modeGrid}>
              {selectedDoctor.availableModes.map((m) => (
                <button
                  key={m}
                  className={`${styles.modeBtn} ${selectedMode === m ? styles.selectedMode : ''}`}
                  onClick={() => setSelectedMode(m)}
                >
                  {m === 'Online' ? '💻' : '🏥'} {m}
                </button>
              ))}
            </div>

            <h3 className={styles.sectionLabel}>Reason for Visit <span className={styles.optional}>(optional)</span></h3>
            <textarea
              className={styles.textarea}
              placeholder="Briefly describe your symptoms or concern..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />

            <button
              className={styles.confirmBtn}
              disabled={!selectedDate || !selectedSlot || !selectedMode}
              onClick={() => setStep(3)}
            >
              Review Appointment →
            </button>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className={`${styles.stepContent} fade-up`}>
            <h2 className={styles.stepTitle}>Review & Confirm</h2>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader} style={{ background: selectedDoctor.color }}>
                <div className={styles.summaryAvatar}>{selectedDoctor.initials}</div>
                <div>
                  <h3>{selectedDoctor.name}</h3>
                  <p>{selectedDoctor.specialization}</p>
                </div>
              </div>
              <div className={styles.summaryBody}>
                {[
                  { icon: '📅', label: 'Date', value: selectedDate },
                  { icon: '🕐', label: 'Time', value: selectedSlot },
                  { icon: '📍', label: 'Mode', value: selectedMode },
                  { icon: '💰', label: 'Fee', value: `₹${selectedDoctor.fee}` },
                ].map((row) => (
                  <div key={row.label} className={styles.summaryRow}>
                    <span>{row.icon} {row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
                {reason && (
                  <div className={styles.summaryReason}>
                    <span>📝 Reason</span>
                    <p>{reason}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.confirmActions}>
              <button className={styles.backBtn} onClick={() => setStep(2)}>← Edit</button>
              <button className={styles.confirmBtn} onClick={handleSubmit}>
                Confirm Booking ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
