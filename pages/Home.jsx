import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

import { Link } from 'react-router-native';

export const Home = (props) => {
    return (
        <View style={styles.container}>
            <Text>Dosud nebyly přidány uzly</Text>
            <Link
                style={styles.link}
                to="/find-route"
                underlayColor="#F95700"
            >
                <Text style={styles.linkText}>Přidej uzel</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    link: {
        backgroundColor: '#F95700',
        padding: 10,
        width: 150,
        borderRadius: 100,
    },
    linkText: {
        color: '#fff',
        textAlign: 'center',
    },
});
