import React from 'react';
import { withRouter } from 'react-router-dom';
import FriendItem from './FriendItem';

const AllFriends = ({ friends }) => {
  const friendList = friends.map((friend) => (
    <FriendItem key={friend._id} friend={friend} />
  ));

  return (
    <div>
      <div className='all-friends'>
        <div className='title-bar'>All Friends</div>
        <div className='bar-content'>{friendList}</div>
      </div>
    </div>
  );
};

export default withRouter(AllFriends);
