import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resdata = await response.json();
    if (!response.ok) {
        throw new Error(resdata.message || 'Something went wrong, failed to send request.');
    }
    return resdata;
}

export default function useHttp(url, initialData, config) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async(data) => {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        } 
        setIsLoading(false);
    }, [url, config]);

    useEffect(()=>{
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    },[sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}