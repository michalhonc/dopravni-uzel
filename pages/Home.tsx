import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ApplicationProvider, Layout, Text, Button, List, ListItem } from '@ui-kitten/components';

import { useHistory } from '../react-router';
import { AppContext } from '../components/AppContext';

function addListData(data) {
    return data.map((item) => ({
        title: item.name,
        description: item.type,
        data: item,
    }));
}

export const Home = () => {
    const history = useHistory();
    const { state, dispatch } = React.useContext(AppContext);

    return (
        <Layout style={styles.container}>
            {state.nodes.length === 0
                ? (
                    <Text style={styles.noNodes}>Dosud nebyly přidány uzly</Text>
                ) : (
                    <View style={styles.nodes}>
                        {state.nodes.map((node) => (
                            <Layout key={node.name}>
                                <TouchableOpacity onPress={() => history.push({ pathname: '/find-route', state: { node } })}>
                                    <Text category="h4">{node.name}</Text>
                                </TouchableOpacity>
                                    <List
                                      data={addListData(node.routes)}
                                      renderItem={({ item }) => (
                                        <ListItem
                                            title={item.title}
                                            description={item.description}
                                        />
                                      )}
                                    />
                            </Layout>
                        ))}
                    </View>
                )
            }
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
        //alignItems: 'center',
        paddingVertical: 30,
    },
    nodes: {
        flex: 1,
    },
    noNodes: {
        textAlign: 'center',
    },
});
