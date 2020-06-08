import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Input, Divider, List, ListItem, Layout, Button } from '@ui-kitten/components';
import base64 from 'react-native-base64'

import { AppContext } from '../components/AppContext';

import { useHistory } from '../react-router';

import { useFetchStops } from '../hooks/useFetchStops';

export const AddNode = (props) => {
    useFetchStops();
    const history = useHistory();
    const { state, dispatch } = React.useContext(AppContext);
    const [value, onChangeText] = React.useState('');
    const [error, setError] = React.useState('');

    const handleButtonPress = () => {
        const isPresent = state.nodes.some((node) => node.name === value);
        if (isPresent) {
            setError('Uzel s tímto názvem již existuje');
            return;
        }

        const newNode = {
            name: value,
            id: base64.encode(value),
        };
        dispatch(['ADD_NODE', newNode]);
        history.push({
            pathname: '/find-route',
            state: { node: newNode },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text category="h2" style={styles.heading}>Vytvoř uzel</Text>
            {!!error && (
                <Text status="danger">{error}</Text>
            )}
            <Input
                style={styles.input}
                onChangeText={text => {
                    onChangeText(text)
                }}
                size="medium"
                value={value}
                placeholder="Zadejte název uzle.."
            />

            <Button onPress={handleButtonPress}>
                Vytvořit uzel
            </Button>

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
