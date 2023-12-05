import { useRouter } from "next/router";
import {useEffect, useMemo, useState} from "react";
import { toast } from "react-toastify";
import axios from 'axios'; 
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import MapComponent from "@/Components/MapComponent";
import {useSelector} from "react-redux";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import FileUploadComponent from "@/pages/singleFileUpload";
import PromotionalVideosAndImages from "@/Components/PromotionalVideos&Images";
import Scheduler from "@/Components/oldEventCalendar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import FieldRow from "@/Components/FieldRow";
import CKeditor from "@/Components/ckEditor";
import countryList from "react-select-country-list";




const EditEvent = () => {
    const [inputValues, setInputValues] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("General Information");
    const [listTypes, setListTypes] = useState([])
    const [keywords, setKeywords] = useState([])
    const [loading, setLoading] = useState(true);
    const [nameCountry, setNameCountry] = useState([])
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [eventSponsorData, setEventSponsorData] = useState({ file: null, preview: null });
    const [scheduleData, setScheduleData] = useState([])
    const router = useRouter();
    const { eventID } = router.query;
    const [isClientSide, setIsClientSide] = useState(false);
    const options = useMemo(() => countryList().getData(), [])

//Redux
    const countryRedux = useSelector(state => state.data.countryRedux)

    let loadRendered = false;


    const getCategoryFields = (category) => {
        switch (category) {
            case "General Information":
                return categories["General Information"];
            case "Venue Location":
                return categories["Venue Location"];
            case "Contact Person":
                return categories["Contact Person"];
            case "Contact Persons":
                return categories["Contact Persons"];
            case "Social Media":
                return categories["Social Media"];
            case "Options":
                return categories["Options"];
            default:
                return [];
        }
    }

    useEffect(() => {
        if (eventID) {
            countryListapi();
            getEventDetails();
            getlistTypes();
            getKeywords();
        }
        
    }, [eventID, selectedCategory]); // Ensure useEffect runs when eventID changes

    //Style
    const selectStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'white',
        backgroundColor: state.isSelected ? '#b62872' : state.isFocused ? 'grey' : 'black',  // "blue" is the hover color
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#2a2b2e'
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white'
      }),
    };

    //APIs
    const getEventDetails = async () => {
        try {
            const response = await axios.get(`https://stageeventbuz.online/api/v1/events/${eventID}/details`);
            console.log("[+] EDIT DATA", response.data.data)
            populateFormWithEventData(response.data.data);
            setScheduleData(response.data.data.schedules)
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch event data');
        }
    };

    const getlistTypes = async () => {
      const axios = require('axios');
  
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/events/type',
        
      }
      await axios.request(config)
      .then((response) => {
          console.log("[+] Types List",response.data.data)
          
  
        const nameTypes = response.data.data.map(item => ({
          value: item.id || `type-${index}`,
          label:item.name
        }));
        setListTypes(nameTypes)
      })
      .catch((error) => {
          //console.log(error)
      })
    }

    const getKeywords = () => {
      const axios = require('axios');
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://stageeventbuz.online/api/v1/keyword/all',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }
    };
    
    axios.request(config)
    .then((response) => {
      //console.log("[+] KEYWORDS",response.data.data);
      
      const keywordOptions = response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setKeywords(keywordOptions);
    })
    .catch((error) => {
      //console.log(error);
    });
    }

    const countryListapi = () => {
      const axios = require('axios');
    
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/country/all',
        headers: { }
      };
    
      axios.request(config)
      .then((response) => {
        console.log("[+] COUNTRIES",response.data);
    
        // Ensure that the data exists and is an array before mapping
        if (response.data && Array.isArray(response.data.data)) {
          // Transform the response data to the format required by react-select
          const formattedCountries = response.data.data.map(country => ({
            label: country.name,
            value: country.code, // Or whatever unique identifier you have for each country
            id: country.id 
    
          }));
          setNameCountry(formattedCountries);
        } else {
          console.error('Unexpected response format');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    //Venue Location Functions
    let mapRendered = false;

    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
      // setInputValues({})
    }
    const renderMapComponent = () => {
      if (!mapRendered) {
        mapRendered = true;
        
        return <MapComponent  onLoad={handleMapLoad}/>
        
      }
    }
    const handleMapLoad = () => {
      setLoading(false);  // Set loading to false when the map has loaded
    };
  
    
    

    const categories = {
        "General Information": ["name", "type", "keyword", "description"],
        "Venue Location": ["venue_name", "country", "city", "building_name", "room_name", "room_number", "full_address", "street"],
        "Contact Person": ["Contact Name", "Contact Phone", "Contact Email"],
        "Event Sponsor": [],
        "Promotional Video and Images": ["contact_name", "contact_phone", "contact_email"],
        "Event Schedule": ["Contact Name", "Contact Phone", "Contact Email"],
        "Social Media": ["facebook", "instagram", "twitter", "pinterest", "linkedin"],
        "Options": ["Show on Main Calendar?", "Free Event?", "Reservations", "Max. Number of Orders, Tickets Additional Fields", "Tag Line", "Event Term & Condition", "Ticket Attachment"],
        "Additional Fields": ["Contact Name", "Contact Phone", "Contact Email"],
        // "Notifications": ["Notification List", "Summaries", "On App Message", "Email Message"],
        // "Invitations": ["Invitation List", "Summaries", "On App Message", "Email Message", ],
        // "Ticketing": ["Contact Name", "Contact Phone", "Contact Email"],
      };
      
      const handleInputChange = (fieldType ,fieldName, selectedOptions) => {
        console.log("Field Type",fieldType)

        if (fieldType == 'select') {
          const updatedTypes = selectedOptions.map(option => ({
            id: option.value,  
            name: option.label
        }));

        setInputValues(prevValues => ({
            ...prevValues,
            [fieldName]: updatedTypes
        }));
        } else if (fieldType == 'creatableSelect') {
          const updatedKeywords = selectedOptions.map(option => ({
                    value: option.value,
                    label: option.label
                }));
            
                setInputValues(prevValues => ({
                    ...prevValues,
                    [fieldName]: updatedKeywords
                }));
        } else {
           // Handling text input
        setInputValues(prevValues => ({
          ...prevValues,
          [fieldName]: selectedOptions // selectedOptions is the text value for text inputs
      }));
        }
          
        
      
        

      
      }; 
        
        
//   if (fieldName === 'keyword') {
//     // Ensure the format is an array of { value, label } objects
//     const updatedKeywords = selectedOptions.map(option => ({
//         value: option.value,
//         label: option.label
//     }));

//     setInputValues(prevValues => ({
//         ...prevValues,
//         [fieldName]: updatedKeywords
//     }));
// } 
    
// //Handle text Inputs
// setInputValues(prevValues => ({
//   ...prevValues,
//   [fieldName]: selectedOptions // Assuming selectedOptions is the event for text input
// }));


    const populateFormWithEventData = (eventData) => {
        const transformedTypes = eventData.types.map(type => ({
            value: type.id,
            label: type.name
        }));

        let transformedKeywords = [];
        if (Array.isArray(eventData.keywords)) {
            transformedKeywords = eventData.keywords.map(keyword => ({
                value: keyword.id,
                label: keyword.name
            }));
        }

        // Check if contact is not null/undefined before accessing its properties
        const contact_name = eventData.contact ? eventData.contact.name || '' : '';
        const contact_phone = eventData.contact ? eventData.contact.phone || '' : '';
        const contact_email = eventData.contact ? eventData.contact.email || '' : '';

        // For sponsors, ensure that it's an array and each element has name and url properties
        let sponsors = Array.isArray(eventData.sponsors) ? eventData.sponsors.map(sponsor => ({
            id: sponsor.id,
            name: sponsor.name || '',
            url: sponsor.url || ''
        })) : [];

        const media = [
            { id: eventData.media.event_main_photo?.id || null, url: eventData.media.event_main_photo?.url || null },
            { id: eventData.media.event_additional_photo1?.id || null, url: eventData.media.event_additional_photo1?.url || null },
            { id: eventData.media.event_additional_photo2?.id || null, url: eventData.media.event_additional_photo2?.url || null },
            { id: eventData.media.event_additional_photo3?.id || null, url: eventData.media.event_additional_photo3?.url || null },
            { id: eventData.media.event_additional_photo4?.id || null, url: eventData.media.event_additional_photo4?.url || null },
            { id: eventData.media.event_main_video?.id || null, url: eventData.media.event_main_video?.url || null }
        ];



        setInputValues({
            name: eventData.name || 'null',
            type: transformedTypes,
            keyword: transformedKeywords,
            description: eventData.description || 'null',
            contact_name,
            contact_phone,
            contact_email,
            types: eventData.types || [],
            keywords: transformedKeywords,
            schedules: eventData.schedules || [],
            sponsors, // Use the sponsors array with default values for name and url
            additional_fields: eventData.additional_fields || [],
            media: media,
            venue_location: eventData.venue_location || {},
            country: eventData.venue_location?.country || 'null',
            venue_name: eventData.venue_location?.venue_name || 'null',
            city: eventData.venue_location?.city || 'null',
            building_name: eventData.venue_location?.building_name || 'null',
            room_name: eventData.venue_location?.room_name || 'null',
            room_number: eventData.venue_location?.room_number || 'null',
            full_address: eventData.venue_location?.full_address || 'null',
            street: eventData.venue_location?.street || 'null',
            social_media: eventData.social_media || {},
            facebook: eventData.social_media.facebook || 'null',
            instagram: eventData.social_media.instagram || 'null',
            twitter: eventData.social_media.twitter || 'null',
            pinterest: eventData.social_media.pinterest || 'null',
            linkedin: eventData.social_media.linkedin || 'null',
            options: eventData.options || {},
        });

        console.log("Updated Input Values:", inputValues);
    };

    // Observe changes to inputValues
    useEffect(() => {
        setIsClientSide(true);
        console.log("Data in edit", inputValues)
    }, []);

    // Add the return statement for your component's JSX
    return (
        <div className="backgroundCreateEvent" style={{minHeight: '200vh'}}>
            <div className="container">


                <div className="category-list">
                {Object.keys(categories).map((category) => (
                    <div
                        key={category}
                        className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                        onClick={() => { 
                        setLoading(true)
                        handleCategoryClick(category) }}
                    >
                        {category}
                    </div>
                    ))}
                </div>

                <div className="input-fields">
        <h2>{selectedCategory}</h2>
       { (() => {
        switch (selectedCategory) {
            case "General Information":
            const generalInfoFields = categories["General Information"];
            if (!generalInfoFields) return <p>General Information not found</p>;
            
            return generalInfoFields.map((title, index) => (
              <div key={`${selectedCategory}-${title}-${index}`} className="input-group">
              <label>{title}</label>
                {title == "keyword" && isClientSide ? (
                <CreatableSelect 
                key={`${selectedCategory}-keyword`} 
                isMulti 
                options={keywords}  
                value={inputValues.keyword}
                onChange={selectedOptions => handleInputChange('creatableSelect', 'keyword', selectedOptions)}
            />
            
                ) : title== "type" && isClientSide ? (
                
                  <Select 
                      key={`${selectedCategory}-type`}
                      options={listTypes} 
                      isMulti  
                      value={inputValues.types ? inputValues.types.map(type => ({
                          value: type.id,  // Make sure this is in sync with your state
                          label: type.name
                      })) : []}
                      onChange={selectedOptions => handleInputChange('select', 'types', selectedOptions)}
                  />                  
                ) : (
                  <input 
                  key={`${selectedCategory}-${title}`}
                  type="text" 
                  placeholder={`Enter ${title}`} 
                  value={inputValues[title] || ''}
                  onChange={(e) => handleInputChange('text', title, e.target.value)}
                  style={{backgroundColor: "#3b3b3b"}}
              />
                )}
            </div>
            ));
            case "Venue Location":
              const renderLoading = () => { 
                if (!loadRendered) {
                  loadRendered = true
            
                  return <div className='loaderContainer'><div className='loader'> </div></div>
                }
              }
              const VenueLocationFields = categories["Venue Location"];
              

              
              return VenueLocationFields.map((title, index, fields) => (
              <>
                <div key={`venueLocation-${index}`} className='input-group'>
                  {loading && (
                    renderLoading()
                  ) }
                    {renderMapComponent()}
                  <label>{title}</label>
                    {title == "country" && (
                        <input disabled={true} style={{color: "#FFF", backgroundColor:"#3b3b3b"}} placeholder={countryRedux}/>
                    )}

                  {title != "country" && (
                        <input 
                        style={{color: "#FFF", backgroundColor:"#3b3b3b"}} 
                        type="text" 
                        value={inputValues[title] || ''}
                        onChange={(e) => {
                          console.log("inputValue",inputValues)
                          handleInputChange('text', title, e.target.value)}}
                        
                    />
                  )}
                </div>
                
              </>
              ))

            case "Contact Person":
                const contactPersonFields = categories["Contact Person"];
                if (!contactPersonFields) return <p>Contact Person not found</p>;

                return contactPersonFields.map((title, index) => (
                    <div key={`${selectedCategory}-${index}`} className="input-group">
                        <label>{title}</label>
                        {title === "Contact Phone" ? (

                            <PhoneInput
                                style={{marginTop:0, marginLeft: 0, borderRadius: 10, backgroundColor: "#3b3b3b", border: "1px solid #cccccc", minWidth:'100%'}}


                                value={inputValues.contact_phone || 'null'}
                                onChange={(value) => handleInputChange({ target: { value } }, title)}
                            />



                        ) : (
                            <input
                                key={`${selectedCategory}-${title}`}
                                type="text"

                                value={inputValues[title] || 'null'}
                                onChange={(e) => handleInputChange(e, title)}
                                style={{backgroundColor: "#3b3b3b"}}
                            />
                        )}
                    </div>
                ));
            case "Event Sponsor":
                const handleAddElements = () => {
                    setElements(prevElements => {
                        const newElements = [...prevElements];
                        newElements.unshift({ id: nextId });
                        setNextId(prevNextId => prevNextId + 1);  // Functional update
                        return newElements;
                    });
                };
                const handleSponsorInputChange = (id, field, value) => {
                    setElements(prevElements => prevElements.map(element =>
                        element.id === id
                            ? { ...element, [field]: value }
                            : element
                    ));
                    console.log(elements)
                };
                const handleRemoveElement = (id) => {
                    console.log('Removing element with id:', id);  // Log the id value
                    setElements(prevElements => prevElements.filter(element => element.id !== id));
                }

                const isSingleEventSponsorValid = (element) => {
                    return element.sponsorName && element.sponsorURL;
                }

                const handleSaveAndAdd = (id) => {
                    // if(!isEventSponsorValid()){
                    //   toast.error("Please fill in all the fields")

                    // } else {

                    handleAddElements();
                    createEventSponsor(elements)
                    // }
                }
                const handleEventSponsorFileUpload = (file) => {
                    // Handle the file upload for Event Sponsor
                    setEventSponsorData({ file: file, preview: URL.createObjectURL(file) });
                };
                const isEventSponsorValid = () => {
                    return eventSponsorData.file !== null && elements.every(element => element.sponsorName && element.sponsorURL);
                };
                console.log("Data before event sponsor", inputValues)
                console.log("Data in event sponsors", inputValues.sponsors)
                return (
                    <div>
                        {inputValues.sponsors.length === 0 ? (
                            <div className='uploadZones'>
                                <FileUploadComponent onFileUpload={handleEventSponsorFileUpload} />

                                <div style={{marginTop:'60px'}}>
                                    <input
                                        type="text"
                                        placeholder="Sponsor Name"
                                        style={{marginTop: 20, width: "145%", backgroundColor: "#3b3b3b"}}
                                        value={''} // Empty value for new sponsor
                                        onChange={e => handleSponsorInputChange('sponsorName', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Sponsor URL"
                                        style={{marginTop: 30, width: "145%", backgroundColor:"#3b3b3b"}}
                                        value={''} // Empty value for new sponsor
                                        onChange={e => handleSponsorInputChange('sponsorURL', e.target.value)}
                                    />
                                </div>
                                <button className='userProfileButton' onClick={handleSaveAndAdd}>Add Sponsor</button>
                            </div>
                        ) : (
                            inputValues.sponsors.map((element, index) => (
                                <div key={element.id} className='uploadZones'>
                                    <FileUploadComponent onFileUpload={handleEventSponsorFileUpload} />

                                    <div style={{marginTop:'60px'}}>
                                        <input
                                            type="text"

                                            style={{marginTop: 20, width: "145%", backgroundColor: "#3b3b3b"}}
                                            value={element.name || ''}
                                            onChange={e => handleSponsorInputChange(element.id, 'sponsorName', e.target.value)}
                                        />
                                        <input
                                            type="text"

                                            style={{marginTop: 30, width: "145%", backgroundColor:"#3b3b3b"}}
                                            value={element.url || ''}
                                            onChange={e => handleSponsorInputChange(element.id, 'sponsorURL', e.target.value)}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection:'column' ,justifyContent: 'flex-end', gap: 3, marginBottom:30, marginLeft: 60 }}>
                                        <button className='userProfileButton' style={{marginLeft: 0, width: 160}} onClick={() => handleSaveAndAdd(element.id)}><a style={{marginLeft:62}}>Save</a></button>
                                        {index !== 0 && (
                                            <button
                                                disabled={!isSingleEventSponsorValid(element)}
                                                className='userProfileButton'
                                                style={{marginLeft: 0, width: 160}}
                                                onClick={() => handleRemoveElement(element.id)}
                                            >
                                                <a style={{marginLeft:60}}>Delete</a>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}




                        {eventSponsorData.preview && (
                            <>
                                <a style={{marginTop: '30px'}}>Uploaded Image Preview</a>
                                <div style={{marginLeft:'50px'}}className="file-preview">
                                    <img src={eventSponsorData.preview} alt="Uploaded File Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                </div>
                            </>
                        )}
                    </div>
                );
            case "Promotional Video and Images":
                const mediaItems = [...Array(6)].map((_, index) =>
                    inputValues.media && inputValues.media[index] ? inputValues.media[index] : {}
                );

                // Chunk mediaItems into pairs
                const chunkedMediaItems = [];
                for (let i = 0; i < mediaItems.length; i += 2) {
                    chunkedMediaItems.push(mediaItems.slice(i, i + 2));
                }

                const handleMediaFileChange = (file, index) => {
                    if (Array.isArray(inputValues.media)) {
                        const updatedMedia = [...inputValues.media];
                        updatedMedia[index] = { ...updatedMedia[index], file, preview: URL.createObjectURL(file) };
                        setInputValues({ ...inputValues, media: updatedMedia });
                    } else {
                        // Handle the case where media is not an array
                        console.error('inputValues.media is not an array');
                    }
                };


                return (
                    <div>
                        {Array.isArray(inputValues.media) && inputValues.media.map((fileData, index) => (
                            <PromotionalVideosAndImages
                                key={index}
                                fileData={fileData}
                                onFileChange={(file, preview) => handleMediaFileChange(file, index)}
                            />
                        ))}
                    </div>
                );

            case "Event Schedule":
                return (
                    <>
                        <Scheduler schedules={scheduleData} />
                    </>
                );

            case "Options":
                const addFieldsOp = () => {
                    // const newFields = [...fields];
                    // newFields.push({ id:new Date().getTime()})
                    // setFields(newFields);

                    // Check if any field has an empty 'name'.
                    const isAnyFieldNameEmpty = fields.some(field => !field.name.trim());

                    if (isAnyFieldNameEmpty) {
                        // Alert the user or handle the error as needed

                        toast.error("Please fill in the name for all fields before adding a new one.")
                    } else {
                        // All field names are filled, proceed to add a new field
                        const newFields = [...fields, { id: new Date().getTime(), name: '', type: 'Text', isRequired: false }];
                        setFields(newFields);
                    }
                }


                const addPhoneInput = () => {
                    setPhoneInputs([...phoneInputs, '']);
                };


                const removePhoneInput = (indexToRemove) => {
                    const newPhoneInputs = [...phoneInputs];
                    newPhoneInputs.splice(index, 1);
                    setPhoneInputs(newPhoneInputs);
                };
                const handleCurrencyChange = (selectedOption) => {
                    setCurrency(selectedOption ? selectedOption.value : '');
                };
                return (
                    <>
                        <div className="calendar-options-container">
                            {/* ... other fields ... */}
                            <a>Show on Main Calendar ?</a>
                            <Select
                                options={[
                                    { value: '1', label: 'Yes' },
                                    { value: '0', label: 'No' }
                                ]}
                                styles={selectStyles}
                                value={inputValues.options.showOnMainCalendar || 'null'}
                                onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption ? selectedOption.value : '' } }, 'show_on_main_calendar')}
                            />
                            <a>Free Event ?</a>
                            <Select
                                options={[
                                    { value: '1', label: 'Yes' },
                                    { value: '0', label: 'No' }
                                ]}
                                styles={selectStyles}
                                value={inputValues.options.freeEvent || 'null'}
                                onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption ? selectedOption.value : '' } }, 'free_event')}
                            />

                            <a>Reservations ?</a>
                            <Select
                                options={[
                                    { value: '1', label: 'Yes' },
                                    { value: '0', label: 'No' }
                                ]}
                                styles={selectStyles}
                                value={inputValues.options.reservations || ''}
                                onChange={(selectedOption) => setReservations(selectedOption.value)}
                            />


                            <div>


                            </div>

                            {reservations === '1' && (
                                <>
                                    <a>Booking Type</a>
                                    <Select
                                        placeholder="Pick your booking type"
                                        options={[
                                            { value: 'Url', label: 'Url' },
                                            { value: 'Call', label: 'Call' },
                                            { value: 'booking_on_eventBuz', label: 'booking_on_eventBuz' }
                                        ]}
                                        value={options.find(option => option.value === bookingType)}
                                        onChange={handleBookingTypeChange}
                                        styles={selectStyles}
                                    />
                                    <input type="number" placeholder="Max Number of orders" value={numberOfOrders} style={{backgroundColor: "#3b3b3b"}}  onChange={(e) => setMaxNbReservations(e.target.value)}/>

                                    <a>Currency</a>
                                    <Select
                                        options={listOfCurrencies}
                                        value={listOfCurrencies.find(option => option.value === listOfCurrencies)}
                                        onChange={handleCurrencyChange}
                                        styles={selectStyles}
                                    />


                                </>
                            )}

                            {reservations === '1' && bookingType === 'booking_on_eventBuz' && (
                                <>
                                    <div style={{width:'100%', height: '10%', marginTop:90}}></div>
                                    {ticketFields.map((field, idx) => (
                                        <div key={idx} className="ticket-field-row">
                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeTicketField(idx)} style={{ color: 'red', fontSize: '15px', marginTop: 23 }} />
                                            <input
                                                type="text"
                                                placeholder="Category Name"
                                                value={field.categoryName}
                                                onChange={(e) => handleTicketInputChange(idx, 'name', e)}
                                                style={{backgroundColor: "#3b3b3b"}}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={field.price}
                                                onChange={(e) => handleTicketInputChange(idx, 'price', e)}
                                                style={{backgroundColor: "#3b3b3b"}}
                                            />
                                            <input
                                                type="number"
                                                placeholder="NB Reservations"
                                                value={field.nbReservations}
                                                onChange={(e) => handleTicketInputChange(idx, 'number_of_tickets', e)}
                                                style={{backgroundColor: "#3b3b3b"}}
                                            />
                                            {/* <button classame="userPrfileButton" onClick={() => removeTicketField(idx)}><a>Remove</a></button> */}

                                        </div>
                                    ))}
                                    <button className="userProfileButton" style={{height: 30, marginLeft: 770, marginTop: 10}} onClick={addTicketField}><a style={{marginLeft: 35}}>Add Ticket Field</a></button>






                                    <div style={{width:'100%', height: '10%', marginTop:90}}></div>
                                    <a style={{fontSize: 25}}>Additional Fields</a>
                                    {fields.map((field, index, array) => (
                                        <FieldRow
                                            key={field.id}
                                            field={field}
                                            onInputChange={handleFieldRowChange}
                                            onDelete={deleteFieldRow}
                                            isOnlyField={index == 0}
                                            onValueChange={(newValue) => handleValueChange(field.id, newValue)}


                                        />
                                    ))}
                                    <button className="userProfileButton"  style={{marginTop: 10, height: 30, marginLeft: 770}} onClick={addFieldsOp}><a style={{marginLeft: 50}}>Add Field</a></button>

                                </>
                            )}
                            {reservations === '1' && bookingType === 'Url' && (

                                <>
                                    {websiteData.map((website, index) => (
                                        <div key={index} style={{ marginBottom: '10px', display:"flex" }}>
                                            <input
                                                type="text"
                                                placeholder="Website"
                                                value={website.value}
                                                onChange={(e) => handleWebsiteInputChange(index, e)}
                                                style={{backgroundColor: "#3b3b3b"}}
                                            />
                                            <span
                                                style={{ color: 'pink', marginTop: 15, cursor:'pointer' }}
                                                onClick={() => removeWebsiteInput(index)}
                                            >
                                        🗑️
                                    </span>
                                        </div>
                                    ))}
                                    <button onClick={addWebsiteField}>+ Add Website</button>
                                </>

                            )}
                            {reservations === '1' && bookingType === 'Call' && (
                                <div style={{marginLeft: 50, marginTop: 20}}>
                                    <label style={{color: '#FFF', marginLeft:20}}>Phones</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                        {phoneInputs.map((phone, index) => (
                                            <div className='inputCell' key={index} style={{ marginBottom: '10px', display:"flex" }}>

                                                <PhoneInput
                                                    placeholder = "Enter Phone Number"
                                                    value={phone}
                                                    onChange={(eventOrValue) => handlePhoneInputChange(index, eventOrValue)}
                                                    style={{ padding: '10px', width: '300px', marginRight: '10px' }}
                                                />
                                                <span style={{ color: 'pink', marginTop: 15, cursor:'pointer' }}  onClick={() => removePhoneInput(index)} >🗑️</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={addPhoneInput} style={{ marginTop: '10px', padding: '10px' }}>
                                        + Add New Phone
                                    </button>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="Tag Line"
                                onChange={(e) => handleInputChange(e, 'tag_line')}
                                style={{backgroundColor: "#3b3b3b", marginTop: 90}}
                            />
                            <label style={{color:"#FFF", marginTop:20}}>Event Terms & Conditions</label>
                            <CKeditor
                                name="editor1"
                                onChange={setTermsConditions}
                                editorLoaded={true}
                                style={{
                                    borderRadius: '10px',
                                    width: '500px',
                                    height: '600px'
                                }}
                            />

                        </div>
                    </>
                );

            default:
                return (
                    getCategoryFields(selectedCategory).map((field, index) => (
                        <div key={index} className="input-group" style={{backgroundColor: "#2a2b2e"}}>
                            <label>{field}</label>
                            <input type="text"  value={inputValues[field] || 'null'}
                                   onChange={(e) => handleInputChange(e, field)}
                                   style={{backgroundColor: "#3b3b3b"}}/>
                        </div>
                    ))
                );

        }
       })()}

        
{selectedCategory !== "Event Sponsor" && (
  <button 
    className="userProfileButton" 
    style={{marginLeft: 580, marginTop: 40}}
  >
    <a 
      onClick={() => {
        // //console.log(inputValues)
        // createEvent(inputValues)
        nextCategory()
        executeApiCall()
      }} 
      className="usernameTitle" 
      style={{marginLeft: 55}}
    >
      Continue
    </a>
  </button>
)}
      </div>
      <style jsx>{`
        
        .container {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          position: relative;
        }
        .category-list {
          flex: 1;
          margin-right: 20px;
          height: 700px;
          position: sticky;
          top: 0;
          overflow-x: hidden;  // Prevent horizontal scrolling
          overflow-y: auto;    // Allow vertical scrolling if content is taller than container
          
        }
        .category-item {
          padding: 10px;
          width: 370px;
          margin-left: 19px;
          margin-top: 15px;
          cursor: pointer;
          border-radius: 10px;
          color: #FFF;
          background-color: #3C3E42;
          ;
        }
        .category-item.selected {
          background-color: #B62872;
        }
        .input-fields {
          flex: 2;
          background-color: #2A2B2E;
        }

        .input-fields h2 {
          color: #FFF;
          margin-left: 30px;
          margin-top: 10px;
        }

        .input-group {
          margin-bottom: 0px;
          width: 80%;
          margin-top: 25px;
          margin-left: 70px;
        }
        .input-group label {
          display: block;
          color: white;
        }
        input {
          display: block;
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          color: #FFF;
        }
        .ckeditor {
          width: 500px;
          height: 400px;
          border-radius: 10px;
        }
        
        
      `}</style>                
            </div>
        </div>
    );
};

export default EditEvent;
