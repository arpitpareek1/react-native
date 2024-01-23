import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CommonHeader from './commonHeader';

const NewsDetailScreen = ({ route }) => {
    const { title, category, date, description, imageSource } = route.params;

    return (
        <>
            <CommonHeader title="News" previousPage="" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Image source={{ uri: imageSource }} style={styles.image} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.category}>{category}</Text>
                        <Text style={styles.date}>{new Date(date).toDateString()}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    category: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
        fontWeight: '600',
    },
    date: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },
});

export default NewsDetailScreen;
