
import React, {useState, useEffect} from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import styles from '../styles/eventsPage.module.css'
import cardDescription from '@/Components/cardDescription';
const Events = () => {
    const events = [
        {
          "id": 1,
          "title": "Massaya Zaman",
          "countryCode": "LB",
          "phoneNumber": "+9616665802",
          "locationText": "Beirut, Lebanon",
          "imageUrl": "https://example.com/images/massaya-zaman.jpg"
        },
        {
          "id": 2,
          "title": "La Petite Maison",
          "countryCode": "FR",
          "phoneNumber": "+33170360050",
          "locationText": "Paris, France",
          "imageUrl": "https://example.com/images/la-petite-maison.jpg"
        },
        {
          "id": 3,
          "title": "Pizzeria Bianco",
          "countryCode": "US",
          "phoneNumber": "+16022620200",
          "locationText": "Phoenix, AZ, USA",
          "imageUrl": "https://example.com/images/pizzeria-bianco.jpg"
        },
        {
          "id": 4,
          "title": "Din Tai Fung",
          "countryCode": "TW",
          "phoneNumber": "+886277381066",
          "locationText": "Taipei, Taiwan",
          "imageUrl": "https://example.com/images/din-tai-fung.jpg"
        },
        {
          "id": 5,
          "title": "Gaggan",
          "countryCode": "TH",
          "phoneNumber": "+6626521700",
          "locationText": "Bangkok, Thailand",
          "imageUrl": "https://example.com/images/gaggan.jpg"
        }
      ]
    const [loading, setLoading] = useState(true);

   return (
    <div className={styles.grid}>
        {events.map((event) => {
            <cardDescription
                key={event.id}
                countryCode={event.country}
                title={event.name}
                phoneNumber={event.phoneNumber}
                locationText={event.city}
            />
            
        })}
    </div>
   )
}
export default Events;