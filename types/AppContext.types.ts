export enum Action {
    ADD_ROUTE = 'ADD_ROUTE',
    REMOVE_ROUTE = 'REMOVE_ROUTE',
    ADD_NODE = 'ADD_NODE',
    FETCH_STOPS = 'FETCH_STOPS',
}

export enum RouteType {
    TRAM = 'tram',
    BUS = 'bus',
    NOC = 'noc',
    NOC_TRAM = 'noc_tram',
    METRO = 'metro',
    TRAIN = 'train',
    NAHRAD = 'nahrad',
}

export interface IRoute {
    name: string;
    type: RouteType;
    stop: string;
    //direction: string;
}

export interface INode {
    name: string;
    routes: Array<IRoute>;
}

export type Stops = {
    [key in RouteType]: string[];
};
export interface IStop {
    name: string;
    search: string;
    stops: Stops;
}

export interface IState {
    nodes: INode[];
    stops: IStop[];
}

interface IAddRoute {
    stop: IStop;
    node: {
        id: string;
        name: string;
        route: IRoute;
    }
}

interface IRemoveRoute {
    node: {
        id: string;
        name: string;
        routes: IRoute[];
    };
    route: IRoute;
}

interface IAddNode {
    name: string;
    id: string;
}

export interface IContext {
    state: IState;
    dispatch: React.Dispatch<AppPayloads>;
}

type AddRoute = [Action.ADD_ROUTE, IAddRoute];
type RemoveRoute = [Action.REMOVE_ROUTE, IRemoveRoute];
type AddNode = [Action.ADD_NODE, IAddNode];

export type AppPayloads = AddRoute
    | AddNode;
