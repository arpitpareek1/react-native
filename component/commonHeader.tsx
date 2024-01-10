import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { StackHeaderProps } from '@react-navigation/stack';

interface CommonHeaderProps {
    title: string;
    previousPage: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title, previousPage }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { }}>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.walletContainer}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#7a9f86',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    walletContainer: {
        flexDirection: 'row',
    },
    walletIcon: {
        marginRight: 5,
        fontSize: 20,
        color: 'white',
    },
    walletNumber: {
        color: 'white',
        fontSize: 16,
    },
});

export default CommonHeader;
