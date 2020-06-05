import React from 'react';
import FuzzySearch from 'fuzzy-search';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Input, Divider, List, ListItem, Layout } from '@ui-kitten/components';

import { Link } from 'react-router-native';
import { AppContext } from '../components/AppContext';
import { Route } from '../components/Route';

function useFuzzySearch(needle, haystack, keys) {
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        const searcher = new FuzzySearch(haystack, keys, {});

        const searchRes = searcher.search(needle);
        setResult(searchRes);
    }, [needle]);

    return [result];
}

function formatSectionList(array) {
    return array.map((item) => {
        return {
            title: item.name,
            description: item.stops.tram && item.stops.tram.join(', '),
            data: { ...item },
        };
    });
}

function formatStops(stops) {
    const keys = Object.keys(stops); // [bus, noc, noc_tram, tram]
    const res = [];
    keys.forEach(key => {
        stops[key].forEach(stop => {
            res.push({
                title: stop,
                description: key,
            });
        });
    });

    return res;
}


export const FindRoute = (props) => {
    const { stops, addRoute } = React.useContext(AppContext);
    const [value, onChangeText] = React.useState('');
    const [chosenStop, setChosenStop] = React.useState(null);

    const [searchResult] = useFuzzySearch(value, stops, ['search']);

    return (
        <SafeAreaView style={styles.container}>
            <Text category="h2" style={styles.heading}>Přidejte spoj</Text>
            <Input
                onChangeText={text => onChangeText(text)}
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
                <>
                    <Text category="h3">{chosenStop.title}</Text>
                    <List
                      style={styles.container}
                      data={formatStops(chosenStop.data.stops)}
                      ItemSeparatorComponent={Divider}
                      renderItem={({ item }) => (
                        <ListItem
                            title={item.title}
                            description={item.description}
                            onPress={() => addRoute(chosenStop.title, item)}
                        />
                      )}
                    />
                </>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
