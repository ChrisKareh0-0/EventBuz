import { Router, useRouter } from "next/router";
import SocialLogin from "@/Components/SocialLogin";
import Head from "next/head";
import {useEffect, useState} from "react";
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
        dragFree: true
      })
      const [emblaRef3] = useEmblaCarousel(OPTIONS2, [Autoplay()])
      const [emblaRef2] = useEmblaCarousel({}, [Autoplay()])

      const [selectedIndex, setSelectedIndex] = useState(0)

    


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
            url: 'https://stageeventbuz.online/api/v1/check-email',
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
                    router.push('/userProfile')
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
                router.push('/userProfile')
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
                <div style={{ backgroundColor: '#25282D', display: 'grid'}}>
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

                    <div className="top-right" style={{marginTop: 100, flexDirection:'column'}}>
                        <HorizontalCaroussel slides={SLIDES} options={{}} />

                        <div className="login-columnEmblaView">
                            <div className="embla-thumbs" style={{width: 150, marginLeft: 30}}>
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
                            
                            <div className="Login-rowEmblav">

                                <div className="embla2" >
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
                    </div>
                </div>
        </>
    )
}
export default login