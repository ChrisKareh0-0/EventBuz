import Header from "@/Components/Header";
import HorizontalCaroussel from "@/Components/HorizontalCaroussel";
import useEmblaCarousel from 'embla-carousel-react'
import imageByIndex from '../functions/imageByIndex'
import { useCallback, useEffect, useState } from "react";
import { Thumb } from '../Components/VerticalThumbSlider'
import Autoplay from 'embla-carousel-autoplay'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import image1 from '../public/image1.jpg'
import image2 from '../public/image2.jpg'
import image3 from '../public/image3.jpg'
import { Store } from "@/Redux/store";
import { setusername } from "@/Redux/slice";
import { registerEmail } from "./api/auth/APICalls";
import { useSelector } from "react-redux";

const Home = () => {

   
    const OPTIONS = {axis: 'y'}
    const OPTIONS2 = {}
    const [emblaRef] = useEmblaCarousel(OPTIONS)
    const [emblaRef2] = useEmblaCarousel({}, [Autoplay()])
    const [emblaRef3] = useEmblaCarousel(OPTIONS2, [Autoplay()])
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const emblaApi = useEmblaCarousel(emblaRef);
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS, [Autoplay()])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
      })
      const username = useSelector(state => state.data.username)

      useEffect(() => {
        // When the component mounts
        document.body.style.setProperty('--color-page-background', '#2a2b2e');
        getAllEvensDetails()
      },[])

      const getAllEvensDetails = async () => {
        const axios = require('axios');

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/get-events/all',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }
        };

        axios.request(config)
        .then((response) => {
        console.log(response.data);
        })
        .catch((error) => {
        console.log(error);
        });

      }


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
     
        

   

    return(
        <>
            <Header/>
            <div className="Home" style={{paddingTop: 90}}> 
                <div className="top-left">
                    <HorizontalCaroussel slides={SLIDES} options={{}} />
                </div>

                <div className="top-right">
                    <div className="emblaV">
                        <div className="embla__viewportV" ref={emblaMainRef}>
                            <div className="embla__containerV">
                                {SLIDES.map((index) => (
                                    <div className="embla__slideV" key={index}>
                                            <div className="embla__slide__numberV">
                                            <span>{index + 1}</span>
                                            </div>
                                            <img
                                            className="embla__slide__imgV"
                                            src={imageByIndex(index)}
                                            alt="Your alt text"
                                            />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="embla-thumbs">
                        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                            <div className="embla-thumbs__container">
                                {SLIDES.map((index) => (
                                <Thumb
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={index}
                                    imgSrc={imageByIndex(index)}
                                    key={index}
                                />
                                
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-left">
                <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        eventContent={renderEventContent}
                        events={[
                            { date: '2023-11-13', image:image1.src },
                        ]}
                    />
                   
           
                      

                </div>
                <div className="bottom-right">
                    <div className="embla2">
                        <div className="embla__viewport2" ref={emblaRef3}>
                            <div className="embla__container2">
                            {SLIDES.map((index) => (
                                <div className="embla__slide2" key={index}>
                                <div className="embla__slide__number2">
                                    <span>{index + 1}</span>
                                </div>
                                <img
                                    className="embla__slide__img2"
                                    src={imageByIndex(index)}
                                    alt="Your alt text"
                                />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="embla3">
                        <div className="embla__viewport3" ref={emblaRef2}>
                            <div className="embla__container3">
                            {SLIDES.map((index) => (
                                <div className="embla__slide3" key={index}>
                                <div className="embla__slide__number3">
                                    <span>{index + 1}</span>
                                </div>
                                <img
                                    className="embla__slide__img3"
                                    src={imageByIndex(index)}
                                    alt="Your alt text"
                                />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    
                   

               
                </div> 
            </div>
        </>
    )
        
    
}

export default Home;