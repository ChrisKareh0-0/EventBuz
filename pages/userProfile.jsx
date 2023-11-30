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
import { setIsSwitch, setusername } from "@/Redux/slice";
import { toast } from "react-toastify";
import noImage from '../assets/NoImage.png'






const userProfile = () => {
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

    // const [isSwitchUser, setisSwitchUser] = useState(false);
    const [Token, setToken] = useState('')

    let dropdownRef = useRef(null);

    const isSwitch = useSelector(state => state.data.isSwitch)

    const router = useRouter()

    const onThumbClick = useCallback(
        (index) => {
          if (!emblaMainApi || !emblaThumbsApi) return
          emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
      )

    useEffect(() => {
        const MainUserToken = localStorage.getItem('access_Token')
        const notMainToken = localStorage.getItem('profile_access')
        console.log("Main Token", MainUserToken)
        console.log("Non Main User Token", notMainToken)
       userProfileData()
       getUserPlaces()
       getUserSuppliers()
    //    switchProfile()
    }, []);
    useEffect(() => {
        localStorage.setItem('Profile_LoggedIn', false)
        if (isDropdownOpen) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        
          // Cleanup function to reset overflow when component unmounts.
          return () => {
            document.body.style.overflow = '';
          };
    },[isDropdownOpen])

    const switchProfile =  (id, type) => {
    
        const Token = localStorage.getItem('access_Token')

        const axios = require('axios');
        const FormData = require('form-data');
        let data = new FormData();
        data.append('id', id);
        data.append('type', type);

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/switch-profile',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+Token, 
            
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
             if(type == "main") { 
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('profile_loggedIn', false)
                //console.log("Switched To user")
                userProfileData()
             } else {
                localStorage.setItem('profile_loggedIn', true)
                localStorage.setItem('profile_access_token', response.data.access_token)
                //console.log("Switched to Place/Supplier")
                toast.success("Switch Success ")
                userProfileData()
                
             }
             //console.log("Response of switching",response.data)
             
        })
        .catch((error) => {
            //console.log(error);
        });

    }

    const getUserPlaces = async () => {

        const Token = localStorage.getItem('access_Token')
        //console.log("TOKEN GET USER PLACES", Token)
        
        await axios.request({
            method: 'get',
            url: getPlacesURL,
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ Token,
            },
        })
        .then((response) => {
            //console.log(response)
            // const extractedNames = response.data.data.map(item => item.name);
            // setPlaces(extractedNames)
            setPlaces(response.data.data)
            //console.log("Place",response.data.data)
            // //console.log("PLaces names", extractedNames)
            
        })
        .catch((error) => {
            //console.log(error)
        })
    }

    const getUserSuppliers = async () => {
        const axios = require('axios');
        const Token = localStorage.getItem('access_Token')

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/get-user-suppliers',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+ Token
        }
        };

        axios.request(config)
        .then((response) => {
        //console.log(JSON.stringify(response.data));
        setSuppliers(response.data.data)
        })
        .catch((error) => {
        //console.log(error);
        });

    }

    const  userProfileData = async () =>  {
        console.log("[+] Getting User Data ")
        
        let Token = localStorage.getItem('access_Token')
        // const profile_loggedIn = localStorage.getItem('Profile_LoggedIn')
        // console.log("Value profile loggedin",profile_loggedIn)
        // if(profile_loggedIn){ 
        //     Token = localStorage.getItem('profile_access_token')
        // } else {
        //     Token = localStorage.getItem('access_Token')
        // }
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
            setemail(response.data.data.email)
            setphoneNumber(response.data.data.phone)
            setLocation(response.data.data.country)
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
            //console.log(error)
            setLoading(false)
        })
    }


 

    return (
        <>
        
  

            <div style={{backgroundColor: "#25282d", top: 0}}>
                <HeaderSignedIn />
                <SecondaryHeader />

                <div style={{display : "flex", flexDirection: 'row', paddingTop: 50}}>

                    <button onClick={()=>{
                        localStorage.setItem('Profile_LoggedIn', false)
                        router.reload()
                    }} className="justAbutton" style={{zIndex: 1000000}}> <span>Profile</span> </button>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button className="justAbutton" style={{zIndex: 1000000, marginLeft: 250, backgroundColor: "#000"}}> <span style={{marginLeft: 33}}>Suppliers</span> </button>
                        </DropdownMenu.Trigger>

                        {Array.isArray(suppliers) && suppliers.length > 0 ? (
                            <DropdownMenu.Content>
                            {suppliers.map(suppliers => (
                                <DropdownMenu.Item onClick={() => {
                                    switchProfile(suppliers.id, "supplier")
                                    setstateType("supplier")
                                    setPressed(true)
                                    setSwitchName(suppliers)
                                    Store.dispatch(setIsSwitch(true))
                                    localStorage.setItem('switched', true)
                                    localStorage.setItem('notUsername', suppliers.name)
                                    
                                    // Store.dispatch(setNotUsername(suppliers.name))
                                    //console.log(suppliers.name)
                                }} key={suppliers.id}>
                                    {suppliers.name}
                                </DropdownMenu.Item>
                            ))}
                            </DropdownMenu.Content>
                            ) : (
                                <DropdownMenu.Content style={{maxHeight: "80vh", overflowY: "auto" }}>
                                
                                    <DropdownMenu.Item >
                                        No Suppliers
                                    </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        )}
                    </DropdownMenu.Root>
                    
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button className="justAbutton" style={{zIndex: 1000000, marginLeft: 450, backgroundColor: "#000"}}> <span style={{marginLeft: 40}}>Places</span> </button>
                        </DropdownMenu.Trigger>

                        {Array.isArray(places) && places.length > 0 ? (
                            <DropdownMenu.Content>
                                {places.map(place => (
                                    <DropdownMenu.Item onClick={() => {
                                        setstateType("place")
                                        setPressed(true)
                                        setSwitchName(place)
                                        Store.dispatch(setIsSwitch(true))
                                        localStorage.setItem('switched', true)
                                        localStorage.setItem('notUsername', place.name)
                                        switchProfile(place.id, "place")
                                        
                                    }} key={place.id}>
                                        {place.name}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                            ):(
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item>
                                        No Places
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                        )}
                    </DropdownMenu.Root>
                    

                </div>
                                
                            
                
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
                                height={432} 
                                
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
export default userProfile