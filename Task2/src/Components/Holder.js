import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import AllFriends from './AllFriends';
import YourFriends from './YourFriends';

function Holder() {
  useEffect(() => {
    axios
      .get('https://next.json-generator.com/api/json/get/41P1_UhSI')
      .then((response) => {
        if (response.status === 200) {
          setPeoples(response.data);
        } else {
          throw new Error(`response status ${response.status}`);
        }
      })
      .then(() => setIsFetch(true))
      .catch((error) => console.log(error));
  }, []);

  const [isFetch, setIsFetch] = useState(false);
  const [peoples, setPeoples] = useState([]);

  return isFetch ? (
    <Router>
      <Route path='/' exact render={() => <AllFriends friends={peoples} />} />
      <Route
        path='/:peopleId'
        render={() => <YourFriends peoples={peoples} />}
      />
    </Router>
  ) : (
    <div>Loading...</div>
  );
}

export default Holder;
