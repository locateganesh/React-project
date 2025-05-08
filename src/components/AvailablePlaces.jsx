// import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';


async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
      resolve(sortedPlaces);
    };
  
    const handleError = () => {
      resolve(places);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  });

  


}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const {isLoading, error, fetchData: availablePlaces} = useFetch(fetchSortedPlaces, []);

  /*  
  useEffect(() => {
    // fetch('http://localhost:3000/places').then(response => response.json()).then(resData => {
    //   console.log(resData);
    // })

    (async() => {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();

        const handleSuccess = (position) => {
          const { latitude, longitude } = position.coords;
          const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        };
      
        const handleError = () => {
          setAvailablePlaces(places);
          setIsLoading(false);
        };

        if (navigator.geolocation) { 
          // navigator.geolocation.getCurrentPosition((position) => {
          //   const { latitude, longitude } = position.coords;
          //   if (latitude, longitude) {
          //     const sortedPlaces = sortPlacesByDistance(resData.places, latitude, longitude);
          //     setAvailablePlaces(sortedPlaces);
          //   } else {
          //     setAvailablePlaces(resData.places);
          //   } 
          //   setIsLoading(false);
          // });
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
          setAvailablePlaces(places);
          setIsLoading(false);
        }

      } catch(error) {
        setError({message: error.message || 'Could not fetch places, please try again later'});
        setIsLoading(false);
      }
      
      
    })();

  }, []);
  */

  const closeError = () => {
    setError(undefined);
  }


  if (error) {
    return <Error title="An Error Occurd!" message={error.message} onConfirm={closeError} /> 
  }
  
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
