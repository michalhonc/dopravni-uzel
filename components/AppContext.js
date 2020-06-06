import React from 'react';

const noop = () => {};

export const defaultValue = {
    nodes: [],
    stops: [],
};

export const AppContext = React.createContext({
    state: defaultValue,
    dispatch: noop,
});

export const AppContextProvider = ({ children, ...rest }) => {
    const [state, dispatch] = React.useReducer(reviewReducer, defaultValue);
    const value = {
        state,
        dispatch,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


export function reviewReducer(state, [action, payload]) {
    switch (action) {
        case 'FETCH_STOPS': {
            return {
                ...state,
                stops: payload,
            };
        }
        default:
            return state;
    }
}
