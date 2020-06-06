import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

import { useHistory } from '../react-router';

export const Home = () => {
    const history = useHistory();

    return (
        <Layout style={styles.container}>
            <Text>Dosud nebyly přidány uzly</Text>
            <Button onPress={() => history.push('/add-node')}>
                Přidej uzel
            </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },
});
