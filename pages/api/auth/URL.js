const App_URL = `https://eventbuznew.online/api/v1`

const registrationByEmail = `${App_URL}/register`
const checkEmailURL = `${App_URL}/check-email`
const resendVerificationCodeURL = `${App_URL}/resend-email-verification-code`
const verifyEmailURL = `${App_URL}/verify-email`
const sendSMS = `${App_URL}/send-sms`
const organizationTypeListURL = `${App_URL}/organiser/type`
const subscriptionsURL = `${App_URL}/packages/all`
const profileData = `${App_URL}/show-profile`
const switchProfileURL = `${App_URL}/switch-profile`
const getPlacesURL = `${App_URL}/get-user-places` 
const getSuppliersURL = `${App_URL}/get-user-suppliers`
const eventoptionsURL = `${App_URL}/create-event-option`
const eventScheduleURL = `${App_URL}/event-schedule`
const deleteScheduleURL = `${App_URL}/event-schedule/(createEvent_ID, scheduleID)`; // Remove the optional chaining operator
const editScheduleURL = `${App_URL}/event-schedule/(scheduleID)`; // Remove the optional chaining operator
const getUserSupplierURL = `${App_URL}/get-user-suppliers`
const switchProfileURl = `${App_URL}/switch-profile`
const getListTypesURL = `${App_URL}/events/type`
const createEventSponsorURL = `${App_URL}/create-event-sponsor`
const countryListURL = `${App_URL}/country/all`
const keywordsURL = `${App_URL}/keyword/all`
const createEventAdditionalURL = `${App_URL}/create-event-additional-field`
const createEventVenueURL = `${App_URL}/create-event-venue-location`
const eventDetailsURL = `${App_URL}/events/(eventID)/details`
const allEventsURL = `${App_URL}/get-events/all`


export {registrationByEmail, checkEmailURL, resendVerificationCodeURL, verifyEmailURL, sendSMS, organizationTypeListURL, subscriptionsURL, profileData, switchProfileURL, getPlacesURL, getSuppliersURL,
 eventoptionsURL, eventScheduleURL, deleteScheduleURL, editScheduleURL, getUserSupplierURL,
 switchProfileURl, getListTypesURL, createEventSponsorURL, countryListURL, keywordsURL,
 createEventAdditionalURL, createEventVenueURL, eventDetailsURL, allEventsURL,
}