import HeaderSignedIn from "@/Components/HeaderSignedIn";
import image1 from '../public/image1.jpg'
import {useEffect, useState,useRef} from "react";
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
import Image from "next/image";
import { Button, DropdownMenu, Theme } from "@radix-ui/themes"
import { useSelector } from "react-redux"
import { Router, useRouter } from "next/router"
import { getPlacesURL } from "@/pages/api/auth/URL"
import { Store } from "@/Redux/store";
import {setCountryRedux, setIsSwitch, setusername} from "@/Redux/slice";
import { toast } from "react-toastify";
import noImage from '../assets/NoImage.png'


const eventDescription = ({props}) => {
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

    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [email, setemail] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [location, setLocation] = useState('')
    const [website, setWebsite] = useState('')
    const [username, setUsername] = useState('')
    const [type, setType] = useState('')
    const [profilePicture, setProfilePicture] = useState('')


    const [places, setPlaces] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [stateType, setstateType] = useState('');
    const [pressed, setPressed] = useState(false);
    const [switchName, setSwitchName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    
    const [eventIDCardo, seteventIDCardo] = useState(0)

    const [Token, setToken] = useState('')

    let dropdownRef = useRef(null);
    

    const isSwitch = useSelector(state => state.data.isSwitch)
    
    useEffect(() => {
        getEventDetails();
    })

 
    const getEventDetails = () => {
        const axios = require('axios');
        const FormData = require('form-data');
        let data = new FormData();

        if (router.isReady) { // Check if the router is ready
            const queryEventIDCard = router.query.eventIDCard;
            if (queryEventIDCard) {
            //   setEventID(queryEventIDCard);
            console.log("[+] EVENT ID CARD",queryEventIDCard)
            seteventIDCardo(queryEventIDCard)
            }
            console.log("LINE 95",typeof window)
        } else if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const eventIDCard = urlParams.get('eventIDCard');
            if (eventIDCard) {
              console.log("[+] EVENT ID CARD", eventIDCard);
              seteventIDCardo(eventIDCard)
              
            }
          }

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://eventbuznew.online/api/v1/events/${eventIDCardo}/details`,
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
            
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
        console.log(response.data);
        setemail(response.data.data.email)
            setphoneNumber(response.data.data.phone)
            setLocation(response.data.data.country)
            Store.dispatch(setCountryRedux(response.data.data.country))
            setWebsite(response.data.data.website)
            setUsername(response.data.data.name)
            Store.dispatch(setusername(response.data.data.name))
            setType(response.data.data.types[0].name)
            if (response.data.data.profile_image && response.data.data.profile_image.url) {
                setProfilePicture(response.data.data.profile_image.url)
            }
            //console.log("{+++++} TYPE:", response.data.data.types[0])
            //console.log("{+++++++++++++PROFILE PICTURE}",response.data.data.profile_image.url)
            setLoading(false)
        })
        .catch((error) => {
        console.log(error);
        });

    }

    return (
        <>
        
  

            <div style={{backgroundColor: "#1B1C1F", top: 0}}>
                <HeaderSignedIn />
                <SecondaryHeader />

                
                                
                            
                
                    <div className="imageProfile" style={{marginLeft: 50}}>
                        {loading ? (
                            <div style={{width: 954, height: 432, backgroundColor: "#FFF", marginTop: 130, paddingTop: 130}}>
                                <div className="Imageloader"></div>
                            </div>
                        ) : (
                            
                            
                            <Image
                                src={profilePicture || noImage} 
                                alt="Picture"
                                style={{paddingTop: 130}}
                                width={954} 
                                height={232} 
                                
                            />
                        )}

                        <div className="imageProfileDescription">
                            <div className="textAndIconsContainer">
                            {loading ? (
                                <>
                                <div className="card__skeleton card__title"></div>
                                <div className="card__skeleton card__title"></div>
                                </>
                            ) : (
                                <>
                                <h1>{username}</h1>
                                <p style={{color: "#FFF"}}>{type}</p>
                                </>
                            )}

                            <div className="socialIcons">
                                
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-google"></i>
                                <i className="fab fa-pinterest-p"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                            </div>
                        </div>
                    </div>

                        <div style={{minHeight: '20vh'}} className="row">          
                            <ContactInfo
                                loading={loading}
                                
                                data={[
                                    { icon: <i className="fas fa-map-marker-alt"></i>, value: location },
                                    { icon: <i className="fas fa-phone"></i>, value: phoneNumber },
                                    { icon: <i className="fas fa-envelope"></i>, value: email },
                                    { icon: <i className="fas fa-globe"></i>, value: website },
                                    ]}
                                />     

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
                            
                    
        
                           

                </div>

            









</>
   
    )
}
export default eventDescription;