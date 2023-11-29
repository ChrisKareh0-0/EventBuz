// components/RestaurantCard.js
import Image from 'next/image';
import styles from '../styles/cardDescription.module.css'; // if you're using CSS Modules
import ReactCountryFlag from "react-country-flag";
import { useState } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cardDescription = () => {
  const [isChecked, setIsChecked] = useState(false)

  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }


  return (
    <div className="card">
      
      <div className="card-image">
      <button className="favorite-button" onClick={toggleCheckbox}>
        <FontAwesomeIcon icon={isChecked ? fasHeart : farHeart} />
      </button>
        <img src='/_next/static/media/image1.cfe85494.jpg' alt="Restaurant Image" />

        <ReactCountryFlag
          countryCode="LB" // Replace with the appropriate country code
          svg
          style={{
            position: 'absolute',
            top: '10px', // Adjust as needed
            left: '10px', // Adjust as needed
            width: '30px', // Adjust as needed
            height: '20px' // Adjust as needed
          }}
          title="Lebanon" // Replace with the appropriate country name
        />

        
        <div className="card-info">
          <h2>Massaya Zaman</h2>
          <div className='location-row'>
            <i className="fas fa-phone"></i>
            <p className="phone-number">+9616665802</p>
          </div>
          <div className="location-row">
            <i className="fas fa-map-marker-alt"></i>
            <span>Location Text</span> 
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          position: relative;
          max-width: 300px;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }
        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background-color: white; // Set the background to white
          border-radius: 50%; // Make it circular
          width: 30px; // Set a fixed width
          height: 30px; // Set a fixed height to maintain the circular shape
          display: flex;
          justify-content: center; // Center the icon horizontally
          align-items: center; // Center the icon vertically
          cursor: pointer;
          font-size: 16px; // Adjust the icon size as needed
          color: ${isChecked ? 'red' : 'gray'}; // Color changes based on isChecked
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Optional: adds a subtle shadow for depth
        }
        
        .card-image {
          position: relative;
          width: 100%;
        }
        img {
          width: 100%;
          height: auto;
        }
        .card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
          color: white; // optional: change text color for readability
        }
        .phone-number {
          margin: 8px 0;
          color: white;
        }
        .location-row {
          display: flex; /* Align items in a row */
          align-items: center; /* Center items vertically */
          gap: 8px; /* Space between icon and text */
        }
        .location-button {
          background-color: #4CAF50;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .location-button:hover {
          background-color: #45a049;
        }

        
        
}
      `}</style>
    </div>
  );
};

export default cardDescription;
