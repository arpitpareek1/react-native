import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CommonHeader from './commonHeader';

const NewsDetailScreen = ({ route }) => {
    const { title, category, date, description, imageSource } = route.params;

    return (
        <>
            <CommonHeader title="News" previousPage="" />
            <ScrollView style={styles.container}>
                <Image source={{ uri: imageSource }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.category}>{category}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginVertical: 20,
        overflow: 'hidden'
    },
    image: {
        overflow: 'visible',
        // height: 130,
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        paddingVertical: 20,
        padding: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    category: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
        fontWeight: '600'
    },
    date: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },
});

export default NewsDetailScreen;
