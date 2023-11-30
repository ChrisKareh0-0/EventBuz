import axios from 'axios'
import { checkEmailURL, organizationTypeListURL, registrationByEmail, resendVerificationCodeURL, sendSMS, subscriptionsURL, verifyEmailURL } from './URL'
import {toast} from 'react-toastify'
import {setEmailVerified, setListofCurrencies, setListTypes, setnotVerified, setorganizationList, setPhoneVerified, setStatusMessage} from "@/Redux/slice";
import {Store} from "@/Redux/store";
import {redirect} from 'next/navigation'
import { useSelector } from 'react-redux';


const registerEmail = (name, lastName, email, gender, phoneNumber, country, nationality, dob, role, signinType, organizationName, organizationType) => {

const FormData = require('form-data');
let data = new FormData();
data.append('name', name);
data.append('family_name', lastName);
data.append('email', email);
data.append('gender', gender);
data.append('phone', phoneNumber);
data.append('country', country);
data.append('nationality', nationality);
data.append('dob', dob);
data.append('sign_in_type', signinType);
data.append('role', role);
data.append('organization_name', organizationName);
data.append('organization_type', organizationType);

console.log("DATA",data) 


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://stageeventbuz.online/api/v1/register',
  headers: {
    'Content-Type':'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
    console.log(response);
    toast.success("Sign Up Completed")
    if(response.status = 200){
        localStorage.setItem('access_Token', response.data.access_token)
        Store.dispatch(setStatusMessage(response.status))
    }


})
.catch((error) => {
  console.log(error);
});
    

}

const registerEmailOrganizer = (name, lastName, email, gender, phoneNumber, country, nationality, dob, role, signinType) => {

    const FormData = require('form-data');
let data = new FormData();
data.append('name', name);
data.append('family_name', lastName);
data.append('email', email);
data.append('gender', gender);
data.append('phone', phoneNumber);
data.append('country', country);
data.append('nationality', nationality);
data.append('dob', dob);
data.append('sign_in_type', signinType);
data.append('role', role);

console.log("EMAIL",email)

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://stageeventbuz.online/api/v1/register',
  headers: {
    'Content-Type':'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
    console.log(response);
    toast.success("Sign Up Completed")
    if(response.status = 200){
        localStorage.setItem('access_Token', response.data.access_token)
        Store.dispatch(setStatusMessage(response.status))
    }


})
.catch((error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.log("Only the error message",error.response.data.errors)
    toast.error("Email or Phone Number exist")
    console.log("Data:", error.response.data);
    console.log("Status:", error.response.status);
    console.log("Headers:", error.response.headers);

  } else if (error.request) {
    toast.error("Something went wrong please try again")
    console.log("Request:", error.request);
  } else {
      toast.error("Something went wrong please try again")
    console.log("Error:", error.message);
  }
});
    

}

// const login = (Email) => {

// }



const resendVerificationCode = () => {
    const Token = localStorage.getItem('access_Token')
    console.log("TOKEN IN resendVerificationCode",Token)
    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: resendVerificationCodeURL,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+ Token,
        },
        
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

const verifyEmail = (otpCode) => {
    const Token = localStorage.getItem('access_Token')
    console.log("TOKEN in verifyEmail Function", Token)
    console.log(otpCode)
    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: verifyEmailURL,
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer '+ Token,
        },
        data : {
            verification_code: otpCode
        }
    })
    .then((response) => {
        console.log(response)
        if(response.status == 200){
            Store.dispatch(setStatusMessage(response.status))
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

const SendSMS = (phoneNumber) => {
    axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: sendSMS,
        headers:{
            'Content-Type' : 'application/json',
        },
        data : {
            phone : phoneNumber,
            message: "ayo put dat numba",
        }
    })
    .then((response) => {
        console.log(response)
        if(response.status == 200){
            Store.dispatch(setStatusMessage(response.status))
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

const organizationTypeList = async () => {
    await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: organizationTypeListURL,
        headers:{
            'Content-Type' : 'application/json',
        },
    })
    .then((response) => {
        const formattedOrganizationList = response.data.data.map(org => ({
            label: org.name,
            value: org.id
        }));
        Store.dispatch(setorganizationList(formattedOrganizationList));
        
    })
    .catch((error) => {
        console.log(error)
    })
}

const subscriptionsData = async () => {
    await axios.request({
        method: 'get',
        url: subscriptionsURL,
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    .then((response) => {
        console.log(response.data.data)
        return response.data.data
    })
    .catch((error) => { 
        console.log(error)
    })
}

const createEvent = async (inputValue, onError) => {
    console.log(typeof inputValue)
    console.log("Data passed to API",inputValue)
    const axios = require('axios');
    const Token = localStorage.getItem('access_Token')
    console.log("TOKEN in verifyEmail Function", Token)
    
    //send via parameter the inputValue 


let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://stageeventbuz.online/api/v1/create-event',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Authorization': 'Bearer '+Token, 
    
  },
  data : inputValue
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  localStorage.setItem('createEvent_ID', response.data.data.id)
    toast.success("General Information Saved")
})
.catch((error) => {
  console.log(error);
  toast.error("Error occured, try again")
  onError()
});

}


const createEventContact = async(inputValue, onError) => {
    const axios = require('axios');
    const Token = localStorage.getItem('access_Token')
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:'https://stageeventbuz.online/api/v1/create-event-contact',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'Bearer '+Token,
        },
        data: {
            ...inputValue,
            event_id: createEvent_ID,
            
        }    
    }
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Contact Information Saved")
    })
    .catch((error) => {
        console.log(error)
        toast.error("Error occured, please try again")
        onError()
    })
}



const createEventSocial = async(inputValue, onError) => {
    const axios = require('axios');
    const Token = localStorage.getItem('access_Token')
    const createEvent_ID = localStorage.getItem('createEvent_ID')
    console.log(inputValue)
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:'https://stageeventbuz.online/api/v1/create-event-social-media/',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization': 'Bearer '+Token,
        },
        data: {
            ...inputValue,
            event_id:createEvent_ID,
            
        }    
    }
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error)
        toast.error("Error Occured, Please Try Again")
        onError()
    })
}



const getListofCurrencies = async() => {
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://stageeventbuz.online/api/v1/currency/all',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data.data);
      const formattedCurrencyList = response.data.data.map(org => ({
        label: org.name,
        value: org.id,
      }))
      Store.dispatch(setListofCurrencies(formattedCurrencyList))
    })
    .catch((error) => {
      console.log(error);
    });
    
}

export {registerEmail,  resendVerificationCode, verifyEmail, SendSMS, organizationTypeList, subscriptionsData, createEvent, createEventContact, createEventSocial, registerEmailOrganizer, getListofCurrencies}
