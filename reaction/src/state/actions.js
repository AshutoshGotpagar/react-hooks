import { NEW_MESSAGE } from './types';
const {v4: uuidv4} = require('uuid');

export const newMessage = text => ({
        type: NEW_MESSAGE,
        item: {
            id: uuidv4(),
            text, 
            timestamp: Date.now()
        }
})