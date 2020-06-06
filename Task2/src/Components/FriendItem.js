import React from 'react';
import { Link } from 'react-router-dom';

const FriendItem = (props) => {
  const {
    _id,
    picture,
    name: { first, last },
  } = props.friend;

  const style = {
    img: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
    },
  };

  return (
    <Link to={`/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className='friend-list'>
        <div className='profile-picture'>
          <img style={style.img} src={picture} alt={`${_id} pic`} />
        </div>
        <div className='profile-name'>
          {first} {last}
        </div>
      </div>
    </Link>
  );
};

export default FriendItem;
