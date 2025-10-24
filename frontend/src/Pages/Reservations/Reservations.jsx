import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';
import './Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://backend-mv6um8tym-gtmmedias-projects.vercel.app/api/v1/reservation/all');
      setReservations(data.reservations);
      setError('');
    } catch (err) {
      setError('Failed to fetch reservations');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="reservations-container">
        <div className="loading">
          <h2>Loading reservations...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservations-container">
        <div className="error">
          <h2>{error}</h2>
          <button onClick={fetchReservations} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <h1>Your Reservations</h1>
        <p>View all your restaurant reservations</p>
      </div>

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <h2>No reservations found</h2>
          <p>You haven't made any reservations yet.</p>
          <a href="/#reservation" className="make-reservation-btn">
            Make a Reservation
          </a>
        </div>
      ) : (
        <div className="reservations-grid">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <div className="reservation-header">
                <h3>
                  <HiOutlineUser className="icon" />
                  {reservation.firstName} {reservation.lastName}
                </h3>
                <span className="reservation-id">#{reservation._id.slice(-6)}</span>
              </div>
              
              <div className="reservation-details">
                <div className="detail-item">
                  <HiOutlineMail className="icon" />
                  <span>{reservation.email}</span>
                </div>
                
                <div className="detail-item">
                  <HiOutlinePhone className="icon" />
                  <span>{reservation.phone}</span>
                </div>
                
                <div className="detail-item">
                  <HiOutlineCalendar className="icon" />
                  <span>{formatDate(reservation.date)}</span>
                </div>
                
                <div className="detail-item">
                  <HiOutlineClock className="icon" />
                  <span>{formatTime(reservation.time)}</span>
                </div>
              </div>
              
              <div className="reservation-footer">
                <span className="reservation-date">
                  Created: {formatDate(reservation.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
