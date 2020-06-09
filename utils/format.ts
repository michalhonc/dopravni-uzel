import { IStop, IList, Stops, IRoute } from '../types/AppContext.types';

export function formatSectionList(array: IStop[]): IList[] {
    return array.map((item) => {
        return {
            title: item.name,
            description: item.stops.tram && item.stops.tram.join(', '),
            data: { ...item },
        };
    });
}

export function formatStops(stops: Stops[]) {
    const keys = Object.keys(stops); // [bus, noc, noc_tram, tram]
    const res: IList[] = [];
    keys.forEach(key => {
        stops[key].forEach(stop => {
            res.push({
                title: stop,
                description: key,
                data: { ...stops[key] },
            });
        });
    });

    return res;
}

export function formatRoutes(routes: IRoute[]) {
    return routes.map((route) => ({
        title: `${route.name} (${route.type})`,
        description: route.stop,
        data: { ...route },
    }));
}
