import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

import { Link } from 'react-router-native';

export const Home = (props) => {
    return (
        <View style={styles.container}>
            <Text>Dosud nebyly přidány uzly</Text>
            <Link
                to="/add"
                underlayColor="#F95700"
            >
                <Text>Přidej uzel</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignContent: 'center',
    },
});
