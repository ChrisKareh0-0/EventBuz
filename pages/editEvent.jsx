import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
//Redux
    const countryRedux = useSelector(state => state.data.countryRedux)

    let loadRendered = false;    

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

        setInputValues(eventData.media && eventData.media.length > 0
            ? eventData.media
            : Array(6).fill({})); // Creates an array with 6 empty objects

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
            media: eventData.media || [],
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

                return (
                    <div>
                        {chunkedMediaItems.map((pair, rowIndex) => (
                            <div className="row" key={rowIndex} style={{ display: 'flex', marginTop: '40px' }}>
                                {pair.map((fileData, index) => (
                                    <PromotionalVideosAndImages
                                        key={rowIndex * 2 + index} // Unique key for each component
                                        fileData={fileData}
                                        onFileChange={(file) => handleMediaFileChange(file, rowIndex * 2 + index)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                );

            case "Event Schedule":
                return (
                    <>
                        <Scheduler schedules={scheduleData} />
                    </>
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
