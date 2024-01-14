// Loader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#7a9f86" />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fefefe',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loader;