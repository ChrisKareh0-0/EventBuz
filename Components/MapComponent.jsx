import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Store } from '@/Redux/store';
import { setLatitude, setlongitude } from '@/Redux/slice';
const libraries = ["places"];

const MapComponent = ({onLoad}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  

  const searchBoxRef = useRef(null);
  


  useEffect(() => {
    // fetchIPGeolocation();
    fetchGPSGeolocation();
  },[])

  const onSearchBoxLoaded = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, [])

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry.location;
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
    }
  };
 



  const handleClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPosition(location)
    
    const latte = JSON.stringify(event.latLng.lat())
    const long = JSON.stringify(event.latLng.lng())
    Store.dispatch(setLatitude(latte))
    Store.dispatch(setlongitude(long))
    

  }

  const fetchGPSGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setMarkerPosition({ lat, lng });
          console.log(markerPosition)
        },
        (error) => {
          console.error('Error fetching GPS geolocation: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleMapDoubleClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition(location);
    
    
    
    console.log(markerPosition)
  };

  return (
    <LoadScript
    googleMapsApiKey="AIzaSyBlVni4x3fyb6Q8sZO4owo0voIf3QQ6GLc"
    libraries={libraries}
  >
     <StandaloneSearchBox onLoad={onSearchBoxLoaded} onPlacesChanged={onPlacesChanged}>
        <input style={{backgroundColor: "#3b3b3b", borderRadius: 20}} className='mapSearch' type="text" placeholder="Search location" />
      </StandaloneSearchBox>
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={markerPosition}
      zoom={8}
      onLoad={onLoad}
      // onDblClick={handleMapDoubleClick}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      onClick={handleClick}
     
      
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  </LoadScript>
  );
  
};

export default MapComponent;