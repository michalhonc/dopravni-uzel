import React from 'react';
import FuzzySearch from 'fuzzy-search';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

import { Link } from 'react-router-native';

function useFuzzySearch(needle, haystack, keys) {
    const [result, setResult] = React.useState(null);

    React.useEffect(() => {
        const searcher = new FuzzySearch(haystack, keys, {});

        const searchRes = searcher.search(needle);
        setResult(searchRes);
    }, [needle]);

    return [result];
}

export const FindRoute = (props) => {
    const [value, onChangeText] = React.useState('');
    const [stops, setStops] = React.useState([]);
    const [chosenStop, setChosenStop] = React.useState(null);

    const [searchResult] = useFuzzySearch(value, stops, ['search']);

    React.useEffect(() => {
        const fetchStops = async () => {
            const rawStops = await fetch('https://pid.cz/stops.json');
            const jsonStops = await rawStops.json();
            setStops(jsonStops);
        };

        fetchStops();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Přidejte spoj</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="Zadejte zastávku.."
            />
            <View>
                {!chosenStop && searchResult && searchResult.map((result) => (
                    <Button
                      title={result.name}
                      onPress={() => setChosenStop(result)}
                    />
                ))}
                {chosenStop && chosenStop.stops.tram && chosenStop.stops.tram.map((link) => (
                    <Button
                        title={`${link} - ${chosenStop.name}`}
                        onPress={() => alert('Set')}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
    },
    heading: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 80,
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: '#403D39',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
});
