import React from 'react';

import { StyleSheet, Button, View, Text, TextInput, SectionList } from 'react-native';

export const Route = ({ text }) => (
    <View style={styles.route}>
        <Text style={styles.routeText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    routeText: {
        fontSize: 20,
    },
});
