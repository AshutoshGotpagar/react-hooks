import React, { useReducer, useEffect } from 'react';
import reducer, { initialState } from '../state/reducer';
import Context from '../context';
import PubSub from '../pubsub';
import PublishMessage from './PublishMessage';
import MessageBoard from './MessageBoard';
import SetUsername from './SetUsername';

const pubsub = new PubSub();

function App() {

  useEffect(() => {
    pubsub.addListener({
      message: messageObject => {
        const {channel, message} = messageObject;

        console.log('received message', message, 'channel', channel);

        dispatch(message);
      }
    });
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state', state);

  return (
    <Context.Provider value={{state, dispatch, pubsub}}>
      <div className="App">
        <h2>Reaction</h2>
        <SetUsername />
        <hr/>
        <PublishMessage/>
        <hr />
        <MessageBoard/>
      </div>
    </Context.Provider>
  );
}

export default App;
