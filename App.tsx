import React from 'react';

import { StyleSheet, Image, Platform, View } from 'react-native';
import { Router, Route, Link } from './react-router';
import Constants from 'expo-constants';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Icon, Layout, Text, TopNavigation, TopNavigationAction, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppContextProvider } from './components/AppContext';
import { ErrorBoundary } from './components/RootErrorBoundary';

import { Home } from './pages/Home';
import { FindRoute } from './pages/FindRoute';
import { AddNode } from './pages/AddNode';

const BackIcon = () => (
  <Icon style={styles.icon} name="arrow-back" />
);

const renderBackAction = () => (
    <TopNavigationAction icon={() => (
        <Link to="/">
            <BackIcon />
        </Link>
    )}
    />
);

//<Image source={require('./assets/logo.png')} />

const App = () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppContextProvider>
                <ErrorBoundary>
                    <Router>
                        <Layout style={styles.nav} level="1">
                          <TopNavigation
                            alignment="center"
                            title="Dopravní uzel"
                            subtitle="Najděte svůj spoj"
                            accessoryLeft={renderBackAction}
                          />
                        </Layout>
                        <Layout style={styles.container}>
                            <Route exact path="/" component={Home} />
                            <Route path="/find-route" component={FindRoute} />
                            <Route path="/add-node" component={AddNode} />
                        </Layout>
                    </Router>
                </ErrorBoundary>
            </AppContextProvider>
        </ApplicationProvider>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    nav: {
        marginTop: Constants.statusBarHeight,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default App;
