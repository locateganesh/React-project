
import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
    const [fetchData, setFetchData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        (async() => {
          setIsLoading(true);
          try {
            const response = await fetchFn();
            setFetchData(response);
          } catch (error) {
            setError({message: error.message || 'Failed to fetch data.'});
          }
          setIsLoading(false);
        })();
    }, [fetchFn]);

    return {
        fetchData,
        isLoading,
        setFetchData,
        error
    }
}