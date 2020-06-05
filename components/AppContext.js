import React from 'react';

const noop = () => {};

export const defaultValue = {
    state: {
        nodes: [],
        setNodes: noop,
        stops: [],
    },
    dispatch: noop,
};

export const AppContext = React.createContext(defaultValue);

function useFetchStops() {
    const [stops, setStops] = React.useState([]);
    React.useEffect(() => {
        const fetchStops = async () => {
            const rawStops = await fetch('https://pid.cz/stops.json');
            const jsonStops = await rawStops.json();
            setStops(jsonStops);
        };

        fetchStops();
    }, []);

    return [stops];
}

export const AppContextProvider = ({ children, ...rest }) => {
    const init = {
        ...defaultValue,
        ...rest,
    };
    const [state, dispatch] = React.useReducer(reviewReducer, init);

    React.useEffect(() => dispatch(['FETCH_STOPS']), []);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};


export function reviewReducer(state, [action, payload]) {
    switch (action) {
        case 'FETCH_STOPS': {
            const [stops] = useFetchStops();
            return {
                ...state,
                stops,
            };
        }
        default:
            return state;
    }
}
