import React, { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import Tasks from './Tasks';

function App() {

  const [userQuery, setUserQuery] = useState('');

  const updateUserQuery = event => {
    console.log('userQuery', userQuery);
    setUserQuery(event.target.value);
  }

  const handleKeyPress = event => {
    console.log(event);
    if(event.key === 'Enter') {
      searchQuery();
    }
  }

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank');
  }

  return (
    <div className="App">
      <div className="form">
        <input value={userQuery} onChange={updateUserQuery} onKeyPress={handleKeyPress} />
        <button onClick={searchQuery} onKeyPress={handleKeyPress}>Search</button>
      </div>
      <hr/>
      <Joke />
      <hr />
      <Tasks />
      <hr />
      <Stories />
     </div>
  );
}

export default App;
