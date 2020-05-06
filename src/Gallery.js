import React, { useState } from 'react';
import PICTURES from './data/pictures';
import { useDynamicTransition } from './hooks';

const SECONDS = 1000;
const minDelay = 1 * SECONDS;
const minIncrement = 1;

function Gallery() {
    const [delay, setDelay] = useState(3 * SECONDS);
    const [increment, setIncrement] = useState(1);

    const index = useDynamicTransition({
        delay, increment, length: PICTURES.length
    });

    const updateDelay = event => {
        const delay = Number(event.target.value) * SECONDS;
        setDelay(delay > minDelay ? delay : minDelay);
    }

    const updateIncrement = event => {
        const increment = Number(event.target.value);
        setIncrement(increment > minIncrement ? increment : minIncrement);
    }

    return(
        <div className="Gallery">
            <img 
                src={PICTURES[index].image}
                alt="gallery"
            />
            <div className="multiform">
                <div>
                    Gallery transition delay (seconds): 
                    <input type='number' value={delay} onChange={updateDelay}/>
                </div>
                <div>
                    Gallery increment: <input type='number' value={increment} onChange={updateIncrement}/>
                </div>
            </div>
        </div>
    )

}

export default Gallery;