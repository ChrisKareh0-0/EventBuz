import { useMemo, useState } from 'react';
import FieldRow from '@/Components/FieldRow';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import 'react-phone-number-input/style.css'
import PromotionalVideosAndImages from '@/Components/PromotionalVideos&Images';
import { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import {
  createEventContact,
  createEventMedia,
  createEventOptions,
  createEventSocial,
  getListofCurrencies
} from './api/auth/APICalls';
import PhoneInput from 'react-phone-number-input'
// import ListOfCountries from './api/auth/ListOfCountries';
import { createEvent } from './api/auth/APICalls';
import MapComponent from '@/Components/MapComponent';
import { useSelector } from 'react-redux';
import CKeditor from '@/Components/ckEditor';
import { images } from '@/next.config';
import Scheduler from '@/Components/oldEventCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify'
import FileUploadComponent from './singleFileUpload';


const categories = {
  "General Information": ["name", "type", "keyword", "description"],
  "Venue Location": ["venue_name", "country", "city", "building_name", "room_name", "room_number", "full_address", "street"],
  "Contact Person": ["Contact Name", "Contact Phone", "Contact Email"],
  "Event Sponsor": [],
  "Promotional Video and Images": ["Contact Namme", "Contact Phone", "Contact Email"],
  "Event Schedule": ["Contact Name", "Contact Phone", "Contact Email"],
  "Social Media": ["facebook", "instagram", "twitter", "pinterest", "linkedin"],
  "Options": ["Show on Main Calendar?", "Free Event?", "Reservations", "Max. Number of Orders, Tickets Additional Fields", "Tag Line", "Event Term & Condition", "Ticket Attachment"],
  "Additional Fields": ["Contact Name", "Contact Phone", "Contact Email"],
  // "Notifications": ["Notification List", "Summaries", "On App Message", "Email Message"],
  // "Invitations": ["Invitation List", "Summaries", "On App Message", "Email Message", ],
  // "Ticketing": ["Contact Name", "Contact Phone", "Contact Email"],
};


export default function CreateEvent() {
  const [selectedCategory, setSelectedCategory] = useState("General Information");
  const [showOnMainCalendar, setShowOnMainCalendar] = useState('No');
  const [freeEvent, setFreeEvent] = useState('No');
  const [reservations, setReservations] = useState('No');
  const [maxNbReservations, setMaxNbReservations] = useState("");
  const [ticketAdditionalFields, setTicketAdditionalFields] = useState(false);
  const [bookingType, setBookingType] = useState("");

  const [fields, setFields] = useState([{ id: 1, name: '', field_type: 'Text', required: false }]);
  const [fieldsStrigified, setfieldsStringified] = useState([])

  const [ticketFields, setTicketFields] = useState([{ name: '', price: '', number_of_tickets: '' }]);
  const [ticketFieldsStringified, setticketFieldsStringified] = useState([])

  const [inputValues, setInputValues] = useState([])
  const [listTypes, setListTypes] = useState([])
  const [nameCountry, setNameCountry] = useState([])
  const [elements, setElements] = useState([{ id: 0 }]);
  const [loading, setLoading] = useState(true);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  
  const [numberOfOrders, setnumberOfOrders] = useState(null)
  const [phoneInputs, setPhoneInputs] = useState([]);
  const [aditionalFieldsRadio, setAditionalFieldsRadio] = useState(false)
  const [phoneData, setPhoneData] = useState([])
  const [websiteData, setWebsiteData] = useState([{ type: 'website', value: '' }]);
  const [termsConditions, setTermsConditions] = useState('')  
  const [keywords, setKeywords] = useState([])
  const [currency, setCurrency] = useState('')
  const [promoVideosImagesData, setPromoVideosImagesData] = useState(Array(8).fill({ file: null, preview: null }));
  const [eventSponsorData, setEventSponsorData] = useState({ file: null, preview: null });
  const initialFileData = new Array(8).fill({ preview: null });
  const [files, setFiles] = useState(initialFileData);
  const [nameSponsor, setnameSponsor] = useState('')
  const [urlSponsor, seturlSponsor] = useState('')


  const options = useMemo(() => countryList().getData(), [])

  const latte = useSelector(state => state.data.latitude)
  const long = useSelector(state => state.data.longitude)

  //Country Redux
  const countryRedux = useSelector(state => state.data.countryRedux)
  const listOfCurrencies = useSelector(state => state.data.listOfCurrencies)

  const [nextId, setNextId] = useState(1);

  let mapRendered = false;
  let loadRendered = false;

  const getlistTypes = async () => {
    const axios = require('axios');

  let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://stageeventbuz.online/api/v1/events/type',
      
    }
    await axios.request(config)
    .then((response) => {
        console.log(response.data.data)
        

      const nameTypes = response.data.data.map(item => ({
        value: item.id,
        label:item.name
      }));
      setListTypes(nameTypes)
    })
    .catch((error) => {
        console.log(error)
    })
  }
  
  //transformElements from sponsorName and sponsorURL to name and url for the required fields in API
  const transformElementsForAPI = (elements) => {
    return elements.map(element => ({
      name: element.sponsorName,
      url: element.sponsorURL
    }));
  };

  // const ImageSponsor = useSelector(state => state.data.sponsorPicture )
  const createEventSponsor = async(elements) => {
    const axios = require('axios');
    const Token = localStorage.getItem('access_Token')
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    console.log("EVENT SPONSOR",elements)
    const transformedElements = transformElementsForAPI(elements)
    console.log("API Sponsor Elements",transformedElements)
    console.log(elements[0].sponsorName)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:'https://stageeventbuz.online/api/v1/create-event-sponsor/',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'Bearer '+Token,
        },
        data: {
            name: elements[0].sponsorName,
            url: elements[0].sponsorURL,
            event_id:createEvent_ID,
            sponsor_image:eventSponsorData,
            
        }    
    }
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success('Event Sponsor Data Saved')
    })
    .catch((error) => {
        console.log(error)
        toast.error('Error Occurred, Please try Again')

    })
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
    console.log(response.data);

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
// 🟣 Kurisu
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data.data));
  
  const namekey = response.data.data.map(item => ({
    value: item.id,
    label:item.name
  }));
  setKeywords(namekey)
})
.catch((error) => {
  console.log(error);
});
}


const handleTicketInputChange = (index, field, event) => {
  const value = event && event.target ? event.target.value : '';
  const newTicketFields = [...ticketFields];
  newTicketFields[index] = { ...newTicketFields[index], [field]: value };
  console.log('Before:', ticketFields);
  setTicketFields( newTicketFields);
  setticketFieldsStringified(newTicketFields)
  
};

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
  input: (provided) => ({
    ...provided,
    color: 'white', // Sets text color inside the input field to white
  }),
};

const saveStateToLocalStorage = () => {
  const stateToSave = { 
    selectedCategory,
    showOnMainCalendar,
    freeEvent,
    reservations,
    maxNbReservations,
    ticketAdditionalFields,
    bookingType,
    fields,
    fieldsStrigified,
    ticketFields,
    ticketFieldsStringified,
    inputValues,
    listTypes,
    nameCountry,
    elements,
    loading,
    selectedCountryId,
    numberOfOrders,
    phoneInputs,
    aditionalFieldsRadio,
    phoneData,
    websiteData,
    termsConditions,
    keywords,
    currency,    
    }
    localStorage.setItem('createEventState', JSON.stringify(stateToSave));
    console.log('DATA SAVED', stateToSave)
  }

  useEffect(() => {
    console.log('WHAT ARE THE INPUT VALUES ?',inputValues)
  },[inputValues])

  useEffect(() => {
    saveStateToLocalStorage();
  }, [selectedCategory, showOnMainCalendar, freeEvent, reservations, maxNbReservations, ticketAdditionalFields, bookingType, fields, fieldsStrigified, ticketFields, ticketFieldsStringified, inputValues, listTypes, nameCountry, elements, loading, selectedCountryId, numberOfOrders, phoneInputs, aditionalFieldsRadio, phoneData, websiteData, termsConditions, keywords, currency]);

  

  useEffect(() => {
  
    const savedState = localStorage.getItem('createEventState');
    if(savedState) {

      const loadedState = JSON.parse(savedState);

      setSelectedCategory(selectedCategory);
      setShowOnMainCalendar(loadedState.showOnMainCalendar);
      setFreeEvent(loadedState.freeEvent);
      setReservations(loadedState.reservations);
      setMaxNbReservations(loadedState.maxNbReservations);
      setTicketAdditionalFields(loadedState.ticketAdditionalFields);
      setBookingType(loadedState.bookingType);
      setFields(loadedState.fields);
      setfieldsStringified(loadedState.fieldsStrigified);
      setTicketFields(loadedState.ticketFields);
      setticketFieldsStringified(loadedState.ticketFieldsStringified);
      setInputValues(loadedState.inputValues);
      setListTypes(loadedState.listTypes);
      setNameCountry(loadedState.nameCountry);
      setElements(loadedState.elements);
      setLoading(loadedState.loading);
      setSelectedCountryId(loadedState.selectedCountryId);
      setnumberOfOrders(loadedState.numberOfOrders);
      setPhoneInputs(loadedState.phoneInputs);
      setAditionalFieldsRadio(loadedState.aditionalFieldsRadio);
      setPhoneData(loadedState.phoneData);
      setWebsiteData(loadedState.websiteData);
      setTermsConditions(loadedState.termsConditions);
      setKeywords(loadedState.keywords);
      setCurrency(loadedState.currency);
    }
    getlistTypes()
    getListofCurrencies()
    countryListapi()
    console.log("List of currencies Redux", listOfCurrencies)
    getKeywords()

    console.log("Redux Country", countryRedux)
  },[])

  useEffect(() => {
    saveStateToLocalStorage();
  },[selectedCategory])

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

  const createEventOptions = async(inputValue) => {
    const axios = require('axios');
    const Token = localStorage.getItem('access_Token')
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    const fieldsString = JSON.stringify(fields)
    const priceCategoryString = JSON.stringify(ticketFields)
    console.log("[++] EVENT OPTIONS DATA")
    console.log("INPUT VALUE",inputValue)
    console.log("reservation", reservations)
    console.log("EVENT ID", createEvent_ID)
    console.log("Booking Type", bookingType)
    console.log("Additional Fields", fields)
    console.log("Pricing Category", ticketFields)
    console.log("OPTION IMAGE", ImageSponsor)
    console.log("Max number of orders", maxNbReservations)
    console.log("Terms and conditions", termsConditions)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:'https://stageeventbuz.online/api/v1/create-event-option/',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'Bearer '+Token,
        },
        data: {
            ...inputValue,
            reservation:reservations,
            event_id:createEvent_ID,
            bookingType:bookingType,
            additional_fields: fieldsString,
            pricing_category:priceCategoryString,
            option_image: ImageSponsor,
            max_nb_of_order: maxNbReservations,
            terms_conditions: termsConditions,
            


            
        }    
    }
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error)
        toast.error("Error Occured, please try again")
        setSelectedCategory("Options")
    })
}
    const createAdditionalFields = () => {
      const axios = require('axios');
      const createEvent_ID = localStorage.getItem('createEvent_ID')
      const Token = localStorage.getItem('access_Token')
      const fieldsString = JSON.stringify(fields)
      console.log("Event ID in Additional Fields", createEvent_ID)

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://stageeventbuz.online/api/v1/create-event-additional-field',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Authorization': 'Bearer '+Token, 
          
        },
        data : {
          fields: fieldsString,
          event_id: createEvent_ID,
        }
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }

  
  const changeHandler = value => {
    console.log(value.label)
    setCountry(value)
    console.log(country)
  }

  const handleValueChange = (fieldId, newValue) => {
    console.log("New Value for field", fieldId, "is", newValue)
  }

  //APIs
  const executeApiCall = () => {
    switch (selectedCategory){
      case "General Information":
        createEvent(inputValues, () => {
          setSelectedCategory("General Information")
        });
        break;
      case "Venue Location":
        createEventVenue(inputValues);
        break;
      case "Contact Person":
        createEventContact(inputValues, () => {
          setSelectedCategory("Contact Person")
        })
        break;
      case "Social Media":
        createEventSocial(inputValues, () => {
          setSelectedCategory("Social Media")
        })
        break;
      case "Options":
        createEventOptions(inputValues,() => {
          setSelectedCategory('Options')
        } )
        break;
      case "Additional Fields":
        createAdditionalFields()
        break;
      case "Promotional Video and Images":
        createEventMedia(files)
        break;

    }

  }

  const handleMapLoad = () => {
    setLoading(false);  // Set loading to false when the map has loaded
  };

  const renderMapComponent = () => {
    if (!mapRendered) {
      mapRendered = true;
      
      return <MapComponent  onLoad={handleMapLoad}/>
      
    }
  }



  const nextCategory = () => {


    const categoryKeys = Object.keys(categories);
    const currentIndex = categoryKeys.indexOf(selectedCategory);
    const nextIndex = (currentIndex + 1) % categoryKeys.length;
    setSelectedCategory(categoryKeys[nextIndex]);
  }

  const handleInputChange = (e, title) => {
    let newValue;
    let fieldName;
  
    if (e && e.target && typeof e.target.value !== 'undefined') {
      fieldName = title || e.target.name;
      newValue = e.target.value;
    } else if (e && e.name && typeof e.value !== 'undefined') {
      fieldName = e.name;
      newValue = e.value;
    } else {
      return;
    }
  
    const newInputValues = { ...inputValues, [fieldName]: newValue };
    setInputValues(newInputValues);
    console.log(newInputValues);
  };
  
  const handleFieldRowChange = (id, fieldName, event) => {
    const value = fieldName === 'isRequired' ? event.target.checked : event.target.value;
    setFields(fields.map(field => 
      field.id === id ? { ...field, [fieldName]: value } : field
    ));
    setfieldsStringified(JSON.stringify(fields))
    // console.log(fields)
    console.log(fieldsStrigified)
  };
  const deleteFieldRow = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

const handlePhoneInputChange = (index, eventOrValue) => {
  const value = eventOrValue && eventOrValue.target 
                    ? eventOrValue.target.value 
                    : eventOrValue;
    if (value !== undefined) {
        const newPhoneData = [...phoneData];
        newPhoneData[index] = { type: bookingType, value: value };
        setPhoneData(newPhoneData);
    }
    console.log(phoneData)
    setBookingType(phoneData)
}
const handleWebsiteInputChange = (index, event) => {
  const value = event && event.target ? event.target.value : '';
  if (value !== undefined) {
      const newWebsiteData = [...websiteData];
      newWebsiteData[index] = { type: 'website', value: value };
      setWebsiteData(newWebsiteData);
      console.log("WEBSITES",websiteData)
      setBookingType(websiteData)
  }
};
const addWebsiteField = () => {
  setWebsiteData([...websiteData, { type: 'website', value: '' }]);
};

const removeWebsiteInput = (index) => {
  const newWebsiteData = [...websiteData];
  newWebsiteData.splice(index, 1);
  setWebsiteData(newWebsiteData);
};

const addTicketField = () => {
  setTicketFields([...ticketFields, { name: '', price: '', number_of_tickets: '' }]);
};
const removeTicketField = (index) => {
  const newTicketFields = [...ticketFields];
  newTicketFields.splice(index, 1);
  setTicketFields(newTicketFields);
};


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

  }
  const handleAddField = () => {
    setTicketFields([...ticketFields, { name: '', price: '', number_of_tickets: '' }]);
  };

  const handleBookingTypeChange = (selectedOption) => {
    setBookingType(selectedOption.value);
    setInputValues(prevValues => ({
      ...prevValues,
      bookingType: selectedOption.value,
    }));
    
    // Show a default phone input field when the booking type is 'Phone'
    if (selectedOption.value === 'Call') {
      setPhoneInputs(['']);
    } else {
      setPhoneInputs([]);
    }
  };





const handleCountryChange = (title, selectedOption) => {
  if (selectedOption) {
    handleInputChange({
      name: "country_id",
      value: selectedOption.id.toString()  // convert id to string
    });
  }
};




const createEventVenue = async(inputValue) => {
  const axios = require('axios');
  const Token = localStorage.getItem('access_Token')
  const createEvent_ID = localStorage.getItem('createEvent_ID')
  
  console.log("EVENT ID", createEvent_ID)
  console.log("Country ID", selectedCountryId)
  let config = {
      method: 'post', 
      maxBodyLength: Infinity,
      url: 'https://stageeventbuz.online/api/v1/create-event-venue-location/',
      headers: {
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':'Bearer '+Token, 
      },
      data : {
        ...inputValue,
        country: countryRedux,
        event_id: createEvent_ID,
      }
  
  };
  axios.request(config)
  .then((response) => {
      console.log(JSON.stringify(response.data));
      toast.success("Event Location Created Successfully")
  })
  .catch((error) => {
      console.log(error)
      toast.error("Error Occured, please try again")
      setSelectedCategory("Venue Location")
  })
}

const handleFileChange = (file, index) => {
  const newFiles = files.map((f, i) => {
      if (i === index) {
          return { ...f, preview: URL.createObjectURL(file) };
      }
      return f;
  });
  setFiles(newFiles);
};
const rows = files.reduce((acc, current, index) => {
  if (index % 2 === 0) {
      acc.push([current]);
  } else {
      acc[acc.length - 1].push(current);
  }
  return acc;
}, []);
  return (
    

  <div className='backgroundCreateEvent' style={{minHeight: '200vh'}}>
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
          case "Promotional Video and Images":
            return (
              <div>
            {rows.map((row, rowIndex) => (
                <div className="row" style={{marginTop: '40px'}} key={rowIndex}> {/* Add styles for row */}
                    {row.map((fileData, index) => (
                        <PromotionalVideosAndImages 
                            key={index}
                            fileData={fileData}
                            onFileChange={(file) => {
                              console.log('Promotional Videos and Images Data',files)
                              handleFileChange(file, rowIndex * 2 + index)}}
                        />
                    ))}
                </div>
            ))}
        </div>
            );
            case "Event Schedule":
            return (
              <>
                <Scheduler />
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
                      value={options.find(option => option.value === showOnMainCalendar)}
                      onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption ? selectedOption.value : '' } }, 'show_on_main_calendar')}
                    />
                    <a>Free Event ?</a>
                    <Select
                      options={[
                          { value: '1', label: 'Yes' },
                          { value: '0', label: 'No' }
                      ]}
                      styles={selectStyles}
                      value={options.find(option => option.value === freeEvent)}
                      onChange={(selectedOption) => handleInputChange({ target: { value: selectedOption ? selectedOption.value : '' } }, 'free_event')}
                  />
            
                    <a>Reservations ?</a>
                    <Select
                      options={[
                        { value: '1', label: 'Yes' },
                        { value: '0', label: 'No' }
                      ]}
                      styles={selectStyles}
                      value={reservations === '1' ? { value: '1', label: 'Yes' } : { value: '0', label: 'No' }}
                      onChange={(selectedOption) => setReservations(selectedOption.value)}
                    />
                     
                      
                      <div>
                      
                      
                    </div>
                    
                    {reservations === '1' && (
                      <>
                        <a>Booking Type</a>
                        <Select 

                          options={[
                            { value: 'Url', label: 'Url' },
                            { value: 'Call', label: 'Call' },
                            { value: 'booking_on_eventBuz', label: 'booking_on_eventBuz' }
                          ]}
                          value={options.find(option => option.value === bookingType)}
                          onChange={handleBookingTypeChange}
                          styles={selectStyles}
                        />
                        <input type="number" value={numberOfOrders} style={{backgroundColor: "#3b3b3b"}}  onChange={(e) => setMaxNbReservations(e.target.value)}/>
                        
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
                                    value={field.categoryName} 
                                    onChange={(e) => handleTicketInputChange(idx, 'name', e)}
                                    style={{backgroundColor: "#3b3b3b"}}
                                />
                                <input 
                                    type="number" 

                                    value={field.price} 
                                    onChange={(e) => handleTicketInputChange(idx, 'price', e)}
                                    style={{backgroundColor: "#3b3b3b"}}
                                />
                                <input 
                                    type="number" 

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
            case "Additional Fields":
              const addFields = () => {
               const newFields = [...fields];
               newFields.push({ id:new Date().getTime()})
               setFields(newFields);   
              }

              const deleteField = (id) => {
                const newFields = fields.filter(field => field.id !== id);
                setFields(newFields)
              }
              return (
                <div>
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
                <button onClick={() => setFields([...fields, { id: new Date().getTime(), name: '', type: 'Text', isRequired: false }])}>
                  + Add Field
                </button>
              </div>
              );
              case "General Information":
                const generalInfoFields = categories["General Information"];
                if (!generalInfoFields) return <p>General Information not found</p>;
              
                return generalInfoFields.map((title, index) => (
                  <div key={`${selectedCategory}-${index}`} className="input-group">
                  <label>{title}</label>
                  {title == "keyword" ? (
                    <CreatableSelect 
                    key={`${selectedCategory}-${title}`}
                    value={keywords.filter(option => inputValues[title] && JSON.parse(inputValues[title]).includes(option.value))}

                    isMulti options={keywords}  
                    onChange={(selectedOptions) => {
                      const syntheticEvent = {
                          target: {
                              name: title,
                              value: JSON.stringify(selectedOptions.map(option => option.value))
                          }
                      };
                      handleInputChange(syntheticEvent);
                  }}
                />
                
                  ) : title== "type" ? (
                    
                    <Select 
                      key={`${selectedCategory}-${title}`}
                      options={listTypes}
                      value={listTypes.filter(option => inputValues[title] && inputValues[title].includes(option.value))}

                      isMulti  
                      onChange={(selectedOptions) => {
                        const syntheticEvent = {
                            target: {
                                name: title,
                                value: JSON.stringify(selectedOptions.map(option => option.value))
                            }
                        };
                        handleInputChange(syntheticEvent);
                    }}
                    />                                                      
                  ) : (
                    <input 
                      key={`${selectedCategory}-${title}`}
                      type="text" 

                      value={inputValues[title] || ''}
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
                  return (
                    <div>



                    {elements.map((element, index) => (
                      <div key={element.id} className='uploadZones'>
                          <FileUploadComponent onFileUpload={handleEventSponsorFileUpload} />

                        <div style={{marginTop:'60px'}}>
                          <input
                            type="text"

                            style={{marginTop: 20, width: "145%", backgroundColor: "#3b3b3b"}}
                            value={element.sponsorName || ''}
                            onChange={e => handleSponsorInputChange(element.id, 'sponsorName', e.target.value)}
                          />
                          <input
                            type="text"

                            style={{marginTop: 30, width: "145%", backgroundColor:"#3b3b3b"}}
                            value={element.sponsorURL || ''}
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
                    ))}
                    
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
                 

                  case "Venue Location":
                    const renderLoading = () => { 
                      if (!loadRendered) {
                        loadRendered = true
                  
                        return <div className='loaderContainer'><div className='loader'> </div></div>
                      }
                    }
                    const VenueLocationFields = categories["Venue Location"];
                    if(!VenueLocationFields) return <p>Venue Location not found</p>
                    return VenueLocationFields.map((title, index, fields) => (
                    <>
                      <div key={index} className='input-group'>
                        {loading && (
                          renderLoading()
                        ) }
                          {renderMapComponent()}
                        <label>{title}</label>
                        {title == "country" && (
                          <input disabled={true} style={{color: "#FFF", backgroundColor:"#3b3b3b"}} placeholder={countryRedux}/>
                        )}


                        {title != "country" && (
                              <input style={{color: "#FFF", backgroundColor:"#3b3b3b"}} type="text" value={inputValues[title] || ''}
                              onChange={(e) => handleInputChange(e, title)}/>
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

                                
                                value={inputValues[title] || ''}
                                onChange={(value) => handleInputChange({ target: { value } }, title)}
                            />
                            
                        
                            
                          ) : (
                            <input
                              key={`${selectedCategory}-${title}`}
                              type="text"

                              value={inputValues[title] || ''}
                              onChange={(e) => handleInputChange(e, title)}
                              style={{backgroundColor: "#3b3b3b"}}
                            />
                          )}
                        </div>
                      ));
                
          default:
            return (
              getCategoryFields(selectedCategory).map((field, index) => (
                <div key={index} className="input-group" style={{backgroundColor: "#2a2b2e"}}>
                  <label>{field}</label>
                  <input type="text" value={inputValues[field] || ''}
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
        // console.log(inputValues)
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
          height: 700px
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
}
