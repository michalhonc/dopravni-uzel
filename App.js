import React from 'react';
import { StyleSheet, Text, Image, View, Platform } from 'react-native';
import { Router, Route, Link } from './react-router';

import { Home } from './pages/Home';
import { FindRoute } from './pages/FindRoute';

const App = () => (
  <Router>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/" underlayColor="#fff">
            <Image source={require('./assets/logo.png')} />
        </Link>
      </View>

      <Route exact path="/" component={Home} />
      <Route path="/find-route" component={FindRoute} />
    </View>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginBottom: 25,
    padding: 10
  },
  nav:{
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-around',
  },
});

export default App;
