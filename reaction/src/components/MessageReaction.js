import React from 'react';

function MessageReaction({ messageReactions }) {
    if(!messageReactions) return null;

    return(
        messageReactions.map((reaction, index) => {
            const { id, emoji, username } = reaction;

            return (
                <span key={id}>
                    <em>{username}: </em>
                    {emoji}
                    {index !== messageReactions.length - 1? ', ' : null}
                </span>
            )
        })
    )
}

export default MessageReaction;