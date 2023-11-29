import { getPlacesURL, getSuppliersURL, switchProfileURL } from "@/pages/api/auth/URL"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Button, DropdownMenu, Theme } from "@radix-ui/themes"
import { Sacramento } from "next/font/google"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { toast } from "react-toastify"
import { Store } from "@/Redux/store"
import { setIsSwitch, setNotUsername } from "@/Redux/slice"
import { useSelector } from "react-redux"
import { Router, useRouter } from "next/router"

const ThirdHeader = () => {

    const [places, setPlaces] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [open, setOpen] = useState(false);
    const [stateid, setStateId] = useState(0);
    const [stateType, setstateType] = useState('');
    const [pressed, setPressed] = useState(false);
    const [switchName, setSwitchName] = useState('');
    // const [isSwitchUser, setisSwitchUser] = useState(false);
    const [Token, setToken] = useState('')

    let dropdownRef = useRef(null);

    const isSwitch = useSelector(state => state.data.isSwitch)

    const router = useRouter()

    const getUserPlaces = async () => {

        const Token = localStorage.getItem('access_Token')
        console.log("TOKEN GET USER PLACES", Token)
        
        await axios.request({
            method: 'get',
            url: getPlacesURL,
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ Token,
            },
        })
        .then((response) => {
            console.log(response)
            // const extractedNames = response.data.data.map(item => item.name);
            // setPlaces(extractedNames)
            setPlaces(response.data.data)
            console.log("Place",response.data.data)
            // console.log("PLaces names", extractedNames)
            
        })
        .catch((error) => {
            console.log(error)
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
        console.log(JSON.stringify(response.data));
        setSuppliers(response.data.data)
        })
        .catch((error) => {
        console.log(error);
        });

    }

  
    

    useEffect(() => {
        getUserPlaces()
        getUserSuppliers()
        

    },[])




    const switchProfile =  (id, type) => {
        
        console.log("OI IM TRYING TO SWITCH PROFILE")
        const profile_loggedIn = localStorage.getItem('Profile_LoggedIn')
        
        if(profile_loggedIn) {
            const tempToken = localStorage.getItem('profile_access')
            console.log(tempToken, "TEMP TOKEN")
            setToken(tempToken)
            console.log("Debugging Token in HeaderSignIn line 31", Token)
        }
    
        else {
           const  tempToken = localStorage.getItem('access_Token')
           setToken(tempToken)
           console.log("Debugging Main access Token in line 39 Switch function", tempToken)
        }



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
            'Authorization': 'Bearer '+'34|DHhs9SLHBZBi5xElsQlHTCN76Gh1GtR3r9mcHsXA78f0ceba', 
            
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
             if(type == "main") { 
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('profile_loggedIn', false)
                console.log("Switched To user")
             } else {
                localStorage.setItem('profile_loggedIn', true)
                localStorage.setItem('profile_access_token',response.data.access_token)
                console.log("Switched to Place/Supplier")
                toast.success("Switch Success ")
                
             }
             console.log("Response of switching",response.data)
             
        })
        .catch((error) => {
            console.log(error);
        });

    }


    

    return (
    <>

        {pressed && (
        <>
            <div className="card">
                <div className="card-header">
                    
                    <div onClick={() => {setPressed(false)}} className="close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.3 5.71021C17.91 5.32021 17.28 5.32021 16.89 5.71021L12 10.5902L7.10997 5.70021C6.71997 5.31021 6.08997 5.31021 5.69997 5.70021C5.30997 6.09021 5.30997 6.72021 5.69997 7.11021L10.59 12.0002L5.69997 16.8902C5.30997 17.2802 5.30997 17.9102 5.69997 18.3002C6.08997 18.6902 6.71997 18.6902 7.10997 18.3002L12 13.4102L16.89 18.3002C17.28 18.6902 17.91 18.6902 18.3 18.3002C18.69 17.9102 18.69 17.2802 18.3 16.8902L13.41 12.0002L18.3 7.11021C18.68 6.73021 18.68 6.09021 18.3 5.71021Z" fill="#222124" />
                        </svg></div>
                        <p style={{textAlign:"center", fontSize: 20}}><strong>Switch Profile</strong> </p>

                </div>
            <div className="card-body">
                {isSwitch ? (
                    <p style={{textAlign:"center", marginLeft: 55}}>Do you want to switch to Organizer Role ? </p>

                ) : (

                    <p style={{textAlign:"center", marginLeft: 55}}>Do you want to switch to {switchName.name} ? </p>

                 )}
                
            </div>
            <div className="card-footer">
                <button onClick={() => {
                    if(isSwitch == true){
                        switchProfile(switchName.id, stateType)
                        Store.dispatch(setNotUsername(switchName.name))
                    }else {

                        
                    }
                    setPressed(false)
                }} className="btn" style={{backgroundColor: "#B62872", color: '#FFF'}}>Switch</button>
                <button onClick={() => {
                    setPressed(false)
                }} className="btn btn-primary">Cancel</button>
            </div>
        </div>

        </>
        )}
        
        
        <div className="third-et-hero-tabs-container">

        <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button onClick={() => {
                        router.push('/userProfile')
                        
                    }}     className="third-et-hero-tab"  style={{fontFamily: "sans-serif", fontWeight: 100, fontSize: 13, height: 50, background:"#25282D" }}>
                    Profile
                    </Button>
                </DropdownMenu.Trigger>
            
               
        </DropdownMenu.Root>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button className="third-et-hero-tab"  style={{fontFamily: "sans-serif", fontWeight: 100, fontSize: 13, height: 50, background:"#25282D"}}>
                    My Supplier
                    </Button>
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
                            console.log(suppliers.name)
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
            
            {/* <div className="my-places-container" >
                <a className="third-et-hero-tab"  >My Places</a>
                    <div className="dropdown">
                        <ul className="dropdown-content" >
                            {places.map(places => (
                                <li key={places}>
                                    <a href="#">{places}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div> */}
           <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button style={{fontFamily: "sans-serif", fontWeight: 100, fontSize: 13, height: 50, background:"#25282D", marginLeft: 10, marginRight: 140 }}>
                        My Places
                    </Button>
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
                            // Store.dispatch(setNotUsername(places.name))
                            // setTimeout(() => {
                            //     switchProfile(place.id, "place")
                            // }, 500);
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

          

            <a onClick={ () => {console.log("Sup")}} className="third-et-hero-tab-edit"> Edit Profile </a>

        </div>
    </>
    )
}
export default ThirdHeader