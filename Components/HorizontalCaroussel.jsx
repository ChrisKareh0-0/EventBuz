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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
            {slides.map((event,index) => (
                <div className="embla__slideV" >
                    <div className="embla__slide__numberV">
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
  )
}

export default HorizontalCaroussel
