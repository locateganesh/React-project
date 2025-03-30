import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc';

const getStoreIds = JSON.parse(localStorage.getItem('selectedIds')) || [];
const storePlaces = getStoreIds.map(id => AVAILABLE_PLACES.find(places => places.id === id));

function App() {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storePlaces);

  

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlaces);
    });
  }, [])

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setIsModalOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setIsModalOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storeIds = JSON.parse(localStorage.getItem('selectedIds')) || [];
    if (storeIds.indexOf(id) === -1) {
      localStorage.setItem('selectedIds', JSON.stringify([id, ...storeIds]));
    }

  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setIsModalOpen(false)

    const storeIds = JSON.parse(localStorage.getItem('selectedIds')) || [];
    localStorage.setItem('selectedIds', JSON.stringify(storeIds.filter(id => id !== selectedPlace.current)));

  }, []);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
