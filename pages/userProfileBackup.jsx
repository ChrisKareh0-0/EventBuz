import HeaderSignedIn from "@/Components/HeaderSignedIn";
import image1 from '../public/image1.jpg'
import {useEffect, useState} from "react";
import imageByIndex from '../functions/imageByIndex'
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {Thumb} from "@/Components/VerticalThumbSlider";
import EmblaCarousel from "../Components/EmblaCarousel";
import { useCallback } from "react";
import axios from "axios";
import { profileData, switchProfileURL } from "./api/auth/URL";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import SecondaryHeader from "@/Components/SecondaryHeader";
import ThirdHeader from "@/Components/ThirdHeader";
import ContactInfo from "@/Components/userData";


const dataDetails = () => {
    const OPTIONS = {axis: 'y'}
    const OPTIONS2 = {}
    const [emblaRef] = useEmblaCarousel(OPTIONS)
    const [emblaRef2] = useEmblaCarousel({})
    const [emblaRef3] = useEmblaCarousel(OPTIONS2)
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    const emblaApi = useEmblaCarousel(emblaRef);
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS, [Autoplay()])
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })


    const [email, setemail] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')



    const onThumbClick = useCallback(
        (index) => {
          if (!emblaMainApi || !emblaThumbsApi) return
          emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
      )

    useEffect(() => {
       userProfileData()
    //    switchProfile()
    }, []);

    const  userProfileData = async () =>  {
        console.log("[+] Getting User Data ")
       const Token = localStorage.getItem('access_Token')
        console.log("[+] ACCESS TOKEN", Token)

        await axios.request({
            method: 'get',
            url: profileData,
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+Token
            },
            // data:{
            //     id: 1,
            //     type: 
            // }
        })
        .then((response) => {
            console.log("User Data",response.data.data)
            setemail(response.data.data.email)
            setphoneNumber(response.data.data.phone)

        })
        .catch((error) => {
            console.log(error)
        })
    }

 

    return (
    <>
        <HeaderSignedIn />
        <SecondaryHeader />




            <div className="Home">
                <div className="top-left-Profile">
                    <ThirdHeader />

                    
                    {/* <img className="userImage" src={image1.src} style={{width: '100%'}}/> */}
                    {/* <p className="textOverImage"> Demoooooooooooooo</p>
                    <p style={{top: "87%"}} className="textOverImage"> Description bruv</p>
                    <div className="socialLogos">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5099 2.39622C14.929 2.65958 14.3129 2.83255 13.6821 2.90939C14.347 2.50184 14.8446 1.86044 15.0822 1.10471C14.4583 1.4853 13.7742 1.75203 13.0612 1.89631C12.5823 1.37111 11.9475 1.0228 11.2555 0.905518C10.5635 0.788238 9.85314 0.908564 9.23475 1.24779C8.61637 1.58701 8.12466 2.12613 7.83606 2.78132C7.54747 3.43652 7.47815 4.17108 7.6389 4.87082C6.37357 4.80582 5.13572 4.4688 4.00571 3.88165C2.87571 3.2945 1.87881 2.47035 1.07975 1.46269C0.796906 1.96061 0.648272 2.52664 0.649067 3.1028C0.649067 4.23365 1.21063 5.23269 2.06438 5.81761C1.55914 5.80131 1.06501 5.66146 0.623195 5.40973V5.45028C0.623348 6.20343 0.877624 6.93334 1.34291 7.51627C1.8082 8.09919 2.45586 8.49926 3.17609 8.64863C2.70707 8.7789 2.21528 8.7981 1.73795 8.70478C1.94101 9.35305 2.3368 9.92001 2.86989 10.3263C3.40298 10.7325 4.04668 10.9577 4.71087 10.9704C4.05075 11.5017 3.29493 11.8945 2.4866 12.1263C1.67828 12.3581 0.833307 12.4243 0 12.3211C1.45465 13.28 3.14801 13.789 4.87751 13.7873C10.7313 13.7873 13.9325 8.81708 13.9325 4.50661C13.9325 4.36623 13.9287 4.22429 13.9226 4.08547C14.5457 3.6239 15.0835 3.05212 15.5106 2.397L15.5099 2.39622Z" fill="white"/>
                        </svg>


                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.77656 0C9.88368 0 10.1466 0.00775527 10.9733 0.0465319C11.7992 0.0853085 12.3615 0.214822 12.8563 0.407154C13.3681 0.604139 13.7993 0.870922 14.2305 1.30134C14.6249 1.68903 14.93 2.15799 15.1247 2.67558C15.3163 3.1696 15.4466 3.73263 15.4853 4.55858C15.5218 5.38529 15.5319 5.6482 15.5319 7.75532C15.5319 9.86244 15.5241 10.1253 15.4853 10.9521C15.4466 11.778 15.3163 12.3403 15.1247 12.8351C14.9306 13.3529 14.6254 13.822 14.2305 14.2093C13.8427 14.6035 13.3738 14.9086 12.8563 15.1035C12.3623 15.295 11.7992 15.4253 10.9733 15.4641C10.1466 15.5006 9.88368 15.5106 7.77656 15.5106C5.66944 15.5106 5.40653 15.5029 4.57982 15.4641C3.75388 15.4253 3.19161 15.295 2.69683 15.1035C2.17902 14.9092 1.70998 14.604 1.32258 14.2093C0.928152 13.8217 0.623 13.3527 0.428395 12.8351C0.236063 12.341 0.106549 11.778 0.0677721 10.9521C0.0313221 10.1253 0.0212402 9.86244 0.0212402 7.75532C0.0212402 5.6482 0.0289955 5.38529 0.0677721 4.55858C0.106549 3.73186 0.236063 3.17037 0.428395 2.67558C0.622461 2.15767 0.927685 1.68858 1.32258 1.30134C1.71009 0.906776 2.1791 0.601603 2.69683 0.407154C3.19161 0.214822 3.7531 0.0853085 4.57982 0.0465319C5.40653 0.0100819 5.66944 0 7.77656 0ZM7.77656 3.87766C6.74814 3.87766 5.76184 4.2862 5.03464 5.0134C4.30744 5.7406 3.8989 6.7269 3.8989 7.75532C3.8989 8.78374 4.30744 9.77004 5.03464 10.4972C5.76184 11.2244 6.74814 11.633 7.77656 11.633C8.80498 11.633 9.79128 11.2244 10.5185 10.4972C11.2457 9.77004 11.6542 8.78374 11.6542 7.75532C11.6542 6.7269 11.2457 5.7406 10.5185 5.0134C9.79128 4.2862 8.80498 3.87766 7.77656 3.87766ZM12.8175 3.68378C12.8175 3.42667 12.7154 3.1801 12.5336 2.9983C12.3518 2.8165 12.1052 2.71436 11.8481 2.71436C11.591 2.71436 11.3444 2.8165 11.1626 2.9983C10.9808 3.1801 10.8787 3.42667 10.8787 3.68378C10.8787 3.94088 10.9808 4.18746 11.1626 4.36926C11.3444 4.55106 11.591 4.65319 11.8481 4.65319C12.1052 4.65319 12.3518 4.55106 12.5336 4.36926C12.7154 4.18746 12.8175 3.94088 12.8175 3.68378ZM7.77656 5.42872C8.39361 5.42872 8.98539 5.67385 9.42171 6.11017C9.85803 6.54649 10.1032 7.13827 10.1032 7.75532C10.1032 8.37237 9.85803 8.96415 9.42171 9.40047C8.98539 9.83679 8.39361 10.0819 7.77656 10.0819C7.15951 10.0819 6.56773 9.83679 6.13141 9.40047C5.69509 8.96415 5.44996 8.37237 5.44996 7.75532C5.44996 7.13827 5.69509 6.54649 6.13141 6.11017C6.56773 5.67385 7.15951 5.42872 7.77656 5.42872Z" fill="white"/>
                        </svg>


                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.21282 8.42314H7.05932L7.79792 5.49335H5.21282V4.02846C5.21282 3.27404 5.21282 2.56356 6.69002 2.56356H7.79792V0.102543C7.55714 0.0710474 6.64792 0 5.68774 0C3.68243 0 2.25841 1.21366 2.25841 3.4425V5.49335H0.0426025V8.42314H2.25841V14.6489H5.21282V8.42314Z" fill="white"/>
                        </svg>


                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1037 4.27318C1.72554 2.98831 2.67949 1.90821 3.85892 1.15358C5.03835 0.398954 6.3968 -0.000452576 7.78242 3.84843e-07C9.79665 3.84843e-07 11.4887 0.767777 12.7825 2.02026L10.6397 4.24449C9.86466 3.47593 8.87959 3.08429 7.78242 3.08429C5.83546 3.08429 4.18745 4.44923 3.60075 6.28181C3.45127 6.74713 3.36606 7.24347 3.36606 7.75532C3.36606 8.26717 3.45127 8.76351 3.60075 9.22883C4.1882 11.0622 5.83546 12.4263 7.78242 12.4263C8.78767 12.4263 9.64343 12.151 10.3131 11.6857C10.7013 11.4205 11.0337 11.0763 11.2901 10.674C11.5465 10.2717 11.7216 9.81967 11.8049 9.34516H7.78242V6.3454H14.8214C14.9096 6.8526 14.9574 7.38151 14.9574 7.93137C14.9574 10.2936 14.1427 12.2821 12.7287 13.6315C11.4925 14.8165 9.80038 15.5106 7.78242 15.5106C6.80082 15.511 5.82876 15.3107 4.9218 14.9211C4.01484 14.5315 3.19076 13.9603 2.49666 13.2401C1.80257 12.5198 1.25205 11.6647 0.876592 10.7236C0.501131 9.78253 0.308079 8.77388 0.308472 7.75532C0.308472 6.50361 0.596967 5.32015 1.1037 4.27318Z" fill="white"/>
                        </svg>


                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.22346 0C3.93986 0 0.46814 3.47172 0.46814 7.75532C0.46814 11.0422 2.513 13.8475 5.39701 14.9775C5.33036 14.3625 5.26674 13.4234 5.42427 12.7539C5.56666 12.148 6.3331 8.90044 6.3331 8.90044C6.3331 8.90044 6.09983 8.43694 6.09983 7.74926C6.09983 6.67079 6.72389 5.86496 7.50246 5.86496C8.16287 5.86496 8.48399 6.36178 8.48399 6.95858C8.48399 7.62505 8.05987 8.6187 7.84175 9.53965C7.65999 10.3122 8.22952 10.9423 8.9899 10.9423C10.3683 10.9423 11.4286 9.48815 11.4286 7.39179C11.4286 5.53475 10.0956 4.23513 8.19013 4.23513C5.98472 4.23513 4.68812 5.88919 4.68812 7.60082C4.68812 8.26729 4.94562 8.98223 5.26674 9.37C5.33036 9.44574 5.33945 9.51541 5.32127 9.59115C5.26371 9.83653 5.13042 10.3637 5.10618 10.4697C5.07286 10.6121 4.9941 10.6424 4.84565 10.5727C3.87624 10.1213 3.27035 8.70656 3.27035 7.5675C3.27035 5.11972 5.04863 2.87492 8.39311 2.87492C11.0832 2.87492 13.1735 4.79255 13.1735 7.35544C13.1735 10.0274 11.4892 12.1783 9.15046 12.1783C8.36584 12.1783 7.62666 11.7693 7.37219 11.2876C7.37219 11.2876 6.98443 12.769 6.89051 13.1325C6.71481 13.8051 6.24222 14.6503 5.92716 15.1653C6.65422 15.3895 7.42369 15.5106 8.22346 15.5106C12.5071 15.5106 15.9788 12.0389 15.9788 7.75532C15.9788 3.47172 12.5071 0 8.22346 0Z" fill="white"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8519 0H1.6345C1.00135 0 0.48938 0.499855 0.48938 1.11786V14.3898C0.48938 15.0078 1.00135 15.5106 1.6345 15.5106H14.8519C15.485 15.5106 16 15.0078 16 14.3928V1.11786C16 0.499855 15.485 0 14.8519 0ZM5.09107 13.2174H2.78871V5.81346H5.09107V13.2174ZM3.93989 4.80466C3.20071 4.80466 2.60392 4.20787 2.60392 3.47172C2.60392 2.73557 3.20071 2.13877 3.93989 2.13877C4.67604 2.13877 5.27284 2.73557 5.27284 3.47172C5.27284 4.20484 4.67604 4.80466 3.93989 4.80466ZM13.7067 13.2174H11.4074V9.61841C11.4074 8.76109 11.3923 7.65535 10.2108 7.65535C9.01417 7.65535 8.83241 8.59144 8.83241 9.55783V13.2174H6.53611V5.81346H8.74152V6.82529H8.77182C9.07779 6.24364 9.82909 5.62867 10.9469 5.62867C13.2766 5.62867 13.7067 7.16155 13.7067 9.15491V13.2174Z" fill="white"/>
                        </svg>
                    </div> */}

                    <div >
                       
                            <ContactInfo
                                data={[
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: "Lebanon, Biel Center, East Hall" },
                                    // ... add other data here
                                    ]}
                                />

                                <div style={{marginLeft:"25%"}}>
                                    <div className="rating">
                                        <input type="radio" id="star5" name="rating" value="5"/>
                                        <label htmlFor="star5"></label>
                                        <input type="radio" id="star4" name="rating" value="4"/>
                                        <label htmlFor="star4"></label>
                                        <input type="radio" id="star3" name="rating" value="3"/>
                                        <label htmlFor="star3"></label>
                                        <input type="radio" id="star2" name="rating" value="2"/>
                                        <label htmlFor="star2"></label>
                                        <input type="radio" id="star1" name="rating" value="1"/>
                                        <label htmlFor="star1"></label>
                                    </div>
                                    <p style={{fontSize: 12, marginLeft: 18}}>78 User Reviews</p>
                                </div>
                                
                            </div>
                        

                        <div className="rowField">
                            

                           

                            <button className="MessageUS">
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                    </svg>
                                    </div>
                                </div>
                                <span>Message Us</span>
                            </button>

                        </div>
                        

                        {/* <p style={{fontSize: 40, fontFamily: "sans-serif"}}>Description</p>
                        <p style={{fontFamily: 'sans-serif', marginTop: 30}}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p> */}
                        
                        </div>

                    {/* <div className="embla3">
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
                    </div> */}

                    

                    {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}



                {/* <div className="top-right-profile" style={{flexDirection:"column"}}>
                    <div className="emblaV" style={{marginTop:40, width: "100%"}}>
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
                    <div className="embla-thumbs" style={{width:"25%", height:"25%" ,marginLeft: 30}}>
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
                </div> */}

            </div>










    </>
    )
}
export default dataDetails