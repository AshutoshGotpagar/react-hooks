import { useState, useEffect } from "react";

export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);

    useEffect(() => {
        fetch(url)
        .then( response => response.json())
        .then(json => {
            console.log('joke json', json)
            setResult(json);
        });
    }, []);

    console.log('result', result);

    return result;

}