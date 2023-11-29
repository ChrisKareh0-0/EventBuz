import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {useState, useMemo, useEffect} from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import "react-datepicker/dist/react-datepicker.css";
import { organizationTypeList, registerEmail } from './api/auth/APICalls'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import { Store } from '@/Redux/store'
import { setReduxEmail } from '@/Redux/slice'
import Header from '@/Components/Header'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import imageByIndex from '../functions/imageByIndex'
import HorizontalCaroussel from "@/Components/HorizontalCaroussel";
import { useCallback } from "react";
import { Thumb } from '../Components/VerticalThumbSlider'
import styled from 'styled-components'







const RegistrationUser = () => {
     //carousel
     const OPTIONS = {axis: 'x'}
     const OPTIONS2 = {}
     const SLIDE_COUNT = 3
     const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

     const [emblaMainRef, emblaMainApi] = useEmblaCarousel(OPTIONS, [Autoplay()])
     const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
         containScroll: 'keepSnaps',
         dragFree: true
       })
       const [emblaRef3] = useEmblaCarousel(OPTIONS2, [Autoplay()])
       const [emblaRef2] = useEmblaCarousel({}, [Autoplay()])
 
       const [selectedIndex, setSelectedIndex] = useState(0)


    const [accessToken,setAccessToken] = useState('')

    const [name, setName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [confEmail, setconfEmail] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [nationality, setNationality] = useState('')
    const [role, setRole] = useState('')
    const [signinType, setSignInType] = useState('')
    const [organizationName, setorganizationName] = useState('')
    const [organizationType, setOrganizationType] = useState([])
    const options = useMemo(() => countryList().getData(), [])

    //Redux
    const statusMessage = useSelector( state => state.data.statusMessage)
    const organizationList = useSelector(state => state.data.organizationList)

    const router = useRouter()

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    useEffect(() => {
        organizationTypeList()
        const Token = localStorage.getItem('access_Token')
        setAccessToken(Token)
        console.log("LOCAL STORAGE",Token)
        setRole('organizer')
        setSignInType('email')
        // Store.dispatch(setStatusMessage(null))
    }, []);

    const onThumbClick = useCallback(
      (index) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
      },
      [emblaMainApi, emblaThumbsApi]
    )


    const changeHandler = value => {
          console.log(value.label)
          setCountry(value)
          console.log(country)
      }
      const TypeHandler = value => {
        console.log("Selected value of organization type",value)
        setOrganizationType(value)
    }

      const handleEmailConfirmation= () => {
        if(email != confEmail){
          return false
        }
      }

      const handleDateChange = (e) => {
        console.log("DATE", e.target.value)
        setDob(e.target.value)
      }
      const genderHandler= (e) => {
        console.log("selected gender", e.target.value)
        setGender(e.target.value)
      }
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
          fontWeight: 500,
          fontSize: "10",
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: "63px",
          border: "none",
          outline: "none",
          padding: "0.4vw",
          width: "380px",
          height: "40px",
          transition: ".4s",
          marginLeft: "10px",
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            position:"absolute",
            marginBottom: 30,
            marginLeft: 10,
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
           marginLeft: 340,
           width: 40,
           height: 40,
           position: "absolute",
           marginBottom: 25,
           
           
          }),
          indicatorSeparator: () => ({
            display: 'none',  // Hide the divider
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#333', // Change this to your desired color
            width: 380,
            marginLeft: 20,
            color: "#FFF"
          }),
          option: (provided, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...provided,
              fontFamily: "sans-serif",
              fontSize: 13,
              backgroundColor: isDisabled
                ? null
                : isSelected
                ? '#666'  // Change this to your desired selected color
                : isFocused
                ? '#444'  // Change this to your desired focused color
                : null,
              ':active': {
                ...provided[':active'],
                backgroundColor: !isDisabled && '#555', // Change this to your desired active color
                
              },
            };
          },
          singleValue: (provided, state) => {
            return { ...provided, color: 'white' };  // Replace 'green' with your desired color
          },
      };
      const StyledSelectWrapper = styled.div`
      .css-1p3m7a8-multiValue {
        background-color: #B62872;
        color: #FFF;
        border-radius: 120px !important;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center; 
        
      }
      .css-wsp0cs-MultiValueGeneric {
        margin: 0; 
        padding-left: 5; 
        font-size: 12px;
        
      }
      .css-tj5bde-Svg {
        margin-bottom: 10px;
      }

      .css-1qdliqf-control{
        margin-top: 45px;
      }

      .css-12a83d4-MultiValueRemove:hover {
        background-color: rgba(0,0,0,0);
        color: #FFF;
    }
    
    `;

    return (
    <>
    <Header />
      <div style={{ backgroundColor: '#25282D', display: 'grid', marginTop: 40}}>
          <div className="login">
              <div className="HeaderTitle" style={{marginTop: "5%"}}>
                  <p className="titleText">Sign Up</p>
              </div>
              <div className="signUpContainer">


                <div className="SignupField"  style={{paddingTop: 80}} >
                <div className="Input">
                    <a style={{ alignSelf: "flex-start", marginLeft: '150px' }}>Role</a>
                    <select style={{ backgroundColor: "#000", width: '500px', marginLeft: '150px' }} value={role} onChange={handleRoleChange} className="input">
                        <option value="" disabled>Select Role</option>
                        <option value="User">User</option>
                        <option value="Organizer">Organizer</option>
                    </select>
                </div>
                </div>
                <div className="SignupField">
                    
                    

                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>First Name</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setName(e.currentTarget.value)}}></input>
                    </div>
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Last Name</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setlastName(e.currentTarget.value)}}></input>
                    </div>
                </div>

                <div className="SignupField">
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Email</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setemail(e.currentTarget.value)}}></input>
                    </div>
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Confirm Email</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setconfEmail(e.currentTarget.value)}}></input>
                    </div>
                </div>

                {role === 'Organizer' && (

                <div className="SignupField">
                    <div style={{paddingTop: "27px"}} className="Input">
                        <a style={{alignSelf: "flex-start"}}>Organization Name</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setorganizationName(e.currentTarget.value)}}></input>
                    </div>
                    <div className="Input">
                        <a style={{alignSelf: "flex-start", position:"absolute", paddingTop: "20px"}} >Organization Type</a>
                        <StyledSelectWrapper>
                            <Select isMulti styles={customStyles} options={organizationList} value={organizationType} onChange={TypeHandler}/>
                        </StyledSelectWrapper>
                    </div>
                </div>
                )}

                <div className="SignupField">
                    <div>
                        <a style={{alignSelf: "flex-start"}}>Country Picker</a>
                        <Select styles={customStyles} options={options} value={country} onChange={changeHandler}/>
                    </div>
                    <div className="Input">
                    <a style={{alignSelf: "flex-start"}}>Phone Number</a>
                    <PhoneInput
                        className='phoneInput'
                        placeholder="Enter phone number"
                        style={{backgroundColor: "#000"}}
                        value={phoneNumber}
                        onChange={setphoneNumber}/>
                    </div>
                </div>
                <div className="SignupField">
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Gender</a>
                        <select style={{backgroundColor: "#000"}} name="" id="" className="form-control" value={gender} onChange={genderHandler}>
                    <option value="" disabled defaultValue>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Rather Not Say</option>
                </select>
                    </div>
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Date Of Birth</a>
                        <input style={{backgroundColor: "#000"}} onChange={handleDateChange}  className="input"  type="date" name="dateofbirth" id="dateofbirth" ></input>
                    </div>
                </div>
                <div className="SignupField" style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="Input">
                        <a style={{alignSelf: "flex-start"}}>Nationailty</a>
                        <input style={{backgroundColor: "#000"}} type="text" name="text" className="input" onChange={e => {setNationality(e.currentTarget.value)}}></input>
                    </div>
                    <button className="loginButton" style={{marginTop: 35, marginLeft:280, height: 40, marginRight: 20}} onClick={ () => {
                            registerEmail(name, lastName, email, gender, phoneNumber, country.label, nationality, dob, role, signinType, organizationName, organizationType, accessToken)
                            setTimeout(()=> {
                                if(statusMessage == 200) {
                                    router.push("/Verify", { query: { param: email } }); 
                                    // Store.dispatch(setReduxEmail(email))
                                    // localStorage.setItem('email', email)
                                }
                            },1000)
                        }}>
                            Continue
                        </button>
                    
                    </div>
                </div>
            </div>

            <div className="top-right" style={{marginTop: 50, flexDirection:'column', width: 1000, marginLeft: 80}}>
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

export default RegistrationUser