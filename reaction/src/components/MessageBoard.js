import React from 'react';

function MessageBoard ({messages}) {
    return(
        <div>
            {
                messages.map(messageItem => {
                    const { id, timestamp, text} = messageItem;
                    return (
                        <div key={id}>
                            <h4>{new Date(timestamp).toLocaleString()}</h4>
                            <p>{text}</p>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MessageBoard;