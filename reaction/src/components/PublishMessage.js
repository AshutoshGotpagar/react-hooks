import React, { useState } from 'react';
import { newMessage } from '../state/actions';

function PublishMessage(props) {
    const { dispatch } = props;

    const [text, setText] = useState('');
    
    const updateText = event => {
        setText(event.target.value);
    }

    const publishItem = () => (dispatch(newMessage(text)))

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