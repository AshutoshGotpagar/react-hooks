import React, { useState } from 'react';
import { newMessage } from '../state/actions';
import { useAppContext } from './hooks';

function PublishMessage() {
    const { state: {username}, pubsub: {publish} } = useAppContext();

    const [text, setText] = useState('');
    
    const updateText = event => {
        setText(event.target.value);
    }

    const publishItem = () => (publish(newMessage({text, username})));

    const handleKeyPress = event => {
        if(event.key === 'Enter'){
            publishItem();
        }
    }

    return (
        <div>
            <h3>Got Something to say?</h3>
            <input type='text' onChange={updateText} onKeyPress={handleKeyPress}/>
            {'  '}
            <button onClick={publishItem}>Publish It!</button>
        </div>
    )

}

export default PublishMessage;