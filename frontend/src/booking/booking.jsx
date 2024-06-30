import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(2); // Number of bookings per page

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings.');
      }
    };

    fetchBookings();
  }, []);

  // Logic for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container" style={{ display: 'flex' }}>
        <Sidebar />
        <div className="main-content" style={{ flex: 1, padding: '20px' }}>
          <Navbar />
          <div className="dashboard-content" style={{ marginTop: '20px' }}>
            <h2>Your Bookings</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Image</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Name</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>
                      <img src={booking.image} alt={booking.name} height="100" width="150" style={{ borderRadius: '5px' }} />
                    </td>
                    <td style={{ padding: '12px' }}>{booking.name}</td>
                    <td style={{ padding: '12px' }}>
                      {Array(booking.rating).fill().map((_, i) => <FaStar key={i} style={{ color: '#ffbf00' }} />)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              {bookings.length > bookingsPerPage && (
                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center' }}>
                  {Array(Math.ceil(bookings.length / bookingsPerPage)).fill().map((_, index) => (
                    <li key={index} style={{ margin: '0 5px', cursor: 'pointer', textDecoration: currentPage === index + 1 ? 'underline' : 'none' }} onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookings;
