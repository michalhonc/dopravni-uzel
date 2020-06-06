import React from 'react';

import { AppContext } from '../components/AppContext';

export function useFetchStops() {
    const { dispatch } = React.useContext(AppContext);
    React.useEffect(() => {
        const fetchStops = async () => {
            const rawStops = await fetch('https://pid.cz/stops.json');
            const jsonStops = await rawStops.json();
            dispatch(['FETCH_STOPS', jsonStops]);
        };

        fetchStops();
    }, []);
}
