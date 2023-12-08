
import React, {useState, useEffect} from 'react';
import { useReducer } from 'react';
import axios from 'axios';
import styles from '../styles/eventsPage.module.css'
import RestaurantCard from '@/Components/cardDescription';
import HeaderSignedIn from '@/Components/HeaderSignedIn';
import SecondaryHeader from '@/Components/SecondaryHeader';
import HorizontalCaroussel from '@/Components/HorizontalCaroussel';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { Thumb } from '@/Components/VerticalThumbSlider';
import { useRouter } from 'next/router';
const Events = () => {
  const OPTIONS = {axis: 'x'}
  const OPTIONS2 = {}
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const router = useRouter()
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS, [Autoplay()])
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
      containScroll: 'keepSnaps',
      dragFree: true,
      axis: 'y'
    })
    const [emblaRef3] = useEmblaCarousel(OPTIONS2, [Autoplay()])
    const [emblaRef2] = useEmblaCarousel({}, [Autoplay()])
    const [selectedIndex, setSelectedIndex] = useState(0)

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
        },
        {
          "id": 6,
          "title": "Massaya Zaman",
          "countryCode": "LB",
          "phoneNumber": "+9616665802",
          "locationText": "Beirut, Lebanon",
          "imageUrl": "https://example.com/images/massaya-zaman.jpg"
        },
        {
          "id": 7,
          "title": "La Petite Maison",
          "countryCode": "FR",
          "phoneNumber": "+33170360050",
          "locationText": "Paris, France",
          "imageUrl": "https://example.com/images/la-petite-maison.jpg"
        },
        {
          "id": 8,
          "title": "Pizzeria Bianco",
          "countryCode": "US",
          "phoneNumber": "+16022620200",
          "locationText": "Phoenix, AZ, USA",
          "imageUrl": "https://example.com/images/pizzeria-bianco.jpg"
        },
        {
          "id": 9,
          "title": "Din Tai Fung",
          "countryCode": "TW",
          "phoneNumber": "+886277381066",
          "locationText": "Taipei, Taiwan",
          "imageUrl": "https://example.com/images/din-tai-fung.jpg"
        },
        {
          "id": 10,
          "title": "Gaggan",
          "countryCode": "TH",
          "phoneNumber": "+6626521700",
          "locationText": "Bangkok, Thailand",
          "imageUrl": "https://example.com/images/gaggan.jpg"
        }
      ]
    const [loading, setLoading] = useState(true);
      useEffect(() => {

        document.body.style.setProperty('--color-page-background', '#2a2b2e');
      })

   return (
    <div className='Home'>
      <HeaderSignedIn />
      <SecondaryHeader />
      <div className={styles.mainContent}>
        <div className={styles.scrollableGrid}>
          <div className={styles.grid}>
                {events.map(event => (
                    <RestaurantCard
                        key={event.id}
                        countryCode={event.countryCode}
                        title={event.title}
                        phoneNumber={event.phoneNumber}
                        locationText={event.locationText}
                        imageUrl={event.imageUrl} // Pass the image URL to the card
                    />
                ))}
          </div>
        </div>
        <div className={styles.rightSection}>
        <HorizontalCaroussel slides={events} options={{}} />

<div className="login-columnEmblaView" style={{marginTop: 50}}>
    <div className="Login-rowEmblav">

        <div className="embla2" style={{width: '700px'}} >
            <div className="embla__viewport2" ref={emblaRef3}>
                <div className="embla__container2">
                {events.map((index, event) => (
                    <div className="embla__slide2" key={index} >
                    <div className="embla__slide__number2">
                        <span>{index + 1}</span>
                    </div>
                        <RestaurantCard
                            key={event.id}
                            countryCode={event.countryCode}
                            title={event.title}
                            phoneNumber={event.phoneNumber}
                            locationText={event.locationText}
                            imageUrl={event.imageUrl} // Pass the image URL to the card
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>

        <div className="embla3" style={{width: '680px'}}>
            <div className="embla__viewport3" ref={emblaRef2}>
                <div className="embla__container3">
                {events.map((index, event) => (
                    <div className="embla__slide3" key={index} >
                    <div className="embla__slide__number3">
                        <span>{index + 1}</span>
                    </div>

                        <RestaurantCard
                            key={event.id}
                            countryCode={event.countryCode}
                            title={event.title}
                            phoneNumber={event.phoneNumber}
                            locationText={event.locationText}
                            imageUrl={event.imageUrl} // Pass the image URL to the card
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
      </div>
    </div>
        
   )
}
export default Events;