import React from 'react';
import base64 from 'react-native-base64';

import { IContext, IState, AppPayloads, Action } from '../types/AppContext.types';

const noop = () => {};


export const defaultValue: IState = {
    nodes: [],
    stops: [],
};

export const AppContext = React.createContext<IContext>({
    state: defaultValue,
    dispatch: noop,
});

export const AppContextProvider: React.FC = ({ children }) => {
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


export function reviewReducer(state: IState, [action, payload]: AppPayloads) {
    switch (action) {
        case Action.ADD_ROUTE: {
            const newNodes = state.nodes.map((node) => {
                if (node.id === payload.node.id) {
                    return {
                        ...node,
                        routes: [ ...node.routes, payload.route ],
                    };
                }
                return {
                    ...node,
                };
            });

            return {
                ...state,
                nodes: newNodes,
            };
        }
        case Action.ADD_NODE: {
            return {
                ...state,
                nodes: [
                    ...state.nodes,
                    {
                        id: payload.id,
                        name: payload.name,
                        routes: [],
                    },
                ],
            };
        }
        case Action.FETCH_STOPS: {
            return {
                ...state,
                stops: payload,
            };
        }
        default:
            return state;
    }
}
