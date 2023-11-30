import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
    verticalCarouselIndex: null,
    username: '',
    notusername: '',
    statusMessage: null,
    notVerified: false,
    organizationList:[],
    placeName: '',
    listTypes: [],
    phoneVerified: '',
    emailVerified: '',
    reduxEmail: '',
    latitude: null,
    longitude: null,
    sponsorPicture: {},
    listOfCurrencies: [],
    isSwitch: false,
    countryRedux: ''
}

const Slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCountryRedux(state, action){
          state.countryRedux = action.payload;
        },
        setIsSwitch(state, action){
            state.isSwitch = action.payload;
        },
        setverticalCarouselIndex(state, action){
            state.verticalCarouselIndex = action.payload;
        },
        setNotUsername(state, action){
            state.notusername = action.payload;
        },

        setusername(state, action){
            state.username = action.payload;
        },

        setStatusMessage(state,action){
            state.statusMessage = action.payload;
        },

        setnotVerified(state, action) {
            state.notVerified = action.payload;
        },
        setphoneNumber(state, action){
            state.phoneNumber = action.payload;
        },
        setorganizationList(state, action) {
            state.organizationList = action.payload;
        },

        setPlaceName(state, action) {
            state.placeName = action.payload
        },
        setListTypes(state, action) {
            state.listTypes = action.payload;
        },
        setPhoneVerified(state, action) {
            state.phoneVerified = action.payload;
        },
        setEmailVerified(state, action){
            state.emailVerified = action.payload;
        },
        setReduxEmail(state, action){
            state.reduxEmail = action.payload;
        },
        setLatitude(state, action){
            state.latitude = action.payload;
        },
        setlongitude(state, action){
            state.longitude = action.payload;
        },
        setSponsorPicture(state, action){
            state.sponsorPicture = action.payload;
        },
        setListofCurrencies(state, action){
            state.listOfCurrencies = action.payload;
        }

    }
})

export const {
    setCountryRedux,
    setNotUsername,
    setIsSwitch,
    setListofCurrencies,
    setSponsorPicture,
    setPlaceName,
    setorganizationList,
    setverticalCarouselIndex,
    setusername,
    setStatusMessage,
    setnotVerified,
    setListTypes,
    setPhoneVerified,
    setEmailVerified,
    setReduxEmail,
    setLatitude,
    setlongitude,
} = Slice.actions;

export default Slice.reducer;