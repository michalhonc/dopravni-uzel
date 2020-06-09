import React from 'react';
import FuzzySearch from 'fuzzy-search';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Input, Divider, List, ListItem, Layout } from '@ui-kitten/components';
import { Link } from 'react-router-native';

import { AppContext } from '../components/AppContext';
import { Route } from '../components/Route';
import { IStop, Stops, Action, IRoute } from '../types/AppContext.types';

interface IList {
    title: string;
    description: string;
}

function useFuzzySearch(needle: string, haystack: object, keys: string[]) {
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        const searcher = new FuzzySearch(haystack, keys, {});

        const searchRes = searcher.search(needle);
        setResult(searchRes);
    }, [needle]);

    return [result];
}

function formatSectionList(array: IStop[]): IList[] {
    return array.map((item) => {
        return {
            title: item.name,
            description: item.stops.tram && item.stops.tram.join(', '),
            data: { ...item },
        };
    });
}

function formatStops(stops: Stops[]) {
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

function formatRoutes(routes: IRoute[]) {
    return routes.map((route) => ({
        title: `${route.name} (${route.type})`,
        description: route.stop,
        data: { ...route },
    }));
}

export const FindRoute = (props) => {
    const { state, dispatch } = React.useContext(AppContext);
    const [value, onChangeText] = React.useState('');
    const [chosenStop, setChosenStop] = React.useState(null);

    const [searchResult] = useFuzzySearch(value, state.stops, ['search']);
    const currentNode = state.nodes.find((node) => node.name === props.history.location.state.node.name);

    return (
        <SafeAreaView style={styles.container}>
            <Text category="h2" style={styles.heading}>Přidejte spoj</Text>
            {currentNode.routes.length > 0 && (
                <Layout>
                    <Text category="h3">Přidané spoje v uzlu</Text>
                    <List
                      data={formatRoutes(currentNode.routes)}
                      ItemSeparatorComponent={Divider}
                      renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            description={item.description}
                            onPress={() => {
                                dispatch([Action.REMOVE_ROUTE, {
                                    node: currentNode,
                                    route: item.data,
                                }]);
                            }}
                        />
                      )}
                    />

                </Layout>
            )}
            <Divider />
            <Input
                style={styles.input}
                onChangeText={text => {
                    setChosenStop(null);
                    onChangeText(text)
                }}
                size="medium"
                value={value}
                placeholder="Zadejte zastávku.."
            />

            {!chosenStop && searchResult && Array.isArray(searchResult) && (
                <List
                  style={styles.container}
                  data={formatSectionList(searchResult)}
                  ItemSeparatorComponent={Divider}
                  renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        description={item.description}
                        onPress={() => setChosenStop(item)}
                    />
                  )}
                />
            )}

            {chosenStop && (
                <Layout>
                    <Text category="h4">{chosenStop.title}</Text>
                    <List
                      data={formatStops(chosenStop.data.stops)}
                      ItemSeparatorComponent={Divider}
                      renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            description={item.description}
                            onPress={() => {
                                dispatch([Action.ADD_ROUTE, {
                                    ...props.history.location.state,
                                    route: {
                                        name: item.title,
                                        type: item.description,
                                        stop: chosenStop.title,
                                    },
                                }])
                            }}
                        />
                      )}
                    />
                </Layout>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
    input: {
        marginBottom: 20,

    },
});
