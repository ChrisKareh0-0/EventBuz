import { Router, useRouter } from "next/router";
import SocialLogin from "@/Components/SocialLogin";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { toast } from "react-toastify";
import Header from "@/Components/Header";
import { Html } from "next/document";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import imageByIndex from '../functions/imageByIndex'
import HorizontalCaroussel from "@/Components/HorizontalCaroussel";
import { useCallback } from "react";
import { Thumb } from '../Components/VerticalThumbSlider'
import axios from "axios";
import { Store } from "@/Redux/store";
import { setEmailVerified, setPhoneVerified, setStatusMessage } from "@/Redux/slice";
import RestaurantCard from "@/Components/cardDescription";



/**
 * Summary:
 * This code defines a function named 'login' that handles the login functionality. It uses React hooks to manage state and Redux for state management. The function listens for the Enter key press event and calls the 'loginFunction' when the Enter key is pressed. It also renders a form with radio buttons for selecting the user type, an input field for entering the email, and a button for submitting the form.
 * 
 * Example Usage:
 * const login = () => {
 *   // Function code here
 * }
 * 
 * Inputs: None
 * 
 * Flow:
 * 1. The function initializes the 'router', 'email', 'password', and 'radioValue' state variables using the 'useRouter' and 'useState' hooks.
 * 2. The function defines a 'handleRadioChange' function that updates the 'radioValue' state variable when a radio button is selected.
 * 3. The function defines a 'loginFunction' that checks if the user type is selected and the email is entered. It then calls the 'checkEmail' function and redirects the user based on the response.
 * 4. The function sets up an event listener for the Enter key press event and calls the 'loginFunction' when the Enter key is pressed.
 * 5. The function renders a form with radio buttons for selecting the user type, an input field for entering the email, and a button for submitting the form.
 * 
 * Outputs: None
 */
// const [selectedRadio, setSelectedRadio] = useState(null);




const login = () =>{
    //carousel
    const OPTIONS = {axis: 'x'}
    const OPTIONS2 = {}
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [radioValue, setradioValue]=useState('');
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
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 2,
            "title": "La Petite Maison",
            "countryCode": "FR",
            "phoneNumber": "+33170360050",
            "locationText": "Paris, France",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 3,
            "title": "Pizzeria Bianco",
            "countryCode": "US",
            "phoneNumber": "+16022620200",
            "locationText": "Phoenix, AZ, USA",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 4,
            "title": "Din Tai Fung",
            "countryCode": "TW",
            "phoneNumber": "+886277381066",
            "locationText": "Taipei, Taiwan",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 5,
            "title": "Gaggan",
            "countryCode": "TH",
            "phoneNumber": "+6626521700",
            "locationText": "Bangkok, Thailand",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 6,
            "title": "Gaggan",
            "countryCode": "TH",
            "phoneNumber": "+6626521700",
            "locationText": "Bangkok, Thailand",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 7,
            "title": "Gaggan",
            "countryCode": "TH",
            "phoneNumber": "+6626521700",
            "locationText": "Bangkok, Thailand",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        },
        {
            "id": 8,
            "title": "Gaggan",
            "countryCode": "TH",
            "phoneNumber": "+6626521700",
            "locationText": "Bangkok, Thailand",
            "imageUrl": "https://cdn.britannica.com/05/80605-050-AFBADB92/Torii-ritual-gates-division-secular-Itsuku-Island.jpg"
        }
    ]
    


    //Redux
    // const statusMessage = useSelector(state => state.data.statusMessage)
    // const notVerified = useSelector(state => state.data.notVerified)
    const handleRadioChange = (e) => {
        console.log(e.target.id)
        setradioValue(e.target.id)
    }

    const onThumbClick = useCallback(
        (index) => {
          if (!emblaMainApi || !emblaThumbsApi) return
          emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
      )


      const checkEmail = async (Email, callback) => {
        console.log('Check Email exist', Email)
        
        await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://eventbuznew.online/api/v1/check-email',
            // headers: {
            //     'Content-Type' : 'application/json',
            // },
            data: {
                email : Email  
            }
    
        }) 
        .then((response) => {
            console.log("CHECK EMAIL",response.data.access_token)
            console.log("Check Email Response",response)
            if(response.status == 200) {
                Store.dispatch(setStatusMessage(response.status))
                console.log(response.data.phoneVerified)
                if(response.data.phoneVerified || response.data.emailVerified){
                    console.log('[+]LINE 107 IF')
                    toast.success('Account Found')
                    router.push('/dataDetails')
                } else {
                    console.log('[+]Line 111 else')
                    toast.success('Account Found!')
                    router.push('/Verify')
                }
                //put the value of phoneVerified and emailVerified into two redux states
                Store.dispatch(setPhoneVerified(response.data.phoneVerified))
                Store.dispatch(setEmailVerified(response.data.emailVerified))        
                // const errorMsg = isNotVerified ? "Your account isn't verified" : '';
                localStorage.setItem('access_Token', response.data.access_token)
                // callback(response.status, errorMsg)
            } else {
                callback(response.status, "Something went wrong.")
            }
        })
        .catch((error) => {
            console.log("current error",error)
            if(error.response){

                if(error.response.data.message == 'User does not exist!'){
                    toast.error('Account not found')
                    router.push('/RegistrationUser')
                }
            }
        })
    }

    const onEmailCheck = (status, errorMessage = '') => {
        console.log("Status",status)
        console.log("is the callback called ?")
        if(status === 200){
            if(errorMessage){
                router.push('/Verify')
            } else {
                router.push('/dataDetails')
            }
        } else if (status === 404) {
            toast.error ('Account not found')
            router.push('/RegistrationUser')
        } else {
            toast.error('Problem ocurred please try again')
        }
        

            
        
    }

  

    const loginFunction = () => {
        
                if(email === ""){
                    toast.error("Please, fill in the email field")
                } else {
                    checkEmail(email, onEmailCheck)
                    
                    
                }
           
                
        
    }


    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                loginFunction()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [email]);

    useEffect(() => {
        const Token = localStorage.getItem('access_Token')
        console.log("is Token emppty", Token)
    },[])
    
    return (
        <>
        <Header />
                <div style={{ backgroundColor: '#1B1C1F', display: 'grid'}}>
                    <div className="login">
                    
                    
                        
                        <div className="HeaderTitle">
                            <p className="titleText">Sign In</p>
                        </div>
                        

                    
                        <div className="SigninField">
                            <a style={{marginTop: 80}}>Email</a>
                            <input style={{width: "50%", marginLeft: 40, backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setEmail(e.currentTarget.value)}}></input>
                        </div>
                    

                        <div className="forget">
                            <div>
                                <button className="loginButton"  onClick={ () => { loginFunction() }}>
                                    Continue
                                </button>
                            </div>
                        </div>

                        <div className="socialField">
                            <SocialLogin />
                        </div>
                    
                    </div>

                    {/* <div className="top-right" style={{marginTop: 100, flexDirection:'column'}}>
                        <HorizontalCaroussel slides={events} options={{}} />

                        <div className="login-columnEmblaView" style={{marginTop: 50}}>
                            <div className="embla-thumbs" style={{width: 150, marginLeft: 30}}>
                                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                                    <div className="embla-thumbs__container">
                                        {events.map((event,index) => (
                                            <Thumb
                                                onClick={() => onThumbClick(index)}
                                                selected={index === selectedIndex}
                                                index={index}
                                                imgSrc={event.imageUrl}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="Login-rowEmblav">

                                <div className="embla2" >
                                    <div className="embla__viewport2" ref={emblaRef3}>
                                        <div className="embla__container2">
                                        {events.map((index, event) => (
                                            <div className="embla__slide2" key={index}>
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

                                <div className="embla3">
                                    <div className="embla__viewport3" ref={emblaRef2}>
                                        <div className="embla__container3">
                                        {events.map((index, event) => (
                                            <div className="embla__slide3" key={index}>
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
                    </div> */}
                </div>
        </>
    )
}
export default login