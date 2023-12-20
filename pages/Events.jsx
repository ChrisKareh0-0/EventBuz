import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/eventsPage.module.css';
import RestaurantCard from '@/Components/cardDescription';
import HeaderSignedIn from '@/Components/HeaderSignedIn';
import SecondaryHeader from '@/Components/SecondaryHeader';
import HorizontalCaroussel from '@/Components/HorizontalCaroussel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Events = () => {
  // ... [rest of your setup]

  const [events, setEvents] = useState([]);

  // Function to safely extract data or return 'N/A'
  const getSafeData = (data) => data || 'N/A';

  // Function to format venue location
  const formatVenueLocation = (location) => {
    if (!location || !location.city || !location.country) return 'N/A';
    return `${location.city}, ${location.country}`;
  };

  // Fetch event details
  useEffect(() => {
    const getAllEvensDetails = async () => {
      try {
        const response = await axios.get('https://eventbuznew.online/api/v1/events/all', {
          headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
          }
        });
        setEvents(response.data.data);
        console.log('ALL EVENTS', response.data.data)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    getAllEvensDetails();
  }, []);

  // Set background color of the page
  useEffect(() => {
    document.body.style.setProperty('--color-page-background', '#1B1C1F');
  });

  return (
    <div className='Home'>
      <HeaderSignedIn />
      <SecondaryHeader />
      <div className={styles.mainContent}>
        <div className={styles.scrollableGrid}>
          <div className={styles.grid}>
            {/* Rendering events using RestaurantCard */}
            {events.map(event => (
              <RestaurantCard
                key={event.id}
                eventIDCard = {event.id}
                title={getSafeData(event.name)}
                phoneNumber={getSafeData(event.contact_phone_number)}
                locationText={formatVenueLocation(event.venue_location)}
                imageUrl={event.media?.event_main_photo?.url || 'N/A'}
                cardStyle={{height: '300px', width: '520px'}}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Events;
