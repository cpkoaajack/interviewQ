import React from 'react';
import { withRouter } from 'react-router-dom';
import PeopleProfile from './PeopleProfile';

const YourFriends = (props) => {
  const { peoples } = props;

  const people = peoples.find(
    (people) => people._id === props.match.params.peopleId
  );

  const profileDetail = <PeopleProfile people={people} />;

  if (!Object.keys(people).length > 0) return <div>Loading...</div>;

  return (
    <div>
      <div className='your-friend'>
        <div className='title-bar'>Your Friend</div>
        <div>{profileDetail}</div>
      </div>
    </div>
  );
};

export default withRouter(YourFriends);
