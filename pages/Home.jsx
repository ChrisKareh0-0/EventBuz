import Header from "@/Components/Header";
import HorizontalCaroussel from "@/Components/HorizontalCaroussel";
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from "react";
import { Thumb } from '../Components/VerticalThumbSlider'
import Autoplay from 'embla-carousel-autoplay'
import { Store } from "@/Redux/store";
import { setCountryRedux, setusername } from "@/Redux/slice";
import { useSelector } from "react-redux";
import RestaurantCard from "@/Components/cardDescription";
import HeaderSignedIn from "@/Components/HeaderSignedIn";
import SecondaryHeader from "@/Components/SecondaryHeader";
import dynamic from 'next/dynamic';
import axios from "axios";
import { profileData } from "./api/auth/URL";
const HomeCalendar = dynamic(() => import('@/Components/HomeCalendar'), { ssr: false });



const Home = () => {

   
    const OPTIONS = {axis: 'y'}
    const OPTIONS2 = {}
    // const [emblaRef] = useEmblaCarousel(OPTIONS)
    const [emblaRef2] = useEmblaCarousel({}, [Autoplay()])
    const [emblaRef3] = useEmblaCarousel(OPTIONS2, [Autoplay()])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS, [Autoplay()])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
        axis: 'y'
      })
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [events, setEvents] = useState([])

    const getSafeData = (data) => data || 'N/A';
      
    //USE EFFECTS
    useEffect(() => {
        // When the component mounts change body color
        document.body.style.setProperty('--color-page-background', '#1B1C1F');
        getAllEvensDetails()
        userProfileData()

      },[])

    useEffect(() => {
        setIsClient(true);
    }, []);


    //API CALLS
    const  userProfileData = async () =>  {
        console.log("[+] Getting User Data ")
        
        let Token = localStorage.getItem('access_Token')
        
        console.log("[+] ACCESS TOKEN", Token)
        console.log("CURRENT TOKEN",Token)
        await axios.request({
            method: 'get',
            url: profileData,
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+Token
            },
            
        })
        .then((response) => {
            console.log("User Data",response.data.data)
            Store.dispatch(setCountryRedux(response.data.data.country))
            Store.dispatch(setusername(response.data.data.name))
            setLoading(false)
            
        })
        .catch((error) => {
            //console.log(error)
            setLoading(false)
        })
    }



   

      const getAllEvensDetails = async () => {
        const axios = require('axios');

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://eventbuznew.online/api/v1/events/all',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
            }
        };

        axios.request(config)
        .then((response) => {
        console.log(response.data);
        setEvents(response.data.data)
        })
        .catch((error) => {
        console.log(error);
        });

      }

      //handle formatVenueLocation
      const formatVenueLocation = (location) => {
        if (!location || !location.city || !location.country) return 'N/A';
        return `${location.city}, ${location.country}`;
        };


      const onThumbClick = useCallback(
        (index) => {
          if (!emblaMainApi || !emblaThumbsApi) return
          emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
      )
    
      const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
      }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
    
      useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
        
      }, [emblaMainApi, onSelect])

        

   
        const imageMapping = {
            '2023-11-24':'../public/image1.jpg',
            '2023-11-25':'../public/image2.jpg',
        }

        const renderEventContent = (eventInfo) => {
            return (
              <>
                <img src={eventInfo.event.extendedProps.image} alt={eventInfo.event.title} style={{width: 150, height: 90, position: "absolute", zIndex: 0, left: 0, top: 0}}  />
                <span className="fc-daygrid-day-number">{eventInfo.event.title}</span>
              </>
            );
          };

    // const events = [
    //     {
    //         "id": 1,
    //         "title": "Massaya Zaman",
    //         "countryCode": "LB",
    //         "phoneNumber": "+9616665802",
    //         "locationText": "Beirut, Lebanon",
    //         "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
    //     },
    //     {
    //         "id": 2,
    //         "title": "La Petite Maison",
    //         "countryCode": "FR",
    //         "phoneNumber": "+33170360050",
    //         "locationText": "Paris, France",
    //         "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Pizzeria Bianco",
    //         "countryCode": "US",
    //         "phoneNumber": "+16022620200",
    //         "locationText": "Phoenix, AZ, USA",
    //         "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
    //     },
    //     {
    //         "id": 4,
    //         "title": "Din Tai Fung",
    //         "countryCode": "TW",
    //         "phoneNumber": "+886277381066",
    //         "locationText": "Taipei, Taiwan",
    //         "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
    //     },
    //     {
    //         "id": 5,
    //         "title": "Gaggan",
    //         "countryCode": "TH",
    //         "phoneNumber": "+6626521700",
    //         "locationText": "Bangkok, Thailand",
    //         "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
    //     }
    // ]

    const Token = typeof window !== "undefined" ? localStorage.getItem('access_Token') : null;

    const preparedSlides = events.map(event => ({
        ...event,
        name: getSafeData(event.name),
        contact_phone_number: getSafeData(event.contact_phone_number),
        venue_location: formatVenueLocation(event.venue_location),
        imageUrl: event.media && event.media.event_main_photo ? event.media.event_main_photo.url : 'N/A'
    }));
    return(
        <>

            {isClient && (Token ? <HeaderSignedIn /> : <Header />)}
            {isClient && Token && <SecondaryHeader />}
            <div style={{display: 'flex', flexDirection:'row', marginTop: 30}}>
                <div className="top-left" >
                    {/* <HorizontalCaroussel slides={preparedSlides} options={{}} /> */}
                </div>

                <div className="top-right" style={{marginLeft: 30}}>
                    {/* <div className="emblaV" style={{marginTop: '15px'}}>
                        <div className="embla__viewportV" ref={emblaMainRef}>
                            <div className="embla__containerV">
                                {events.map((event,index) => (
                                    <div className="embla__slideV" >
                                            <div className="embla__slide__numberV">
                                            <span>{index + 1}</span>
                                            </div>

                                            <RestaurantCard
                            key={event.id}
                            title={getSafeData(event.name)}
                            phoneNumber={getSafeData(event.contact_phone_number)}
                            locationText={formatVenueLocation(event.venue_location)}
                            imageUrl={event.media.event_main_photo?.url}
                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="embla-thumbs" style={{marginTop: '30px'}}>
                        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                            <div className="embla-thumbs__container">
                                {events.map((event,index) => (
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={index}
                                    imgSrc={event.media.event_main_photo?.url}
                                    key={index}
                                />

                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
                </div>

                <div style={{display: 'flex', flexDirection:'row', marginTop: 30}}>
                <div className="bottom-left" style={{width: '910px'}}>
                

                   <HomeCalendar />
                   
           
                      

                </div>
                <div className="bottom-right" style={{width: '950px'}}>
                    {/* <div className="embla2" >
                        <div className="embla__viewport2" ref={emblaRef3}>
                            <div className="embla__container2">
                                {events.map((event,index) => (
                                    <div className="embla__slideV" >
                                        <div className="embla__slide__numberV">
                                            <span>{index + 1}</span>
                                        </div>

                                        <RestaurantCard
                            key={event.id}
                            title={getSafeData(event.name)}
                            phoneNumber={getSafeData(event.contact_phone_number)}
                            locationText={formatVenueLocation(event.venue_location)}
                            imageUrl={event.media.event_main_photo?.url}
                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                        {/* <div className="embla3">
                            <div className="embla__viewport3" ref={emblaRef2}>
                                <div className="embla__container3">
                                    {events.map((event,index) => (
                                        <div className="embla__slideV" >
                                            <div className="embla__slide__numberV">
                                                <span>{index + 1}</span>
                                            </div>

                                            <RestaurantCard
                            key={event.id}
                            title={getSafeData(event.name)}
                            phoneNumber={getSafeData(event.contact_phone_number)}
                            locationText={formatVenueLocation(event.venue_location)}
                            imageUrl={event.media.event_main_photo?.url}
                        />

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                        
                    

                
                    </div> 
                </div>
            
        </>
    )
        
    
}

export default Home;