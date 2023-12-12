import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import imageByIndex from '../functions/imageByIndex'
import { useState } from 'react'
import RestaurantCard from "@/Components/cardDescription";

const HorizontalCaroussel = (props) => {
  const { slides, options } = props
 
  
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])

  return (
    <div className="embla" style={{width: '900px'}}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" >
            {slides.map((event,index) => (
                <div className="embla__slideV" style={{paddingLeft: '20px'}}>
                    <div className="embla__slide__numberV">
                        <span>{index + 1}</span>
                    </div>

                    <RestaurantCard
                                                key={event.id}
                                                countryCode={event.countryCode}
                                                title={event.name}
                                                phoneNumber={event.contact_phone_number}
                                                locationText={event.venue_location}
                                                imageUrl={event.media} // Pass the image URL to the card
                                            />

                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalCaroussel
