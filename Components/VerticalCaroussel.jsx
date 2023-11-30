import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import imageByIndex from '../functions/imageByIndex'
import { useDispatch } from 'react-redux'
import { setverticalCarouselIndex } from '@/Redux/slice'
import { Store } from '@/Redux/store'


const VerticalCaroussel = (props) => {
    const dispatch = useDispatch()
    const { slides, options } = props
    const [emblaRef] = useEmblaCarousel(options)

    return (
        <div className="emblaV">
        <div className="embla__viewportV" ref={emblaRef}>
          <div className="embla__containerV">
            {slides.map((index) => 
           
             (
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
    )
   
}

export default VerticalCaroussel