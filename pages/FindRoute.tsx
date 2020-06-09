import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Text, Input, Divider, List, ListItem, Layout, Icon } from '@ui-kitten/components';
import { Link } from 'react-router-native';

import { AppContext } from '../components/AppContext';
import { Route } from '../components/Route';
import { IStop, Stops, Action, IRoute } from '../types/AppContext.types';
import { useFuzzySearch } from '../hooks/useFuzzySearch';
import { formatSectionList, formatStops, formatRoutes } from '../utils/format';

interface IList {
    title: string;
    description: string;
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
            <ScrollView>
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
                                accessoryRight={() => (
                                    <Icon
                                        style={styles.icon}
                                        fill="#666"
                                        name="trash-2-outline"
                                        onPress={() => {
                                            dispatch([Action.REMOVE_ROUTE, {
                                                node: currentNode,
                                                route: item.data,
                                            }]);
                                        }}
                                    />
                                )}
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
                      //style={styles.container}
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
                                    if (currentNode.routes.some(r => r.name === item.title && r.stop === chosenStop.title)) {
                                        return;
                                    }
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
             </ScrollView>

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
    icon: {
        width: 24,
        height: 24,
    },
});
