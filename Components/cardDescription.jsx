// components/RestaurantCard.js
import Image from 'next/image';
import styles from '../styles/cardDescription.module.css'; // if you're using CSS Modules
import ReactCountryFlag from "react-country-flag";
import { useState } from 'react';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer } from 'react';
import { useRouter } from 'next/router';


const RestaurantCard = ({eventIDCard, countryCode, title, phoneNumber, locationText, imageUrl, cardStyle}) => {
  const [isChecked, setIsChecked] = useState(false)
  console.log("EVENTID", eventIDCard)
    // console.log("Data in the caroussel", countryCode, title, phoneNumber, locationText, imageUrl)
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
  }
  const router = useRouter()
  

  return (
  
    <div className="cardDescription" style={cardStyle}>
      
      <div className="card-image">
      <button className="favorite-button" onClick={toggleCheckbox}>
        <FontAwesomeIcon icon={isChecked ? fasHeart : farHeart} />
      </button>
        <img style={{minHeight: '150px', maxHeight: '500px'}} src={imageUrl} alt="Restaurant Image" />

        <ReactCountryFlag
          countryCode={countryCode}// Replace with the appropriate country code
          svg
          style={{
            position: 'absolute',
            top: '10px', // Adjust as needed
            left: '10px', // Adjust as needed
            width: '30px', // Adjust as needed
            height: '20px' // Adjust as needed
          }}
          title={countryCode} // Replace with the appropriate country name
        />

        
        <div className="card-info">
          <h2>{title}</h2>
          <div className='location-row'>
            <i className="fas fa-phone"></i>
            <p className="phone-number">{phoneNumber}</p>
          </div>
          <div className="location-row">
            <i className="fas fa-map-marker-alt"></i>
            <span>{locationText}</span> 
          </div>
          <button onClick={() => {router.push({
            pathname: '/eventDescription',
            query: {eventPage: true,
              eventIDCard: eventIDCard,
            }
          })}} className="info-button">Book Now</button> 

        </div>
      </div>
      <style jsx>{`
        .cardDescription {
          position: relative;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          height: 100%; /* Ensure full height */
          
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
          height: 100%; /* Adjust height as necessary */
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
          color: white;
          flex-grow: 1;
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
        .info-button {
          background-color: fuchsia; // Fuschia background
          color: white; // Text color
          padding: 8px 16px; // Padding for button
          border: none; // No border
          border-radius: 4px; // Rounded corners
          cursor: pointer; // Cursor change on hover
          margin-top: 16px; // Margin to separate it from the previous elements
        }
        .info-button:hover {
          background-color: darkfuchsia; // Darker fuschia on hover for effect
        }

        
        
}
      `}</style>
    </div>
   
  );
};

export default RestaurantCard;
