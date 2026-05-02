import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Priya Sharma',
      specialization: 'General Physician',
      date: '2026-05-10',
      time: '10:00 AM',
      status: 'confirmed',
      mode: 'Online',
    },
    {
      id: 2,
      doctorName: 'Dr. Rahul Mehta',
      specialization: 'Dermatologist',
      date: '2026-05-15',
      time: '02:30 PM',
      status: 'pending',
      mode: 'In-Clinic',
    },
  ]);

  const [user] = useState({
    name: 'Santhosh Reddy',
    email: 'santhosh@example.com',
    avatar: 'SR',
  });

  const addAppointment = (apt) => {
    setAppointments((prev) => [
      ...prev,
      { ...apt, id: Date.now(), status: 'confirmed' },
    ]);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
  };

  return (
    <AppContext.Provider value={{ appointments, addAppointment, cancelAppointment, user }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
