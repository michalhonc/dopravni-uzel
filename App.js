import React from 'react';

import { StyleSheet, Image, Platform, View } from 'react-native';
import { Router, Route, Link } from './react-router';
import Constants from 'expo-constants';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import { AppContextProvider } from './components/AppContext';

import { Home } from './pages/Home';
import { FindRoute } from './pages/FindRoute';

const App = () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <AppContextProvider>
            <Router>
                <Layout style={styles.container}>
                    <View style={styles.nav}>
                        <Link to="/" underlayColor="#fff">
                            <Image source={require('./assets/logo.png')} />
                        </Link>
                    </View>

                    <Route exact path="/" component={Home} />
                    <Route path="/find-route" component={FindRoute} />
                </Layout>
            </Router>
        </AppContextProvider>
    </ApplicationProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 25,
        padding: 10,
        marginTop: Constants.statusBarHeight,
    },
    nav:{
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'space-around',
    },
});

export default App;
