import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const PeopleProfile = ({ people, google }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    _id,
    picture,
    location: { latitude, longitude },
    name: { first, last },
  } = people;

  const style = {
    map: { width: 'auto', height: '500px' },
    img: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
  };

  return (
    <div>
      <div className='friend-list'>
        <div className='profile-picture'>
          <img style={style.img} src={picture} alt={`${_id} pic`} />
        </div>
        <div className='profile-location'>
          {latitude} {longitude}
        </div>
        <div className='profile-name'>
          {first} {last}
        </div>
      </div>
      <div>
        <Map
          google={google}
          zoom={15}
          style={style.map}
          initialCenter={{ lat: latitude, lng: longitude }}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAo9GMUjHmYObWzAHy97ix1sbK33KtwJhw',
})(PeopleProfile);
