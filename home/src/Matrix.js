import React, { useState } from 'react';
import MATRIX_FRAMES from './data/matrix'
import { useDynamicTransition } from './hooks';

const minDelay = 100;
const minIncrement = 1;

function Matrix() {
    const [delay ,setDelay] = useState(500);
    const [increment, setIncrement] = useState(5);
    const index = useDynamicTransition({
        delay, increment, length: MATRIX_FRAMES.length
    });

    const updateDelay = event => {
        const delay = Number(event.target.value);
        setDelay(delay > minDelay ? delay : minDelay);
    }

    const updateIncrement = event => {
        const increment = Number(event.target.value);
        setIncrement(increment > minIncrement ? increment : minIncrement);
    }

    return (
        <div className="Matrix">
            <img src={MATRIX_FRAMES[index]} alt='matrix-animation'/>
            <div className="multiform">
                <div>
                    Frame Transition delay (seconds):
                    <input type='number' value={delay} onChange={updateDelay}/>
                </div>
                <div>
                    Frame Transition increment (seconds):
                    <input type='number' value={increment} onChange={updateIncrement}/>
                </div>
            </div>
        </div>
    )
}   

export default Matrix;