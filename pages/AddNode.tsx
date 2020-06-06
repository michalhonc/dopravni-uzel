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

    const handleButtonPress = () => {
        dispatch(['ADD_NODE', {
            name: value,
            id: base64.encode(value),
        }]);
        history.push('/find-route');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text category="h2" style={styles.heading}>Vytvoř uzel</Text>
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
