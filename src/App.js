import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Book from './pages/Book';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/doctors"   element={<Doctors />} />
        <Route path="/book"      element={<Book />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
